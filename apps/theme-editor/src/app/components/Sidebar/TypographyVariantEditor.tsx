import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useFormContext, Controller } from 'react-hook-form';
import {
  FONT_FAMILIES,
  TYPOGRAPHY_VARIANTS,
  ThemeFormData,
  DEFAULT_TYPOGRAPHY_VARIANTS,
} from '../../types/theme';
import SizeInput from '../inputs/SizeInput';

const FONT_WEIGHTS = [
  { value: 100, label: '100 - Thin' },
  { value: 200, label: '200 - Extra Light' },
  { value: 300, label: '300 - Light' },
  { value: 400, label: '400 - Regular' },
  { value: 500, label: '500 - Medium' },
  { value: 600, label: '600 - Semi Bold' },
  { value: 700, label: '700 - Bold' },
  { value: 800, label: '800 - Extra Bold' },
  { value: 900, label: '900 - Black' },
];

interface TypographyVariantEditorProps {
  variant: string;
}

function TypographyVariantEditor({ variant }: TypographyVariantEditorProps) {
  const { control, setValue } = useFormContext<ThemeFormData>();

  const variantDisplayName = variant.charAt(0).toUpperCase() + variant.slice(1);
  const defaults = DEFAULT_TYPOGRAPHY_VARIANTS[variant];

  const resetField = (fieldName: string, defaultValue: any) => {
    setValue(`typography.${variant}.${fieldName}` as any, defaultValue);
  };

  const ResetButton = ({
    fieldName,
    defaultValue,
  }: {
    fieldName: string;
    defaultValue: any;
  }) => (
    <Tooltip title={`Reset to MUI default: ${defaultValue}`}>
      <IconButton
        size="small"
        onClick={() => resetField(fieldName, defaultValue)}
        sx={{ ml: 1 }}
      >
        <RestartAltIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {variantDisplayName}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <Controller
            name={`typography.${variant}.fontFamily` as any}
            control={control}
            render={({ field }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  select
                  label="Font Family"
                  size="small"
                  value={field.value || ''}
                  onChange={field.onChange}
                  fullWidth
                  placeholder={defaults?.fontFamily}
                  helperText={`MUI default: ${defaults?.fontFamily}`}
                >
                  <MenuItem value="">
                    <em>Use MUI Default</em>
                  </MenuItem>
                  {FONT_FAMILIES.map((family) => (
                    <MenuItem
                      key={family}
                      value={`"${family}", "Helvetica", "Arial", sans-serif`}
                    >
                      {family}
                    </MenuItem>
                  ))}
                </TextField>
                <ResetButton
                  fieldName="fontFamily"
                  defaultValue={defaults?.fontFamily}
                />
              </Box>
            )}
          />

          <Controller
            name={`typography.${variant}.fontWeight` as any}
            control={control}
            render={({ field }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  select
                  label="Font Weight"
                  size="small"
                  value={field.value || ''}
                  onChange={field.onChange}
                  fullWidth
                  helperText={`MUI default: ${defaults?.fontWeight}`}
                >
                  <MenuItem value="">
                    <em>Use MUI Default</em>
                  </MenuItem>
                  {FONT_WEIGHTS.map((weight) => (
                    <MenuItem key={weight.value} value={weight.value}>
                      {weight.label}
                    </MenuItem>
                  ))}
                </TextField>
                <ResetButton
                  fieldName="fontWeight"
                  defaultValue={defaults?.fontWeight}
                />
              </Box>
            )}
          />

          <Controller
            name={`typography.${variant}.fontSize` as any}
            control={control}
            render={({ field }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SizeInput
                  label="Font Size"
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder={defaults?.fontSize}
                  helperText={`MUI default: ${defaults?.fontSize}`}
                />
                <ResetButton
                  fieldName="fontSize"
                  defaultValue={defaults?.fontSize}
                />
              </Box>
            )}
          />

          <Controller
            name={`typography.${variant}.lineHeight` as any}
            control={control}
            render={({ field }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SizeInput
                  label="Line Height"
                  value={String(field.value || '')}
                  onChange={(value) => {
                    // Try to parse as number for unitless values, otherwise keep as string
                    const numValue = parseFloat(value);
                    field.onChange(
                      isNaN(numValue) && value !== ''
                        ? value
                        : numValue || value
                    );
                  }}
                  placeholder={String(defaults?.lineHeight)}
                  helperText={`MUI default: ${defaults?.lineHeight}. Can be unitless (multiplier) or with CSS units`}
                  allowUnitless={true}
                />
                <ResetButton
                  fieldName="lineHeight"
                  defaultValue={defaults?.lineHeight}
                />
              </Box>
            )}
          />

          <Controller
            name={`typography.${variant}.letterSpacing` as any}
            control={control}
            render={({ field }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SizeInput
                  label="Letter Spacing"
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder={defaults?.letterSpacing}
                  helperText={`MUI default: ${defaults?.letterSpacing}`}
                />
                <ResetButton
                  fieldName="letterSpacing"
                  defaultValue={defaults?.letterSpacing}
                />
              </Box>
            )}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default TypographyVariantEditor;
