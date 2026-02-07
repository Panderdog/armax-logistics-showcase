import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for intersection observer animations
 * 
 * @param options - Configuration options for the IntersectionObserver
 * @param options.threshold - Percentage of visibility required to trigger (0-1)
 * @param options.rootMargin - Margin around the root element
 * @param options.triggerOnce - Whether to disconnect observer after first trigger
 * 
 * @returns Object containing ref to attach to element and isInView boolean state
 * 
 * @example
 * const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
 * 
 * <div ref={ref} className={isInView ? 'fade-in' : 'opacity-0'}>
 *   Content
 * </div>
 */
export const useInView = ({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
}: UseInViewOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
};
