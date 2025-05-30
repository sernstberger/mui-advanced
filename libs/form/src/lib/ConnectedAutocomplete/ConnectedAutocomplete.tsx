import { Controller, ControllerProps } from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteProps,
  FormControl,
  TextField,
  FormHelperText,
} from '@mui/material';
import {
  applyDefaultMessages,
  combineValidationRules,
  commonValidations,
} from '../utils/validation';

export interface AutocompleteOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface ConnectedAutocompleteProps
  extends Omit<
    AutocompleteProps<AutocompleteOption, boolean, boolean, boolean>,
    'name' | 'defaultValue' | 'options' | 'renderInput'
  > {
  name: string;
  label: string;
  hideLabel?: boolean;
  helperText?: string;
  required?: boolean;
  rules?: ControllerProps['rules'];
  options: AutocompleteOption[];
  placeholder?: string;
  multiple?: boolean;
}

export function ConnectedAutocomplete({
  name,
  label,
  hideLabel = false,
  helperText,
  required = false,
  rules,
  options,
  placeholder,
  multiple = false,
  ...props
}: ConnectedAutocompleteProps) {
  // Apply default messages to user rules
  const rulesWithDefaults = applyDefaultMessages(rules, label, required);

  // Combine built-in validation with user-provided validation
  const combinedRules = combineValidationRules(
    rulesWithDefaults,
    required
      ? multiple
        ? { notEmptyMultiple: commonValidations.notEmptyMultiple(label) }
        : { notEmpty: commonValidations.notEmpty(label) }
      : {},
    rules
  );

  return (
    <Controller
      name={name}
      rules={combinedRules}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error;

        return (
          <FormControl error={hasError} fullWidth>
            <Autocomplete
              {...field}
              {...props}
              multiple={multiple}
              options={options}
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
                  label={hideLabel ? undefined : label}
                  placeholder={placeholder}
                  required={required}
                  error={hasError}
                  helperText={fieldState.error?.message || helperText}
                  aria-label={hideLabel ? label : undefined}
                />
              )}
            />
          </FormControl>
        );
      }}
    />
  );
}
