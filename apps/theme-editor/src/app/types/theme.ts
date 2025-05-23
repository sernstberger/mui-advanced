import { darken, lighten, rgbToHex } from '@mui/material/styles';
import { z } from 'zod';

export const ThemeFormSchema = z.object({
  palette: z.object({
    primary: z.object({
      light: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      main: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      dark: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      contrastText: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    secondary: z.object({
      light: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      main: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      dark: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      contrastText: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    error: z.object({
      light: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      main: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      dark: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      contrastText: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    warning: z.object({
      light: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      main: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      dark: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      contrastText: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    info: z.object({
      light: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      main: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      dark: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      contrastText: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    success: z.object({
      light: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      main: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      dark: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
      contrastText: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    }),
    mode: z.enum(['light', 'dark']),
  }),
  typography: z.object({
    fontFamily: z.enum(['Roboto', 'Inter', 'Arial', 'Helvetica', 'Open Sans']),
    fontSize: z.number().min(8).max(24),
  }),
});

export type ThemeFormData = z.infer<typeof ThemeFormSchema>;

export const BASE_FONT_SIZE = 14;
export const MIN_SCALE = 0.8;
export const MAX_SCALE = 1.5;
export const FONT_FAMILIES = [
  'Roboto',
  'Inter',
  'Arial',
  'Helvetica',
  'Open Sans',
] as const;

export const defaultThemeValues: ThemeFormData = {
  palette: {
    mode: 'light',
    primary: {
      light: rgbToHex(lighten('#1976d2', 0.2)),
      main: '#1976d2',
      dark: rgbToHex(darken('#1976d2', 0.2)),
      contrastText: '#ffffff',
    },
    secondary: {
      light: rgbToHex(lighten('#dc004e', 0.2)),
      main: '#dc004e',
      dark: rgbToHex(darken('#dc004e', 0.2)),
      contrastText: '#ffffff',
    },
    error: {
      light: rgbToHex(lighten('#f44336', 0.2)),
      main: '#f44336',
      dark: rgbToHex(darken('#f44336', 0.2)),
      contrastText: '#ffffff',
    },
    warning: {
      light: rgbToHex(lighten('#ff9800', 0.2)),
      main: '#ff9800',
      dark: rgbToHex(darken('#ff9800', 0.2)),
      contrastText: '#ffffff',
    },
    info: {
      light: rgbToHex(lighten('#2196f3', 0.2)),
      main: '#2196f3',
      dark: rgbToHex(darken('#2196f3', 0.2)),
      contrastText: '#ffffff',
    },
    success: {
      light: rgbToHex(lighten('#4caf50', 0.2)),
      main: '#4caf50',
      dark: rgbToHex(darken('#4caf50', 0.2)),
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 14,
  },
};
