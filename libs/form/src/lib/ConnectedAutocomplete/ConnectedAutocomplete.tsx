import { Controller, ControllerProps } from 'react-hook-form';
import {
  Autocomplete,
  AutocompleteProps,
  FormControl,
  TextField,
  FormHelperText,
} from '@mui/material';

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
  // Built-in validation to prevent empty selection when required
  const builtInValidation = (
    value: AutocompleteOption | AutocompleteOption[] | null
  ) => {
    if (required) {
      if (multiple) {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return `${label} is required`;
        }
      } else {
        if (!value) {
          return `${label} is required`;
        }
      }
    }
    return true;
  };

  // Create default error messages using the field label
  const getDefaultErrorMessages = () => {
    return {
      required: `${label} is required`,
      minLength: `${label} must be at least {value} characters`,
      maxLength: `${label} must be no more than {value} characters`,
      min: `${label} must be at least {value}`,
      max: `${label} must be no more than {value}`,
      pattern: `${label} format is invalid`,
    };
  };

  // Apply default error messages to rules if not already provided
  const applyDefaultMessages = (userRules: ControllerProps['rules']) => {
    const defaults = getDefaultErrorMessages();
    const enhancedRules: ControllerProps['rules'] = {};

    // Handle required rule
    if (userRules?.required !== undefined) {
      if (typeof userRules.required === 'boolean') {
        enhancedRules.required = userRules.required ? defaults.required : false;
      } else if (typeof userRules.required === 'string') {
        enhancedRules.required = userRules.required; // Custom message provided
      } else {
        enhancedRules.required = userRules.required; // Object with value/message
      }
    } else if (required) {
      // If required prop is true but no required rule, add default
      enhancedRules.required = defaults.required;
    }

    // Only process other rules if userRules exists
    if (userRules) {
      // Copy other rules as-is, including validate
      Object.keys(userRules).forEach((key) => {
        if (!['required'].includes(key)) {
          (enhancedRules as any)[key] = (userRules as any)[key];
        }
      });
    }

    return enhancedRules;
  };

  // Apply default messages to user rules
  const rulesWithDefaults = applyDefaultMessages(rules);

  // Combine built-in validation with user-provided validation
  const combinedRules = {
    ...rulesWithDefaults,
    validate: {
      // Built-in required validation
      notEmpty: builtInValidation,
      // User-provided validation (if any)
      ...(typeof rules?.validate === 'function'
        ? { custom: rules.validate }
        : typeof rules?.validate === 'object'
        ? rules.validate
        : {}),
    },
  };

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
