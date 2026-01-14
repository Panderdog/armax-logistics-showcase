/**
 * Prerendered data loader
 * This module safely loads generated data for react-snap prerendering
 */

import { isReactSnap } from './reactSnap';

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  previewText: string;
  previewImage?: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Extend Window interface to include our prerender data
declare global {
  interface Window {
    __PRERENDER_NEWS__?: NewsItem[];
  }
}

let cachedNews: NewsItem[] | null = null;
let isLoading = false;

/**
 * Get news from window object (injected during build)
 * This is synchronous and available immediately
 */
function getNewsFromWindow(): NewsItem[] {
  if (typeof window !== 'undefined' && window.__PRERENDER_NEWS__) {
    console.log(`[prerenderData] Loaded ${window.__PRERENDER_NEWS__.length} news from window`);
    return window.__PRERENDER_NEWS__;
  }
  return [];
}

/**
 * Load prerendered news data (async fallback)
 * This function is called during react-snap prerendering to get static news data
 */
export async function loadPrerenderNews(): Promise<NewsItem[]> {
  // Only load during prerendering
  if (!isReactSnap()) {
    return [];
  }

  // Return cached if available
  if (cachedNews !== null) {
    return cachedNews;
  }

  // Prevent multiple simultaneous loads
  if (isLoading) {
    // Wait a bit and return cached
    await new Promise(resolve => setTimeout(resolve, 100));
    return cachedNews || [];
  }

  isLoading = true;

  try {
    // Dynamic import of generated file
    // This will be bundled by vite during build
    const { prerenderNews } = await import('../generated/news.prerender');
    
    cachedNews = prerenderNews as unknown as NewsItem[];
    console.log(`[prerenderData] Loaded ${cachedNews.length} news articles`);
    
    return cachedNews;
  } catch (error) {
    console.error('[prerenderData] Failed to load prerender news:', error);
    cachedNews = [];
    return [];
  } finally {
    isLoading = false;
  }
}

/**
 * Synchronous version - returns cached data or tries window, or empty array
 * Use this to get immediately available data
 */
export function getPrerenderNews(): NewsItem[] {
  if (cachedNews) {
    return cachedNews;
  }
  
  // Try to get from window (injected during build)
  const windowNews = getNewsFromWindow();
  if (windowNews.length > 0) {
    cachedNews = windowNews;
    return cachedNews;
  }
  
  return [];
}
