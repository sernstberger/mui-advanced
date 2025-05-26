import { darken, lighten, rgbToHex } from '@mui/material/styles';
import { z } from 'zod';

// Typography variant schema
const TypographyVariantSchema = z.object({
  fontFamily: z.string().optional(),
  fontWeight: z.union([z.number(), z.string()]).optional(),
  fontSize: z.string().optional(),
  lineHeight: z.union([z.number(), z.string()]).optional(),
  letterSpacing: z.string().optional(),
});

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
    h1: TypographyVariantSchema.optional(),
    h2: TypographyVariantSchema.optional(),
    h3: TypographyVariantSchema.optional(),
    h4: TypographyVariantSchema.optional(),
    h5: TypographyVariantSchema.optional(),
    h6: TypographyVariantSchema.optional(),
    subtitle1: TypographyVariantSchema.optional(),
    subtitle2: TypographyVariantSchema.optional(),
    body1: TypographyVariantSchema.optional(),
    body2: TypographyVariantSchema.optional(),
    caption: TypographyVariantSchema.optional(),
    overline: TypographyVariantSchema.optional(),
  }),
  components: z.array(ComponentOverrideSchema).default([]),
});

export type ThemeFormData = z.infer<typeof ThemeFormSchema>;
export type TypographyVariant = z.infer<typeof TypographyVariantSchema>;

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

// Typography variants list
export const TYPOGRAPHY_VARIANTS = [
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
] as const;

// Default typography variant values based on MUI defaults
export const DEFAULT_TYPOGRAPHY_VARIANTS: Record<string, TypographyVariant> = {
  h1: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
    fontSize: '6rem',
    lineHeight: 1.167,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 300,
    fontSize: '3.75rem',
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '3rem',
    lineHeight: 1.167,
    letterSpacing: '0em',
  },
  h4: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '2.125rem',
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '1.5rem',
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  h6: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: 1.6,
    letterSpacing: '0.0075em',
  },
  subtitle1: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 500,
    fontSize: '0.875rem',
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  caption: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: '0.75rem',
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
  },
};

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
    ...DEFAULT_TYPOGRAPHY_VARIANTS,
  },
  components: [],
};
