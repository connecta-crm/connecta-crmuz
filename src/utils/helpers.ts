import { useCallback, useRef } from 'react';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function useDebounce(callback: () => void, delay: number) {
  const timer = useRef(null);

  const debouncedCallback = useCallback(
    (...args: unknown[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
}
