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
 * Creates a default error message for react-hook-form validation rules
 */
const createDefaultMessage = (
  label: string,
  rule: string,
  value?: any
): string => {
  switch (rule) {
    case 'required':
      return `${label} is required`;
    case 'min':
      return `${label} must be at least ${value}`;
    case 'max':
      return `${label} must be no more than ${value}`;
    case 'minLength':
      return label && label !== 'Field'
        ? `${label} must be at least ${value} characters`
        : `Must be at least ${value} characters`;
    case 'maxLength':
      return label && label !== 'Field'
        ? `${label} must be no more than ${value} characters`
        : `Must be no more than ${value} characters`;
    default:
      return `${label} is invalid`;
  }
};

/**
 * Enhanced validation rules creator that supports both react-hook-form and zod validations
 * Handles built-in validations from components and merges with custom user rules
 */
export const createValidationRules = (
  builtInValidations: Record<string, (value: any) => true | string>,
  userRules?: ControllerProps['rules'],
  label?: string
): ControllerProps['rules'] => {
  if (!userRules && Object.keys(builtInValidations).length === 0) {
    return {};
  }

  const rules: Record<string, any> = {};

  // Handle user rules first
  if (userRules) {
    // Process validation rules that might need default messages
    Object.entries(userRules).forEach(([key, value]) => {
      if (key === 'validate') {
        // Handle validate functions separately
        return;
      }

      // Convert simple validation rules to objects with messages
      if (
        key === 'required' ||
        key === 'minLength' ||
        key === 'maxLength' ||
        key === 'min' ||
        key === 'max'
      ) {
        if (
          typeof value === 'boolean' &&
          value === true &&
          key === 'required'
        ) {
          // Convert required: true to required: "Label is required" only if label is provided
          rules[key] = label ? createDefaultMessage(label, key) : true;
        } else if (typeof value === 'number' && key !== 'required') {
          // Convert numeric rules like minLength: 5 to { value: 5, message: "..." }
          rules[key] = {
            value,
            message: createDefaultMessage(label || 'Field', key, value),
          };
        } else {
          // Keep custom messages and complex rules as-is
          rules[key] = value;
        }
      } else {
        // Pass through other rules unchanged
        rules[key] = value;
      }
    });
  }

  // Handle validate functions - merge built-in validations with user validations
  if (userRules?.validate) {
    if (typeof userRules.validate === 'function') {
      rules.validate = {
        ...builtInValidations,
        custom: userRules.validate,
      };
    } else if (typeof userRules.validate === 'object') {
      rules.validate = {
        ...builtInValidations,
        ...userRules.validate,
      };
    }
  } else {
    // Always set validate, even if empty
    rules.validate = builtInValidations;
  }

  return rules as ControllerProps['rules'];
};

/**
 * Common zod schemas for different field types
 * These provide a zod-first approach to validation using Zod v3 syntax
 */
export const commonSchemas = {
  /**
   * Required text field that doesn't allow whitespace-only input
   */
  requiredText: (label: string) =>
    z
      .string()
      .min(1, `${label} is required`)
      .transform((s) => s.trim()),

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

/**
 * Common validation functions for react-hook-form
 * These are simple validation functions that return true for valid values or error messages for invalid ones
 */
export const commonValidations = {
  notEmpty: (label: string) => (value: any) => {
    if (!value || value === '') {
      return `${label} is required`;
    }
    return true;
  },

  atLeastOneSelected: (label: string) => (value: any) => {
    if (!value || !Array.isArray(value) || value.length === 0) {
      return `At least one ${label.toLowerCase()} must be selected`;
    }
    return true;
  },

  mustBeEnabled: (label: string) => (value: any) => {
    if (value !== true) {
      return `${label} must be enabled`;
    }
    return true;
  },

  hasRating: (label: string) => (value: any) => {
    if (!value || value === 0) {
      return `${label} is required`;
    }
    return true;
  },
};
