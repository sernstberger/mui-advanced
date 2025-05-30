import { ControllerProps } from 'react-hook-form';

/**
 * Default error message templates
 */
export const getDefaultErrorMessages = (label: string) => {
  return {
    required: `${label} is required`,
    minLength: `${label} must be at least {value} characters`,
    maxLength: `${label} must be no more than {value} characters`,
    min: `${label} must be at least {value}`,
    max: `${label} must be no more than {value}`,
    pattern: `${label} format is invalid`,
  };
};

/**
 * Applies default error messages to validation rules if not already provided
 */
export const applyDefaultMessages = (
  userRules: ControllerProps['rules'],
  label: string,
  required?: boolean
): ControllerProps['rules'] => {
  const defaults = getDefaultErrorMessages(label);
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

/**
 * Combines validation rules with custom validation functions
 */
export const combineValidationRules = (
  rulesWithDefaults: ControllerProps['rules'],
  builtInValidations: Record<string, (value: any) => true | string>,
  userRules?: ControllerProps['rules']
): ControllerProps['rules'] => {
  return {
    ...rulesWithDefaults,
    validate: {
      // Built-in validations
      ...builtInValidations,
      // User-provided validation (if any)
      ...(typeof userRules?.validate === 'function'
        ? { custom: userRules.validate }
        : typeof userRules?.validate === 'object'
        ? userRules.validate
        : {}),
    },
  };
};

/**
 * Common built-in validations for different field types
 */
export const commonValidations = {
  /**
   * Validation for text inputs to prevent whitespace-only input
   */
  noWhitespaceOnly: (value: string) => {
    if (value && !value.trim()) {
      return 'Cannot be empty or whitespace only';
    }
    return true;
  },

  /**
   * Validation for required checkboxes
   */
  mustBeChecked: (label: string) => (value: boolean) => {
    if (!value) {
      return `${label} must be checked`;
    }
    return true;
  },

  /**
   * Validation for required switches
   */
  mustBeEnabled: (label: string) => (value: boolean) => {
    if (!value) {
      return `${label} must be enabled`;
    }
    return true;
  },

  /**
   * Validation for required select/autocomplete/radio fields
   */
  notEmpty: (label: string) => (value: string | number) => {
    if (value === '' || value === null || value === undefined) {
      return `${label} is required`;
    }
    return true;
  },

  /**
   * Validation for required autocomplete with multiple selection
   */
  notEmptyMultiple: (label: string) => (value: any[] | null) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return `${label} is required`;
    }
    return true;
  },

  /**
   * Validation for required rating
   */
  hasRating: (label: string) => (value: number | null) => {
    if (value === null || value === 0) {
      return `${label} is required`;
    }
    return true;
  },

  /**
   * Validation for required checkbox groups
   */
  atLeastOneSelected: (label: string) => (value: (string | number)[]) => {
    if (!value || value.length === 0) {
      return `At least one ${label.toLowerCase()} must be selected`;
    }
    return true;
  },

  /**
   * Validation for required slider (custom logic based on needs)
   */
  hasValue: (label: string) => (value: number | number[]) => {
    // This is a placeholder - slider validation logic may vary based on requirements
    if (value === null || value === undefined) {
      return `${label} is required`;
    }
    return true;
  },
};
