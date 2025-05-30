import { Controller, ControllerProps } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import {
  applyDefaultMessages,
  combineValidationRules,
  commonValidations,
} from '../utils/validation';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ConnectedSelectProps
  extends Omit<SelectProps, 'name' | 'defaultValue'> {
  name: string;
  label: string;
  hideLabel?: boolean;
  helperText?: string;
  required?: boolean;
  rules?: ControllerProps['rules'];
  options: SelectOption[];
  placeholder?: string;
}

export function ConnectedSelect({
  name,
  label,
  hideLabel = false,
  helperText,
  required = false,
  rules,
  options,
  placeholder,
  ...props
}: ConnectedSelectProps) {
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
            {!hideLabel && <InputLabel>{label}</InputLabel>}
            <Select
              {...field}
              {...props}
              id={name}
              displayEmpty={!!placeholder}
              aria-label={hideLabel ? label : undefined}
            >
              {placeholder && (
                <MenuItem value="" disabled>
                  {placeholder}
                </MenuItem>
              )}
              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
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
