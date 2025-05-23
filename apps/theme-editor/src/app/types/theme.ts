import { z } from 'zod';

export const ThemeFormSchema = z.object({
  palette: z.object({
    primary: z.object({ main: z.string().regex(/^#[0-9A-Fa-f]{6}$/) }),
    secondary: z.object({ main: z.string().regex(/^#[0-9A-Fa-f]{6}$/) }),
    error: z.object({ main: z.string().regex(/^#[0-9A-Fa-f]{6}$/) }),
    warning: z.object({ main: z.string().regex(/^#[0-9A-Fa-f]{6}$/) }),
    info: z.object({ main: z.string().regex(/^#[0-9A-Fa-f]{6}$/) }),
    success: z.object({ main: z.string().regex(/^#[0-9A-Fa-f]{6}$/) }),
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
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 14,
  },
};
