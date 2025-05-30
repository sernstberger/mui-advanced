import { ControllerProps } from 'react-hook-form';
import { z } from 'zod';

/**
 * Creates a react-hook-form validation function from a zod schema
 * This is primarily used for standalone field validation when not using zodResolver
 */
export const createZodValidation = (zodSchema: z.ZodSchema) => {
  return (value: any) => {
    const result = zodSchema.safeParse(value);
    if (result.success) {
      return true;
    }
    // Return the first error message from zod
    return result.error.issues[0]?.message || 'Invalid value';
  };
};

/**
 * Helper function to create useForm with zodResolver
 * This is the recommended way to use zod validation with react-hook-form
 *
 * @example
 * const userSchema = z.object({
 *   name: z.string().min(1, 'Name is required'),
 *   email: z.string().email('Invalid email')
 * });
 *
 * const form = useZodForm(userSchema, {
 *   defaultValues: { name: '', email: '' }
 * });
 */
export const createZodFormConfig = <T extends z.ZodSchema>(
  schema: T,
  options?: Omit<any, 'resolver'>
) => {
  return {
    ...options,
    resolver: undefined, // Will be set by the consumer using zodResolver
    mode: 'onChange' as const,
    // Export the schema for use in components
    schema,
  };
};

/**
 * Type helper to infer form data type from zod schema
 */
export type InferFormData<T extends z.ZodSchema> = z.infer<T>;

/**
 * Default error message templates
 */
const getDefaultErrorMessages = (label: string) => {
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
 * Creates validation rules for fields using our new zod-first approach
 * This handles both built-in validations and custom zod schema validation
 * Also provides default error messages for basic validation rules
 */
export const createValidationRules = (
  builtInValidations: Record<string, (value: any) => true | string>,
  userRules?: ControllerProps['rules'],
  label?: string
): ControllerProps['rules'] => {
  if (!userRules) {
    return {
      validate: builtInValidations,
    };
  }

  // Get default error messages for this field
  const defaults = label ? getDefaultErrorMessages(label) : null;

  // Create enhanced rules with default messages
  const enhancedRules: ControllerProps['rules'] = {};

  // Handle required rule
  if (userRules.required !== undefined) {
    if (typeof userRules.required === 'boolean') {
      enhancedRules.required =
        userRules.required && defaults ? defaults.required : userRules.required;
    } else {
      enhancedRules.required = userRules.required; // Custom message or object provided
    }
  }

  // Handle minLength rule
  if (userRules.minLength !== undefined) {
    if (typeof userRules.minLength === 'number') {
      enhancedRules.minLength = {
        value: userRules.minLength,
        message:
          defaults?.minLength?.replace(
            '{value}',
            userRules.minLength.toString()
          ) || `Must be at least ${userRules.minLength} characters`,
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
        message:
          defaults?.maxLength?.replace(
            '{value}',
            userRules.maxLength.toString()
          ) || `Must be no more than ${userRules.maxLength} characters`,
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
        message:
          defaults?.min?.replace('{value}', userRules.min.toString()) ||
          `Must be at least ${userRules.min}`,
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
        message:
          defaults?.max?.replace('{value}', userRules.max.toString()) ||
          `Must be no more than ${userRules.max}`,
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
        message: defaults?.pattern || 'Format is invalid',
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
        'validate',
      ].includes(key)
    ) {
      (enhancedRules as any)[key] = (userRules as any)[key];
    }
  });

  // Handle validate functions - merge built-in validations with user validations
  if (userRules.validate) {
    if (typeof userRules.validate === 'function') {
      enhancedRules.validate = {
        ...builtInValidations,
        custom: userRules.validate,
      };
    } else if (typeof userRules.validate === 'object') {
      enhancedRules.validate = {
        ...builtInValidations,
        ...userRules.validate,
      };
    }
  } else {
    enhancedRules.validate = builtInValidations;
  }

  return enhancedRules;
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

// Temporary deprecated functions - will be removed once all components are updated
/**
 * @deprecated Use createValidationRules instead
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

  // Copy other rules as-is
  if (userRules) {
    Object.keys(userRules).forEach((key) => {
      if (!['required'].includes(key)) {
        (enhancedRules as any)[key] = (userRules as any)[key];
      }
    });
  }

  return enhancedRules;
};

/**
 * @deprecated Use createValidationRules instead
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
