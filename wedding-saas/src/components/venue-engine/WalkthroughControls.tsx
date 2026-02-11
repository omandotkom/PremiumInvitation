'use client';

import { useEffect, useRef, useCallback } from 'react';

interface WalkthroughControlsProps {
  progress: number;
  onProgressChange: (progress: number) => void;
  bounds: { min: number; max: number };
}

export function WalkthroughControls({
  progress,
  onProgressChange,
  bounds,
}: WalkthroughControlsProps) {
  const touchStart = useRef<number | null>(null);
  const progressRef = useRef(progress);
  
  // Keep progress ref updated
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  // Handle wheel scroll
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Increase delta for more responsive scrolling
    const delta = e.deltaY * 0.002;
    const newProgress = Math.max(bounds.min, Math.min(bounds.max, progressRef.current + delta));
    
    console.log('Scroll delta:', delta, 'New progress:', newProgress);
    
    onProgressChange(newProgress);
  }, [onProgressChange, bounds]);

  // Handle touch events
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (touchStart.current === null) return;
    
    e.preventDefault();
    
    const delta = (touchStart.current - e.touches[0].clientY) * 0.005;
    const newProgress = Math.max(bounds.min, Math.min(bounds.max, progressRef.current + delta));
    
    onProgressChange(newProgress);
    touchStart.current = e.touches[0].clientY;
  }, [onProgressChange, bounds]);

  const handleTouchEnd = useCallback(() => {
    touchStart.current = null;
  }, []);

  useEffect(() => {
    // Add event listeners to window with capture phase
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  return null;
}
