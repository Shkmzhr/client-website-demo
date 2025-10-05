import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when an element enters the viewport.
 * This is used to trigger entry animations (like fade-in or slide-up).
 * * @param {number} threshold - A value between 0 and 1 indicating how much of the target 
 * should be visible before the callback is invoked.
 * @returns {Array} [ref, isVisible] - A ref to attach to the target element and a boolean state.
 */
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Check if the Intersection Observer API is available
    if (typeof window.IntersectionObserver === 'undefined') {
        setIsVisible(true); // Fallback: show content immediately if not supported
        return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger once when the element first becomes visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: threshold,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

export default useScrollAnimation;
