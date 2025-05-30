import { Controller, ControllerProps, RegisterOptions } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Slider,
  SliderProps,
} from '@mui/material';
import { createValidationRules, commonValidations } from '../utils/validation';

export type ConnectedSliderProps = Omit<
  SliderProps,
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

export function ConnectedSlider({
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
}: ConnectedSliderProps) {
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
    isRequired ? { hasValue: commonValidations.hasValue(label) } : {},
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
              <FormLabel
                component="legend"
                required={isRequired}
                id={labelId}
                data-testid={labelTestId}
              >
                {label}
              </FormLabel>
            )}
            <Slider
              {...field}
              {...otherProps}
              id={inputId}
              data-testid={inputTestId}
              value={field.value || 0}
              disabled={disabled}
              onChange={(event, value) => field.onChange(value)}
              aria-labelledby={!hideLabel ? labelId : undefined}
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
