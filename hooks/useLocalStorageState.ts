'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

function readStoredValue<T>(key: string, initialValue: T) {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null ? (JSON.parse(storedValue) as T) : initialValue;
  } catch (error) {
    console.error(`Unable to read local storage key \"${key}\".`, error);
    return initialValue;
  }
}

export function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const initialValueRef = useRef(initialValue);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setValue(readStoredValue(key, initialValueRef.current));
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [key]);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Unable to write local storage key \"${key}\".`, error);
    }
  }, [hydrated, key, value]);

  return [value, setValue, hydrated] as [T, Dispatch<SetStateAction<T>>, boolean];
}
