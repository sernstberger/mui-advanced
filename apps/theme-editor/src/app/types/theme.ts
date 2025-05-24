import { darken, lighten, rgbToHex } from '@mui/material/styles';
import { z } from 'zod';

// Component override types
export const ComponentOverrideSchema = z.object({
  id: z.string(),
  component: z.string(),
  defaultProps: z.record(z.any()).optional(),
  styleOverrides: z.record(z.any()).optional(),
});

export type ComponentOverride = z.infer<typeof ComponentOverrideSchema>;

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
  components: z.array(ComponentOverrideSchema).default([]),
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

// MUI Components for overrides
export const MUI_COMPONENTS = [
  'Button',
  'TextField',
  'Paper',
  'Card',
  'AppBar',
  'Drawer',
  'Typography',
  'Chip',
  'Avatar',
  'Dialog',
  'Alert',
  'Switch',
  'Checkbox',
  'Radio',
  'Slider',
  'Fab',
  'IconButton',
  'Tooltip',
  'Snackbar',
  'Accordion',
] as const;

// Common props for MUI components
export const COMPONENT_PROPS: Record<string, Record<string, any>> = {
  Button: {
    variant: ['contained', 'outlined', 'text'],
    size: ['small', 'medium', 'large'],
    color: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    disableRipple: [true, false],
    disableElevation: [true, false],
    fullWidth: [true, false],
  },
  TextField: {
    variant: ['outlined', 'filled', 'standard'],
    size: ['small', 'medium'],
    fullWidth: [true, false],
    multiline: [true, false],
    required: [true, false],
    disabled: [true, false],
  },
  Paper: {
    variant: ['elevation', 'outlined'],
    elevation: [0, 1, 2, 3, 4, 5, 6, 8, 12, 16, 24],
    square: [true, false],
  },
  Card: {
    variant: ['elevation', 'outlined'],
    raised: [true, false],
  },
  Typography: {
    variant: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'caption',
      'overline',
    ],
    align: ['left', 'center', 'right', 'justify'],
    gutterBottom: [true, false],
    noWrap: [true, false],
  },
  Chip: {
    variant: ['filled', 'outlined'],
    size: ['small', 'medium'],
    color: [
      'default',
      'primary',
      'secondary',
      'error',
      'info',
      'success',
      'warning',
    ],
    clickable: [true, false],
    deletable: [true, false],
  },
  Switch: {
    size: ['small', 'medium'],
    color: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    disabled: [true, false],
  },
  Checkbox: {
    size: ['small', 'medium'],
    color: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    disabled: [true, false],
    indeterminate: [true, false],
  },
};

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
  components: [],
};
