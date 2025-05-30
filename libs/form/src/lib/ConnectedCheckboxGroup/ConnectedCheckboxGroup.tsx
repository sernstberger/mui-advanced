import { Controller, ControllerProps } from 'react-hook-form';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from '@mui/material';

export interface CheckboxGroupOption {
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
  options: CheckboxGroupOption[];
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
  // Built-in validation to require at least one checkbox when required
  const builtInValidation = (value: (string | number)[]) => {
    if (required && (!value || value.length === 0)) {
      return `At least one ${label.toLowerCase()} must be selected`;
    }
    return true;
  };

  // Create default error messages using the field label
  const getDefaultErrorMessages = () => {
    return {
      required: `At least one ${label.toLowerCase()} must be selected`,
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
      // Handle minLength rule
      if (userRules.minLength !== undefined) {
        if (typeof userRules.minLength === 'number') {
          enhancedRules.minLength = {
            value: userRules.minLength,
            message: defaults.minLength.replace(
              '{value}',
              userRules.minLength.toString()
            ),
          };
        } else {
          enhancedRules.minLength = userRules.minLength; // Custom message provided
        }
      }

      // Handle maxLength rule
      if (userRules.maxLength !== undefined) {
        if (typeof userRules.maxLength === 'number') {
          enhancedRules.maxLength = {
            value: userRules.maxLength,
            message: defaults.maxLength.replace(
              '{value}',
              userRules.maxLength.toString()
            ),
          };
        } else {
          enhancedRules.maxLength = userRules.maxLength; // Custom message provided
        }
      }

      // Handle min rule
      if (userRules.min !== undefined) {
        if (typeof userRules.min === 'number') {
          enhancedRules.min = {
            value: userRules.min,
            message: defaults.min.replace('{value}', userRules.min.toString()),
          };
        } else {
          enhancedRules.min = userRules.min; // Custom message provided
        }
      }

      // Handle max rule
      if (userRules.max !== undefined) {
        if (typeof userRules.max === 'number') {
          enhancedRules.max = {
            value: userRules.max,
            message: defaults.max.replace('{value}', userRules.max.toString()),
          };
        } else {
          enhancedRules.max = userRules.max; // Custom message provided
        }
      }

      // Handle pattern rule
      if (userRules.pattern !== undefined) {
        if (userRules.pattern instanceof RegExp) {
          enhancedRules.pattern = {
            value: userRules.pattern,
            message: defaults.pattern,
          };
        } else {
          enhancedRules.pattern = userRules.pattern; // Custom message provided
        }
      }

      // Copy other rules as-is
      Object.keys(userRules).forEach((key) => {
        if (
          ![
            'required',
            'minLength',
            'maxLength',
            'min',
            'max',
            'pattern',
          ].includes(key)
        ) {
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
      atLeastOne: builtInValidation,
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
        const selectedValues = field.value || [];

        const handleChange = (
          optionValue: string | number,
          checked: boolean
        ) => {
          let newValues: (string | number)[];
          if (checked) {
            newValues = [...selectedValues, optionValue];
          } else {
            newValues = selectedValues.filter(
              (val: string | number) => val !== optionValue
            );
          }
          field.onChange(newValues);
        };

        return (
          <FormControl error={hasError} component="fieldset">
            {!hideLabel && (
              <FormLabel component="legend" required={required}>
                {label}
              </FormLabel>
            )}
            <FormGroup row={row}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={selectedValues.includes(option.value)}
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
