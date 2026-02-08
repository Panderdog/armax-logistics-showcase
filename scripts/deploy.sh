#!/usr/bin/env bash

#################################################
# Automatic Deploy Script for Vite project
# Deploy to Apache server via rsync over SSH
#################################################

set -euo pipefail

#################################################
# Configuration
#################################################

# TODO: Fill these values before deploying
REMOTE_USER="srv169336"
REMOTE_HOST="ssh-169336.srv.hoster.ru"
REMOTE_PATH="/storage/home/srv169336/armaxstp.com"
SSH_PORT="22"

# Optional: Enable dry-run mode
# Usage: DRY_RUN=1 npm run deploy
DRY_RUN="${DRY_RUN:-0}"

#################################################
# Colors for output
#################################################

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

#################################################
# Helper Functions
#################################################

log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

#################################################
# Validation
#################################################

log_info "Validating configuration..."

if [ "$REMOTE_USER" = "__CHANGE__" ]; then
  log_error "REMOTE_USER is not configured"
  log_error "Please edit scripts/deploy.sh and set REMOTE_USER"
  exit 1
fi

if [ "$REMOTE_HOST" = "__CHANGE__" ]; then
  log_error "REMOTE_HOST is not configured"
  log_error "Please edit scripts/deploy.sh and set REMOTE_HOST"
  exit 1
fi

if [ "$REMOTE_PATH" = "__CHANGE__" ]; then
  log_error "REMOTE_PATH is not configured"
  log_error "Please edit scripts/deploy.sh and set REMOTE_PATH"
  exit 1
fi

# Check if rsync is installed
if ! command -v rsync &> /dev/null; then
  log_error "rsync is not installed"
  log_error "Install it: sudo apt install rsync (Linux) or brew install rsync (macOS)"
  exit 1
fi

log_success "Configuration validated"

#################################################
# Dry-run check
#################################################

if [ "$DRY_RUN" = "1" ]; then
  log_warning "DRY-RUN MODE ENABLED - No actual changes will be made"
  RSYNC_DRY_RUN="--dry-run"
else
  RSYNC_DRY_RUN=""
fi

#################################################
# SSH Connection Test
#################################################

log_info "Testing SSH connection to $REMOTE_USER@$REMOTE_HOST:$SSH_PORT..."

if ! ssh -p "$SSH_PORT" -o ConnectTimeout=10 -o BatchMode=yes "$REMOTE_USER@$REMOTE_HOST" "exit" 2>/dev/null; then
  log_error "Cannot connect to $REMOTE_USER@$REMOTE_HOST via SSH"
  log_error "Possible issues:"
  log_error "  1. SSH key is not configured (run: ssh-copy-id -p $SSH_PORT $REMOTE_USER@$REMOTE_HOST)"
  log_error "  2. Wrong host/port/username"
  log_error "  3. Firewall blocking connection"
  log_error "  4. SSH service not running on remote server"
  log_error ""
  log_error "Test connection manually: ssh -p $SSH_PORT $REMOTE_USER@$REMOTE_HOST"
  exit 1
fi

log_success "SSH connection successful"

#################################################
# Build
#################################################

log_info "Building project..."

# Set environment variable to use system Puppeteer (fixes react-snap timeout)
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=$(which chromium 2>/dev/null || which chromium-browser 2>/dev/null || which google-chrome 2>/dev/null || which chrome 2>/dev/null || which google-chrome-stable 2>/dev/null || echo "")

# If no Chrome found, try node_modules puppeteer
if [ -z "$PUPPETEER_EXECUTABLE_PATH" ] || [ ! -f "$PUPPETEER_EXECUTABLE_PATH" ]; then
  log_warning "System Chrome not found, using bundled Puppeteer..."
  # Use the newer puppeteer from node_modules root (not react-snap's old one)
  export PUPPETEER_EXECUTABLE_PATH=""
fi

if ! npm run build; then
  log_error "Build failed"
  exit 1
fi

log_success "Build completed"

#################################################
# Verify dist directory
#################################################

if [ ! -d "dist" ]; then
  log_error "dist/ directory not found"
  log_error "Build may have failed or output directory is different"
  exit 1
fi

log_info "dist/ directory found, checking contents..."

DIST_SIZE=$(du -sh dist/ | cut -f1)
log_info "dist/ size: $DIST_SIZE"

#################################################
# Deploy via rsync
#################################################

log_info "Starting deployment to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH..."

RSYNC_OPTS=(
  -az                    # Archive mode + compression
  --delete               # Delete files on remote that don't exist locally
  --progress             # Show progress
  --human-readable       # Human-readable sizes
  -e "ssh -p $SSH_PORT"  # SSH with custom port
  $RSYNC_DRY_RUN         # Dry-run flag if enabled
)

# Add verbose output in dry-run mode
if [ "$DRY_RUN" = "1" ]; then
  RSYNC_OPTS+=(-v)
fi

if rsync "${RSYNC_OPTS[@]}" ./dist/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"; then
  log_success "Deployment completed successfully!"
  
  if [ "$DRY_RUN" = "1" ]; then
    log_warning "This was a DRY-RUN. No actual changes were made."
    log_info "To deploy for real, run: npm run deploy"
  else
    log_success "Your site is now live at: http://$REMOTE_HOST"
    log_info ""
    log_info "Verify deployment:"
    log_info "  1. Check HTTP response: curl -I http://$REMOTE_HOST"
    log_info "  2. Open in browser: http://$REMOTE_HOST"
    log_info "  3. Check Apache logs: ssh -p $SSH_PORT $REMOTE_USER@$REMOTE_HOST 'tail -f /var/log/apache2/error.log'"
  fi
else
  log_error "Deployment failed"
  log_error "Check the error message above for details"
  exit 1
fi

#################################################
# Post-deploy checks
#################################################

if [ "$DRY_RUN" != "1" ]; then
  log_info ""
  log_info "Post-deploy checklist:"
  log_info "  ✓ SSH connection tested"
  log_info "  ✓ Project built"
  log_info "  ✓ Files synced to remote server"
  log_info ""
  log_info "Next steps:"
  log_info "  1. Verify .htaccess is present (for Apache URL rewriting)"
  log_info "  2. Check Apache configuration allows .htaccess overrides"
  log_info "  3. Ensure mod_rewrite is enabled: a2enmod rewrite"
  log_info "  4. Check file permissions on remote server"
fi
