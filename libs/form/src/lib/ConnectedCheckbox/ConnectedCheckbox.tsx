import { Controller, ControllerProps } from 'react-hook-form';
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import {
  applyDefaultMessages,
  combineValidationRules,
  commonValidations,
} from '../utils/validation';

export interface ConnectedCheckboxProps
  extends Omit<CheckboxProps, 'name' | 'defaultValue'> {
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
  rules?: ControllerProps['rules'];
}

export function ConnectedCheckbox({
  name,
  label,
  helperText,
  required = false,
  rules,
  ...props
}: ConnectedCheckboxProps) {
  // Apply default messages to user rules
  const rulesWithDefaults = applyDefaultMessages(rules, label, required);

  // Combine built-in validation with user-provided validation
  const combinedRules = combineValidationRules(
    rulesWithDefaults,
    required ? { mustBeChecked: commonValidations.mustBeChecked(label) } : {},
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
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  {...props}
                  checked={field.value || false}
                  onChange={(event, checked) => field.onChange(checked)}
                />
              }
              label={label}
              required={required}
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
