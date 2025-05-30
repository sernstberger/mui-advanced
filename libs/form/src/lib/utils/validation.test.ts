import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  createZodValidation,
  createValidationRules,
  commonSchemas,
  type InferFormData,
} from './validation';

describe('validation utilities', () => {
  describe('createZodValidation', () => {
    it('should return true for valid values', () => {
      const schema = z.string().min(3);
      const validate = createZodValidation(schema);

      expect(validate('hello')).toBe(true);
      expect(validate('world')).toBe(true);
    });

    it('should return error message for invalid values', () => {
      const schema = z.string().min(3, 'Must be at least 3 characters');
      const validate = createZodValidation(schema);

      expect(validate('hi')).toBe('Must be at least 3 characters');
    });

    it('should return default error message when no custom message provided', () => {
      const schema = z.string().min(3);
      const validate = createZodValidation(schema);

      const result = validate('hi');
      expect(typeof result).toBe('string');
      expect(result).not.toBe(true);
    });

    it('should work with different schema types', () => {
      const numberSchema = z.number().min(0);
      const validateNumber = createZodValidation(numberSchema);

      expect(validateNumber(5)).toBe(true);
      expect(typeof validateNumber(-1)).toBe('string');

      const booleanSchema = z.boolean();
      const validateBoolean = createZodValidation(booleanSchema);

      expect(validateBoolean(true)).toBe(true);
      expect(validateBoolean(false)).toBe(true);
      expect(typeof validateBoolean('not boolean')).toBe('string');
    });

    it('should work with complex schemas', () => {
      const emailSchema = z.string().email('Invalid email format');
      const validateEmail = createZodValidation(emailSchema);

      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('invalid-email')).toBe('Invalid email format');
    });

    it('should handle optional schemas', () => {
      const optionalSchema = z.string().optional();
      const validate = createZodValidation(optionalSchema);

      expect(validate('value')).toBe(true);
      expect(validate(undefined)).toBe(true);
      expect(validate('')).toBe(true);
    });
  });

  describe('InferFormData type helper', () => {
    it('should infer correct types from schema', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number(),
        isActive: z.boolean(),
      });

      type FormData = InferFormData<typeof schema>;

      // Type assertion to verify the inferred type is correct
      const validData: FormData = {
        name: 'John',
        age: 25,
        isActive: true,
      };

      expect(validData).toBeDefined();
    });
  });

  describe('createValidationRules', () => {
    const mockBuiltInValidations = {
      zodValidation: (value: any) =>
        value !== 'invalid' || 'Zod validation failed',
    };

    it('should return only built-in validations when no user rules provided', () => {
      const rules = createValidationRules(mockBuiltInValidations);

      expect(rules).toEqual({
        validate: mockBuiltInValidations,
      });
    });

    it('should handle custom validate functions', () => {
      const customValidate = (value: any) => value !== 'bad' || 'Custom error';
      const rules = createValidationRules(mockBuiltInValidations, {
        validate: customValidate,
      });

      expect(rules?.validate).toEqual({
        ...mockBuiltInValidations,
        custom: customValidate,
      });
    });

    it('should handle validate object', () => {
      const customValidations = {
        isNotBad: (value: any) => value !== 'bad' || 'Is bad',
        isNotWorse: (value: any) => value !== 'worse' || 'Is worse',
      };
      const rules = createValidationRules(mockBuiltInValidations, {
        validate: customValidations,
      });

      expect(rules?.validate).toEqual({
        ...mockBuiltInValidations,
        ...customValidations,
      });
    });

    it('should pass through other rules unchanged', () => {
      const rules = createValidationRules(mockBuiltInValidations, {
        required: true,
        minLength: 5,
        maxLength: 100,
        deps: ['field1', 'field2'],
      });

      expect(rules?.required).toBe(true);
      expect(rules?.minLength).toEqual({
        value: 5,
        message: 'Must be at least 5 characters',
      });
      expect(rules?.maxLength).toEqual({
        value: 100,
        message: 'Must be no more than 100 characters',
      });
      expect((rules as any)?.deps).toEqual(['field1', 'field2']);
    });

    it('should handle empty built-in validations', () => {
      const rules = createValidationRules(
        {},
        {
          required: true,
        }
      );

      expect(rules?.required).toBe(true);
      expect(rules?.validate).toEqual({});
    });

    it('should handle custom validation with no built-in validations', () => {
      const customValidate = (value: any) => value === 'good' || 'Not good';
      const rules = createValidationRules(
        {},
        {
          validate: customValidate,
        }
      );

      expect(rules?.validate).toEqual({
        custom: customValidate,
      });
    });
  });

  describe('commonSchemas', () => {
    describe('requiredText', () => {
      it('should validate required non-empty text', () => {
        const schema = commonSchemas.requiredText('Name');

        expect(schema.safeParse('John').success).toBe(true);
        expect(schema.safeParse('').success).toBe(false);
        expect(schema.safeParse('   ').success).toBe(true); // min(1) passes first (3 chars), then .trim() transforms it
      });

      it('should return correct error message', () => {
        const schema = commonSchemas.requiredText('Email');
        const result = schema.safeParse('');

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Email is required');
        }
      });

      it('should trim whitespace from valid input', () => {
        const schema = commonSchemas.requiredText('Name');
        const result = schema.safeParse('  John  ');

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe('John');
        }
      });

      it('should trim whitespace-only input to empty string (but validation passes)', () => {
        const schema = commonSchemas.requiredText('Name');
        const result = schema.safeParse('   ');

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe(''); // Gets trimmed to empty string
        }
      });
    });

    describe('optionalText', () => {
      it('should allow empty or valid text', () => {
        const schema = commonSchemas.optionalText();

        expect(schema.safeParse('').success).toBe(true);
        expect(schema.safeParse('valid text').success).toBe(true);
        expect(schema.safeParse(undefined).success).toBe(true);
      });

      it('should reject whitespace-only text', () => {
        const schema = commonSchemas.optionalText();

        expect(schema.safeParse('   ').success).toBe(false);
        expect(schema.safeParse('\t\n').success).toBe(false);
      });

      it('should return correct error message for whitespace-only input', () => {
        const schema = commonSchemas.optionalText();
        const result = schema.safeParse('   ');

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            'Cannot be empty or whitespace only'
          );
        }
      });
    });

    describe('requiredCheckbox', () => {
      it('should require true value', () => {
        const schema = commonSchemas.requiredCheckbox('Terms');

        expect(schema.safeParse(true).success).toBe(true);
        expect(schema.safeParse(false).success).toBe(false);
      });

      it('should return correct error message', () => {
        const schema = commonSchemas.requiredCheckbox('Privacy Policy');
        const result = schema.safeParse(false);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            'Privacy Policy must be checked'
          );
        }
      });

      it('should reject non-boolean values', () => {
        const schema = commonSchemas.requiredCheckbox('Terms');

        expect(schema.safeParse('true').success).toBe(false);
        expect(schema.safeParse(1).success).toBe(false);
        expect(schema.safeParse(null).success).toBe(false);
      });
    });

    describe('requiredSelect', () => {
      it('should validate required string or number selection', () => {
        const schema = commonSchemas.requiredSelect('Category');

        expect(schema.safeParse('option1').success).toBe(true);
        expect(schema.safeParse(1).success).toBe(true);
        expect(schema.safeParse(0).success).toBe(true); // 0 is valid for numbers
        expect(schema.safeParse('').success).toBe(false);
        expect(schema.safeParse(-1).success).toBe(false);
      });

      it('should return correct error message', () => {
        const schema = commonSchemas.requiredSelect('Status');
        const result = schema.safeParse('');

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Status is required');
        }
      });
    });

    describe('requiredMultiSelect', () => {
      it('should validate non-empty arrays', () => {
        const schema = commonSchemas.requiredMultiSelect('Tags');

        expect(schema.safeParse(['tag1', 'tag2']).success).toBe(true);
        expect(schema.safeParse([1, 2, 3]).success).toBe(true);
        expect(schema.safeParse([]).success).toBe(false);
      });

      it('should return correct error message', () => {
        const schema = commonSchemas.requiredMultiSelect('Skills');
        const result = schema.safeParse([]);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            'At least one skills must be selected'
          );
        }
      });

      it('should handle single item arrays', () => {
        const schema = commonSchemas.requiredMultiSelect('Categories');

        expect(schema.safeParse(['single']).success).toBe(true);
        expect(schema.safeParse([42]).success).toBe(true);
      });
    });

    describe('requiredRating', () => {
      it('should require rating greater than 0', () => {
        const schema = commonSchemas.requiredRating('Satisfaction');

        expect(schema.safeParse(1).success).toBe(true);
        expect(schema.safeParse(5).success).toBe(true);
        expect(schema.safeParse(0).success).toBe(false);
        expect(schema.safeParse(-1).success).toBe(false);
      });

      it('should return correct error message', () => {
        const schema = commonSchemas.requiredRating('Quality');
        const result = schema.safeParse(0);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Quality is required');
        }
      });

      it('should reject non-numeric values', () => {
        const schema = commonSchemas.requiredRating('Rating');

        expect(schema.safeParse('5').success).toBe(false);
        expect(schema.safeParse(null).success).toBe(false);
        expect(schema.safeParse(undefined).success).toBe(false);
      });
    });

    describe('requiredSlider', () => {
      it('should validate single number >= 0 or non-empty array', () => {
        const schema = commonSchemas.requiredSlider('Volume');

        expect(schema.safeParse(0).success).toBe(true);
        expect(schema.safeParse(50).success).toBe(true);
        expect(schema.safeParse([10, 20]).success).toBe(true);
        expect(schema.safeParse(-1).success).toBe(false);
        expect(schema.safeParse([]).success).toBe(false);
      });

      it('should return correct error message for invalid values', () => {
        const schema = commonSchemas.requiredSlider('Range');

        const numberResult = schema.safeParse(-1);
        expect(numberResult.success).toBe(false);
        if (!numberResult.success) {
          expect(numberResult.error.issues[0].message).toBe(
            'Range is required'
          );
        }

        const arrayResult = schema.safeParse([]);
        expect(arrayResult.success).toBe(false);
        if (!arrayResult.success) {
          expect(arrayResult.error.issues[0].message).toBe('Range is required');
        }
      });

      it('should handle single value arrays', () => {
        const schema = commonSchemas.requiredSlider('Threshold');

        expect(schema.safeParse([25]).success).toBe(true);
        expect(schema.safeParse([0]).success).toBe(true);
      });
    });

    describe('requiredRadio', () => {
      it('should validate required string or number selection', () => {
        const schema = commonSchemas.requiredRadio('Option');

        expect(schema.safeParse('option1').success).toBe(true);
        expect(schema.safeParse(1).success).toBe(true);
        expect(schema.safeParse(0).success).toBe(true); // 0 is valid for numbers
        expect(schema.safeParse('').success).toBe(false);
        expect(schema.safeParse(-1).success).toBe(false);
      });

      it('should return correct error message', () => {
        const schema = commonSchemas.requiredRadio('Choice');
        const result = schema.safeParse('');

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Choice is required');
        }
      });
    });

    describe('requiredSwitch', () => {
      it('should require true value', () => {
        const schema = commonSchemas.requiredSwitch('Notifications');

        expect(schema.safeParse(true).success).toBe(true);
        expect(schema.safeParse(false).success).toBe(false);
      });

      it('should return correct error message', () => {
        const schema = commonSchemas.requiredSwitch('Dark Mode');
        const result = schema.safeParse(false);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            'Dark Mode must be enabled'
          );
        }
      });

      it('should reject non-boolean values', () => {
        const schema = commonSchemas.requiredSwitch('Toggle');

        expect(schema.safeParse('true').success).toBe(false);
        expect(schema.safeParse(1).success).toBe(false);
        expect(schema.safeParse(null).success).toBe(false);
      });
    });

    describe('requiredCheckboxGroup', () => {
      it('should validate non-empty arrays', () => {
        const schema = commonSchemas.requiredCheckboxGroup('Options');

        expect(schema.safeParse(['option1', 'option2']).success).toBe(true);
        expect(schema.safeParse([1, 2, 3]).success).toBe(true);
        expect(schema.safeParse([]).success).toBe(false);
      });

      it('should return correct error message', () => {
        const schema = commonSchemas.requiredCheckboxGroup('Features');
        const result = schema.safeParse([]);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe(
            'At least one features must be selected'
          );
        }
      });

      it('should handle single item arrays', () => {
        const schema = commonSchemas.requiredCheckboxGroup('Preferences');

        expect(schema.safeParse(['single']).success).toBe(true);
        expect(schema.safeParse([42]).success).toBe(true);
      });
    });
  });
});
