import { Controller, ControllerProps, RegisterOptions } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { createValidationRules, commonValidations } from '../utils/validation';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type ConnectedSelectProps = Omit<
  SelectProps,
  | 'name'
  | 'defaultValue'
  | 'required'
  | 'min'
  | 'max'
  | 'pattern'
  | 'validate'
  | 'minLength'
  | 'maxLength'
> &
  RegisterOptions & {
    name: string;
    label: string;
    hideLabel?: boolean;
    helperText?: string;
    options: SelectOption[];
    placeholder?: string;
    id?: string;
    'data-testid'?: string;
  };

export function ConnectedSelect({
  name,
  label,
  hideLabel = false,
  helperText,
  options,
  placeholder,
  id,
  'data-testid': dataTestId,
  // Extract react-hook-form rules from props
  required,
  min,
  max,
  minLength,
  maxLength,
  pattern,
  validate,
  valueAsNumber,
  valueAsDate,
  setValueAs,
  shouldUnregister,
  onChange,
  onBlur,
  disabled,
  deps,
  ...otherProps
}: ConnectedSelectProps) {
  const rules = {
    required,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    validate,
    valueAsNumber,
    valueAsDate,
    setValueAs,
    shouldUnregister,
    onChange,
    onBlur,
    disabled,
    deps,
  };

  // Convert required to boolean for UI (it might be a validation rule object)
  const isRequired = Boolean(required);

  // Use validation approach that works with zodResolver at form level
  const validationRules = createValidationRules(
    isRequired ? { notEmpty: commonValidations.notEmpty(label) } : {},
    rules,
    label
  );

  // Generate IDs based on custom id or fallback to name
  const baseId = id || name;
  const inputId = baseId;
  const labelId = `${baseId}-label`;
  const helperTextId = `${baseId}-helper-text`;
  const errorTextId = `${baseId}-error-text`;

  // Generate data-testids based on custom data-testid or fallback to name
  const baseTestId = dataTestId || name;
  const inputTestId = `${baseTestId}-input`;
  const labelTestId = `${baseTestId}-label`;
  const helperTextTestId = `${baseTestId}-helper-text`;
  const errorTextTestId = `${baseTestId}-error-text`;

  return (
    <Controller
      name={name}
      rules={validationRules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <FormControl error={hasError}>
            {!hideLabel && (
              <InputLabel
                htmlFor={inputId}
                required={isRequired}
                id={labelId}
                data-testid={labelTestId}
              >
                {label}
              </InputLabel>
            )}
            <Select
              {...field}
              {...otherProps}
              id={inputId}
              data-testid={inputTestId}
              labelId={!hideLabel ? labelId : undefined}
              label={!hideLabel ? label : undefined}
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
              <FormHelperText
                id={hasError ? errorTextId : helperTextId}
                data-testid={hasError ? errorTextTestId : helperTextTestId}
              >
                {fieldState.error?.message || helperText}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
