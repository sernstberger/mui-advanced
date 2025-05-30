import { Controller, ControllerProps, RegisterOptions } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormHelperText,
  Checkbox,
} from '@mui/material';
import { createValidationRules, commonValidations } from '../utils/validation';

export interface CheckboxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export type ConnectedCheckboxGroupProps = Omit<
  React.ComponentProps<typeof FormGroup>,
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
    options: CheckboxOption[];
    id?: string;
    'data-testid'?: string;
  };

export function ConnectedCheckboxGroup({
  name,
  label,
  hideLabel = false,
  helperText,
  options,
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
}: ConnectedCheckboxGroupProps) {
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
    isRequired
      ? { atLeastOneSelected: commonValidations.atLeastOneSelected(label) }
      : {},
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
        const value = field.value || [];

        return (
          <FormControl error={hasError}>
            {!hideLabel && (
              <FormLabel
                component="legend"
                required={isRequired}
                id={labelId}
                data-testid={labelTestId}
              >
                {label}
              </FormLabel>
            )}
            <FormGroup
              {...otherProps}
              id={inputId}
              data-testid={inputTestId}
              aria-labelledby={!hideLabel ? labelId : undefined}
              aria-label={hideLabel ? label : undefined}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={value.includes(option.value)}
                      onChange={(event, checked) => {
                        const newValue = checked
                          ? [...value, option.value]
                          : value.filter((v: any) => v !== option.value);
                        field.onChange(newValue);
                      }}
                      disabled={option.disabled || disabled}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
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
