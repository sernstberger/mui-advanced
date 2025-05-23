import { useForm, UseFormReturn } from 'react-hook-form';
import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ThemeFormData,
  ThemeFormSchema,
  defaultThemeValues,
} from '../types/theme';

const STORAGE_KEY = 'mui-theme-editor-theme';

export function usePersistedForm(): UseFormReturn<ThemeFormData> {
  // Load initial values from localStorage or use defaults
  const getInitialValues = (): ThemeFormData => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate against schema
        return ThemeFormSchema.parse(parsed);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      // Clear invalid data
      localStorage.removeItem(STORAGE_KEY);
    }
    return defaultThemeValues;
  };

  const methods = useForm<ThemeFormData>({
    resolver: zodResolver(ThemeFormSchema),
    defaultValues: getInitialValues(),
    mode: 'onChange',
  });

  const { watch, reset } = methods;
  const watchedValues = watch();
  const isInitialMount = useRef(true);

  // Save to localStorage when form data changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Debounce the save operation
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  // Custom reset function that also clears localStorage
  const resetWithStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    reset(defaultThemeValues);
  };

  return {
    ...methods,
    reset: resetWithStorage,
  };
}
