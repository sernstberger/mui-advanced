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
 * Common zod schemas for different field types
 * These provide a zod-first approach to validation and replace the need for most custom validation functions
 */
export const commonSchemas = {
  /**
   * Required text field that doesn't allow whitespace-only input
   */
  requiredText: (label: string) =>
    z.string().min(1, `${label} is required`).trim(),

  /**
   * Optional text field that doesn't allow whitespace-only input if provided
   */
  optionalText: () =>
    z
      .string()
      .refine(
        (value) => !value || value.trim().length > 0,
        'Cannot be empty or whitespace only'
      )
      .optional()
      .or(z.literal('')),

  /**
   * Required checkbox (must be true)
   */
  requiredCheckbox: (label: string) =>
    z.boolean().refine((val) => val === true, `${label} must be checked`),

  /**
   * Required select/autocomplete field
   */
  requiredSelect: (label: string) =>
    z
      .string()
      .min(1, `${label} is required`)
      .or(z.number().min(0, `${label} is required`)),

  /**
   * Required multi-select field
   */
  requiredMultiSelect: (label: string) =>
    z
      .array(z.string())
      .min(1, `At least one ${label.toLowerCase()} must be selected`)
      .or(
        z
          .array(z.number())
          .min(1, `At least one ${label.toLowerCase()} must be selected`)
      ),

  /**
   * Required rating (must be greater than 0)
   */
  requiredRating: (label: string) => z.number().min(1, `${label} is required`),

  /**
   * Required slider value
   */
  requiredSlider: (label: string) =>
    z
      .number()
      .min(0, `${label} is required`)
      .or(z.array(z.number()).min(1, `${label} is required`)),

  /**
   * Required radio group selection
   */
  requiredRadio: (label: string) =>
    z
      .string()
      .min(1, `${label} is required`)
      .or(z.number().min(0, `${label} is required`)),

  /**
   * Required switch (must be true)
   */
  requiredSwitch: (label: string) =>
    z.boolean().refine((val) => val === true, `${label} must be enabled`),

  /**
   * Required checkbox group (at least one selected)
   */
  requiredCheckboxGroup: (label: string) =>
    z
      .array(z.string())
      .min(1, `At least one ${label.toLowerCase()} must be selected`)
      .or(
        z
          .array(z.number())
          .min(1, `At least one ${label.toLowerCase()} must be selected`)
      ),
};
