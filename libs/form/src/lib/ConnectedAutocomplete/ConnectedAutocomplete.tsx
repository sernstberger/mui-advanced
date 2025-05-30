import { Controller, ControllerProps, RegisterOptions } from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteProps,
  FormControl,
  TextField,
  FormHelperText,
} from '@mui/material';
import { createValidationRules, commonValidations } from '../utils/validation';

export interface AutocompleteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export type ConnectedAutocompleteProps = Omit<
  AutocompleteProps<AutocompleteOption, boolean, boolean, boolean>,
  | 'name'
  | 'defaultValue'
  | 'options'
  | 'renderInput'
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
    options: AutocompleteOption[];
    placeholder?: string;
    multiple?: boolean;
    id?: string;
    'data-testid'?: string;
  };

export function ConnectedAutocomplete({
  name,
  label,
  hideLabel = false,
  helperText,
  options,
  placeholder,
  multiple = false,
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
}: ConnectedAutocompleteProps) {
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

  // Create validation rules - let createValidationRules handle all validation scenarios
  const validationRules = createValidationRules(
    // Add built-in validations when we have a required field, regardless of whether it's a string or boolean
    isRequired
      ? multiple
        ? { notEmptyMultiple: commonValidations.notEmptyMultiple(label) }
        : { notEmpty: commonValidations.notEmpty(label) }
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

        return (
          <FormControl error={hasError} fullWidth>
            <Autocomplete
              {...field}
              {...otherProps}
              multiple={multiple}
              options={options}
              disabled={disabled}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.label
              }
              getOptionDisabled={(option) =>
                typeof option === 'string' ? false : option.disabled || false
              }
              isOptionEqualToValue={(option, value) =>
                typeof option === 'string' && typeof value === 'string'
                  ? option === value
                  : typeof option !== 'string' && typeof value !== 'string'
                  ? option.value === value.value
                  : false
              }
              onChange={(_, value) => field.onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id={inputId}
                  data-testid={inputTestId}
                  label={hideLabel ? undefined : label}
                  placeholder={placeholder}
                  required={isRequired}
                  error={hasError}
                  helperText={fieldState.error?.message || helperText}
                  aria-label={hideLabel ? label : undefined}
                  InputLabelProps={
                    {
                      ...params.InputLabelProps,
                      id: labelId,
                      'data-testid': labelTestId,
                    } as any
                  }
                  FormHelperTextProps={
                    {
                      id: hasError ? errorTextId : helperTextId,
                      'data-testid': hasError
                        ? errorTextTestId
                        : helperTextTestId,
                    } as any
                  }
                />
              )}
            />
          </FormControl>
        );
      }}
    />
  );
}
