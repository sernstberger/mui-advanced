import { Controller, ControllerProps } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@mui/material';
import {
  applyDefaultMessages,
  combineValidationRules,
  commonValidations,
} from '../utils/validation';

export interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ConnectedRadioGroupProps
  extends Omit<RadioGroupProps, 'name' | 'defaultValue'> {
  name: string;
  label: string;
  hideLabel?: boolean;
  helperText?: string;
  required?: boolean;
  rules?: ControllerProps['rules'];
  options: RadioOption[];
}

export function ConnectedRadioGroup({
  name,
  label,
  hideLabel = false,
  helperText,
  required = false,
  rules,
  options,
  ...props
}: ConnectedRadioGroupProps) {
  // Apply default messages to user rules
  const rulesWithDefaults = applyDefaultMessages(rules, label, required);

  // Combine built-in validation with user-provided validation
  const combinedRules = combineValidationRules(
    rulesWithDefaults,
    required ? { notEmpty: commonValidations.notEmpty(label) } : {},
    rules
  );

  return (
    <Controller
      name={name}
      rules={combinedRules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <FormControl error={hasError} required={required}>
            {!hideLabel && <FormLabel component="legend">{label}</FormLabel>}
            <RadioGroup {...field} {...props}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  disabled={option.disabled}
                />
              ))}
            </RadioGroup>
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
