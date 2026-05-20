import { useState, useEffect } from 'react';

/**
 * A custom hook that returns a boolean indicating if the viewport width is below a certain breakpoint.
 * Defaults to 768px (standard mobile/tablet breakpoint).
 * 
 * Safe for server-side rendering (SSR) and hydration.
 */
export default function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint}px)`);
    
    // Set the initial value on mount
    setIsMobile(media.matches);

    // Create a listener for screen size changes
    const listener = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Attach the listener
    media.addEventListener('change', listener);

    // Clean up listener on unmount
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [breakpoint]);

  return isMobile;
}
