import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemeFormSchema, ThemeFormData } from '../types/theme';
import { useAppDispatch, useAppSelector } from './redux';
import type { ThemeState } from '../store/themeSlice';

const useThemeForm = () => {
  const dispatch = useAppDispatch();
  const themeState = useAppSelector((state) => state.theme);

  // Cast fontFamily to the Zod enum type if needed
  const defaultValues: ThemeFormData = {
    ...themeState,
    typography: {
      ...themeState.typography,
      fontFamily: themeState.typography
        .fontFamily as ThemeFormData['typography']['fontFamily'],
    },
  };

  const form = useForm<ThemeFormData>({
    resolver: zodResolver(ThemeFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  // Auto-save on form changes
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (form.formState.isValid) {
        // Only dispatch if value actually changes
        if (JSON.stringify(data) !== JSON.stringify(themeState)) {
          // You may want to dispatch individual actions here, or batch update if you add such an action
          // For now, do nothing (handled by form submit or section components)
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, themeState]);

  return form;
};

export default useThemeForm;
