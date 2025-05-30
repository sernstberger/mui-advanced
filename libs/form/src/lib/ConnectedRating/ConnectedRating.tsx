import { Controller, ControllerProps } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Rating,
  RatingProps,
} from '@mui/material';
import {
  applyDefaultMessages,
  combineValidationRules,
  commonValidations,
} from '../utils/validation';

export interface ConnectedRatingProps
  extends Omit<RatingProps, 'name' | 'defaultValue'> {
  name: string;
  label: string;
  hideLabel?: boolean;
  helperText?: string;
  required?: boolean;
  rules?: ControllerProps['rules'];
}

export function ConnectedRating({
  name,
  label,
  hideLabel = false,
  helperText,
  required = false,
  rules,
  ...props
}: ConnectedRatingProps) {
  // Apply default messages to user rules
  const rulesWithDefaults = applyDefaultMessages(rules, label, required);

  // Combine built-in validation with user-provided validation
  const combinedRules = combineValidationRules(
    rulesWithDefaults,
    required ? { hasRating: commonValidations.hasRating(label) } : {},
    rules
  );

  return (
    <Controller
      name={name}
      rules={combinedRules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <FormControl error={hasError}>
            {!hideLabel && (
              <FormLabel component="legend" required={required}>
                {label}
              </FormLabel>
            )}
            <Rating
              {...field}
              {...props}
              onChange={(_, value) => field.onChange(value)}
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
