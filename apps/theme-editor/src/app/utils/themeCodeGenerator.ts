import { ThemeFormData, TYPOGRAPHY_VARIANTS } from '../types/theme';

export function generateThemeCode(data: ThemeFormData): string {
  // Generate components overrides
  const componentsCode =
    data.components && data.components.length > 0
      ? `  components: {
${data.components
  .map((override) => {
    const parts: string[] = [];

    if (override.defaultProps) {
      parts.push(
        `      defaultProps: ${JSON.stringify(override.defaultProps, null, 8)}`
      );
    }

    if (override.styleOverrides) {
      const styleStr = JSON.stringify(override.styleOverrides, null, 8)
        .split('\n')
        .map((line) => '      ' + line)
        .join('\n');
      parts.push(`      styleOverrides: ${styleStr}`);
    }

    return `    Mui${override.component}: {
${parts.join(',\n')}
    }`;
  })
  .join(',\n')}
  },`
      : '';

  // Generate typography variants code
  const typographyVariants = TYPOGRAPHY_VARIANTS.filter(
    (variant) => data.typography[variant]
  )
    .map((variant) => {
      const variantData = data.typography[variant];
      if (!variantData) return '';

      const cleanVariantData = Object.fromEntries(
        Object.entries(variantData).filter(
          ([_, value]) => value !== undefined && value !== ''
        )
      );

      if (Object.keys(cleanVariantData).length === 0) return '';

      return `    ${variant}: ${JSON.stringify(cleanVariantData, null, 6)}`;
    })
    .filter(Boolean);

  const typographyVariantsCode =
    typographyVariants.length > 0 ? `,\n${typographyVariants.join(',\n')}` : '';

  return `import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: '${data.palette.mode}',
    primary: { main: '${data.palette.primary.main}' },
    secondary: { main: '${data.palette.secondary.main}' },
    error: { main: '${data.palette.error.main}' },
    warning: { main: '${data.palette.warning.main}' },
    info: { main: '${data.palette.info.main}' },
    success: { main: '${data.palette.success.main}' },
  },
  typography: {
    fontFamily: '${data.typography.fontFamily}',
    fontSize: ${data.typography.fontSize}${typographyVariantsCode}
  },${componentsCode ? '\n' + componentsCode : ''}
});

// Usage instructions:
// 1. Save this file as theme.ts in your project
// 2. Import and use with ThemeProvider:
// import { ThemeProvider } from '@mui/material/styles';
// import { theme } from './theme';
//
// <ThemeProvider theme={theme}>
//   <App />
// </ThemeProvider>
`;
}
