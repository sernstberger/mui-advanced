import { Controller, ControllerProps } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Slider,
  SliderProps,
} from '@mui/material';
import {
  applyDefaultMessages,
  combineValidationRules,
  commonValidations,
} from '../utils/validation';

export interface ConnectedSliderProps
  extends Omit<SliderProps, 'name' | 'defaultValue'> {
  name: string;
  label: string;
  hideLabel?: boolean;
  helperText?: string;
  required?: boolean;
  rules?: ControllerProps['rules'];
}

export function ConnectedSlider({
  name,
  label,
  hideLabel = false,
  helperText,
  required = false,
  rules,
  ...props
}: ConnectedSliderProps) {
  // Apply default messages to user rules
  const rulesWithDefaults = applyDefaultMessages(rules, label, required);

  // Combine built-in validation with user-provided validation
  const combinedRules = combineValidationRules(
    rulesWithDefaults,
    required ? { hasValue: commonValidations.hasValue(label) } : {},
    rules
  );

  return (
    <Controller
      name={name}
      rules={combinedRules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <FormControl error={hasError} fullWidth>
            {!hideLabel && (
              <FormLabel required={required} id={`${name}-label`}>
                {label}
              </FormLabel>
            )}
            <Slider
              {...field}
              {...props}
              value={field.value ?? (props.min || 0)}
              onChange={(_, value) => field.onChange(value)}
              aria-labelledby={hideLabel ? undefined : `${name}-label`}
              aria-label={hideLabel ? label : undefined}
            />
            {(hasError || helperText) && (
              <FormHelperText>
                {fieldState.error?.message || helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
