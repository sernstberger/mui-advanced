import { Controller, ControllerProps } from 'react-hook-form';
import {
  Switch,
  SwitchProps,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import {
  applyDefaultMessages,
  combineValidationRules,
  commonValidations,
} from '../utils/validation';

export interface ConnectedSwitchProps
  extends Omit<SwitchProps, 'name' | 'defaultValue'> {
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
  rules?: ControllerProps['rules'];
}

export function ConnectedSwitch({
  name,
  label,
  helperText,
  required = false,
  rules,
  ...props
}: ConnectedSwitchProps) {
  // Apply default messages to user rules
  const rulesWithDefaults = applyDefaultMessages(rules, label, required);

  // Combine built-in validation with user-provided validation
  const combinedRules = combineValidationRules(
    rulesWithDefaults,
    required ? { mustBeEnabled: commonValidations.mustBeEnabled(label) } : {},
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
                <Switch
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
