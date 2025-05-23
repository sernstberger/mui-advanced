import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemeFormSchema, ThemeFormData } from '../types/theme';
import { useAppDispatch, useAppSelector } from './redux';
import {
  updatePrimaryColor,
  updateSecondaryColor,
  updateErrorColor,
  updateWarningColor,
  updateInfoColor,
  updateSuccessColor,
  updateMode,
  updateFontFamily,
  updateFontSize,
  resetToDefaults,
} from '../store/themeSlice';
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
      if (form.formState.isValid && data.palette && data.typography) {
        // Palette
        if (
          data.palette.primary?.main &&
          data.palette.primary.main !== themeState.palette.primary.main
        ) {
          dispatch(updatePrimaryColor(data.palette.primary.main));
        }
        if (
          data.palette.secondary?.main &&
          data.palette.secondary.main !== themeState.palette.secondary.main
        ) {
          dispatch(updateSecondaryColor(data.palette.secondary.main));
        }
        if (
          data.palette.error?.main &&
          data.palette.error.main !== themeState.palette.error.main
        ) {
          dispatch(updateErrorColor(data.palette.error.main));
        }
        if (
          data.palette.warning?.main &&
          data.palette.warning.main !== themeState.palette.warning.main
        ) {
          dispatch(updateWarningColor(data.palette.warning.main));
        }
        if (
          data.palette.info?.main &&
          data.palette.info.main !== themeState.palette.info.main
        ) {
          dispatch(updateInfoColor(data.palette.info.main));
        }
        if (
          data.palette.success?.main &&
          data.palette.success.main !== themeState.palette.success.main
        ) {
          dispatch(updateSuccessColor(data.palette.success.main));
        }
        if (
          data.palette.mode &&
          data.palette.mode !== themeState.palette.mode
        ) {
          dispatch(updateMode(data.palette.mode));
        }
        // Typography
        if (
          data.typography.fontFamily &&
          data.typography.fontFamily !== themeState.typography.fontFamily
        ) {
          dispatch(updateFontFamily(data.typography.fontFamily));
        }
        if (
          typeof data.typography.fontSize === 'number' &&
          data.typography.fontSize !== themeState.typography.fontSize
        ) {
          dispatch(updateFontSize(data.typography.fontSize));
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form, themeState, dispatch]);

  return form;
};

export default useThemeForm;
