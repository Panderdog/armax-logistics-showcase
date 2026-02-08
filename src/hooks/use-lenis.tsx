import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastScrollTimeRef = useRef<number>(Date.now());
  const location = useLocation();

  // Initialize Lenis
  useEffect(() => {
    // Skip Lenis on mobile devices (reduces TBT significantly on mobile)
    // Mobile users get native smooth scroll via CSS
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) {
      document.documentElement.style.scrollBehavior = 'smooth';
      return () => {
        document.documentElement.style.scrollBehavior = '';
      };
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Add lenis class to html element
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    // Optimized RAF loop with auto-pause (reduces TBT when idle)
    let isPaused = false;
    const IDLE_TIMEOUT = 2000; // Pause after 2s of no scrolling
    
    function raf(time: number) {
      // Update last scroll time if scrolling is active
      if (lenis.velocity !== 0) {
        lastScrollTimeRef.current = Date.now();
        isPaused = false;
      }
      
      // Auto-pause if idle for too long (saves CPU/battery)
      const timeSinceLastScroll = Date.now() - lastScrollTimeRef.current;
      if (timeSinceLastScroll > IDLE_TIMEOUT && !isPaused) {
        isPaused = true;
        // Don't schedule next frame when paused
        return;
      }
      
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }
    
    // Resume RAF on any scroll event
    const resumeRAF = () => {
      if (isPaused) {
        isPaused = false;
        lastScrollTimeRef.current = Date.now();
        rafIdRef.current = requestAnimationFrame(raf);
      }
    };
    
    window.addEventListener('wheel', resumeRAF, { passive: true });
    window.addEventListener('touchstart', resumeRAF, { passive: true });

    rafIdRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      window.removeEventListener('wheel', resumeRAF);
      window.removeEventListener('touchstart', resumeRAF);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
      lastScrollTimeRef.current = Date.now(); // Reset idle timer
    } else {
      // Fallback for mobile (native scroll)
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname]);
};
