import { Controller, ControllerProps, RegisterOptions } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  InputProps,
} from '@mui/material';
import {
  applyDefaultMessages,
  combineValidationRules,
  commonValidations,
} from '../utils/validation';

export type ConnectedTextInputProps = Omit<
  InputProps,
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
    id?: string;
    'data-testid'?: string;
  };

export function ConnectedTextInput({
  name,
  label,
  hideLabel = false,
  helperText,
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
}: ConnectedTextInputProps) {
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

  // Apply default messages to user rules
  const rulesWithDefaults = applyDefaultMessages(rules, label, isRequired);

  // Combine built-in validation with user-provided validation
  const combinedRules = combineValidationRules(
    rulesWithDefaults,
    { noWhitespaceOnly: commonValidations.noWhitespaceOnly },
    rules
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
      rules={combinedRules}
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
            <Input
              {...field}
              {...otherProps}
              id={inputId}
              data-testid={inputTestId}
              aria-label={hideLabel ? label : undefined}
            />

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
