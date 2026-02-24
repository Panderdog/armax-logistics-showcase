import { useCallback, useEffect, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for intersection observer animations
 * Uses a callback ref so the observer correctly attaches even when the element
 * renders after the initial mount (e.g. after async data loading).
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
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Callback ref: fires whenever the element mounts or unmounts,
  // so the effect below always has a valid node to observe.
  const ref = useCallback((el: HTMLElement | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;

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

    observer.observe(node);

    return () => observer.disconnect();
  }, [node, threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
};
