import { Controller, ControllerProps } from 'react-hook-form';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import {
  applyDefaultMessages,
  combineValidationRules,
  commonValidations,
} from '../utils/validation';

export interface CheckboxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ConnectedCheckboxGroupProps {
  name: string;
  label: string;
  hideLabel?: boolean;
  helperText?: string;
  required?: boolean;
  rules?: ControllerProps['rules'];
  options: CheckboxOption[];
  row?: boolean;
}

export function ConnectedCheckboxGroup({
  name,
  label,
  hideLabel = false,
  helperText,
  required = false,
  rules,
  options,
  row = false,
}: ConnectedCheckboxGroupProps) {
  // Apply default messages to user rules
  const rulesWithDefaults = applyDefaultMessages(rules, label, required);

  // Combine built-in validation with user-provided validation
  const combinedRules = combineValidationRules(
    rulesWithDefaults,
    required
      ? { atLeastOneSelected: commonValidations.atLeastOneSelected(label) }
      : {},
    rules
  );

  return (
    <Controller
      name={name}
      rules={combinedRules}
      defaultValue={[]}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;
        const value = field.value || [];

        const handleChange = (
          optionValue: string | number,
          checked: boolean
        ) => {
          if (checked) {
            field.onChange([...value, optionValue]);
          } else {
            field.onChange(
              value.filter((v: string | number) => v !== optionValue)
            );
          }
        };

        return (
          <FormControl error={hasError} required={required}>
            {!hideLabel && <FormLabel component="legend">{label}</FormLabel>}
            <FormGroup row={row}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={value.includes(option.value)}
                      onChange={(_, checked) =>
                        handleChange(option.value, checked)
                      }
                      disabled={option.disabled}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
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
