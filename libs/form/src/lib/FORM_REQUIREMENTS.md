# Form Requirements

## Development

### Running Tests
```bash
nx test form
```

## Functional Requirements

### Core Functionality
- [x] Use react-hook-form Controller
- [x] Use react-hook-form rules for validation (required, min, max, etc.)
- [ ] Support custom zod validation functions
- [ ] All inputs must be wrapped in a form with FormProvider
- [x] Prevent whitespace-only input (built into component - no user configuration needed)
- [ ] Use zod for schema validation
- [ ] Support controlled and uncontrolled components

### Input Configuration
- [x] Required `name` prop for form field identification
- [x] Required `label` prop for accessibility and display
- [x] Support `hideLabel` prop to hide visual label while maintaining accessibility
- [x] Automatically use `label` as `aria-label` when label is hidden
- [x] Support `placeholder` prop
- [x] Support `helperText` prop for additional guidance
- [x] Support `required` visual indicator
- [ ] Support input variants (standard, outlined, filled)

### Testing & Identification Requirements
- [ ] Support `data-testid` prop for input element identification in tests
- [ ] Auto-generate data test IDs based on `name` prop when `data-testid` not provided
  - Input: `data-testid="${name}-input"`
  - Label: `data-testid="${name}-label"` 
  - Helper text: `data-testid="${name}-helper-text"`
  - Error text: `data-testid="${name}-error-text"`
- [ ] Allow custom `data-testid` override for all elements
- [ ] Support additional custom data attributes via `dataAttributes` prop
- [ ] Support custom `id` prop for input element with fallback to `name` prop
- [ ] Generate element IDs based on base ID (custom `id` or `name`):
  - Input: `id="${id || name}"`
  - Label: `id="${id || name}-label"`
  - Helper text: `id="${id || name}-helper-text"`
  - Error text: `id="${id || name}-error-text"`

**Note**: MUI handles accessibility IDs automatically, but `data-testid` attributes for testing must be implemented manually. Custom `id` props should work alongside MUI's accessibility features without breaking aria relationships.

### Validation & Error Handling
- [x] Display validation errors from react-hook-form
- [ ] Support field-level validation rules
- [ ] Support cross-field validation
- [ ] Support async validation
- [ ] Clear validation errors on field focus/change
- [ ] Support custom error messages
- [ ] Prevent form submission when validation fails

## Accessibility Requirements

### MUI Automatic Accessibility Features ✅
The following accessibility features are **automatically handled by MUI** and don't need manual implementation:

- **FormControl** automatically:
  - Provides error state context to all child components
  - Manages form field state (focused, filled, error, required)
  - Applies error styling to InputLabel, Input, and FormHelperText

- **InputLabel** automatically:
  - Creates proper `id` for `aria-labelledby` relationship with Input
  - Associates with Input via `htmlFor` prop
  - Shows required indicator (`*`) when `required={true}`
  - Inherits error state styling from FormControl

- **Input** automatically:
  - Gets `aria-invalid` attribute from FormControl error state
  - Gets `aria-labelledby` pointing to InputLabel id
  - Gets `aria-describedby` pointing to FormHelperText id(s)

- **FormHelperText** automatically:
  - Creates unique `id` for `aria-describedby` relationship
  - Inherits error state styling from FormControl
  - Changes color based on error state

**Note**: MUI handles accessibility IDs automatically, but `data-testid` attributes for testing must be implemented manually.

### Manual Accessibility Implementation Required
- [x] Use `aria-label` when visual label is hidden (`hideLabel={true}`)
- [ ] Support `aria-autocomplete` for autocomplete inputs
- [ ] Support `aria-expanded` for dropdown/combobox inputs

### Keyboard Navigation
- [x] Standard Tab navigation (handled by browser + MUI)
- [x] Enter key for form submission (handled by browser)
- [x] Visible focus indicators (handled by MUI theme)
- [ ] Support Escape key to clear field (optional)
- [ ] Maintain logical tab order

### Screen Reader Support
- [x] Announce field labels clearly (handled by MUI)
- [x] Announce validation errors (handled by MUI)
- [x] Announce field requirements (handled by MUI)
- [ ] Support high contrast mode
- [ ] Respect prefers-reduced-motion

## Component Interface

```typescript
interface ConnectedTextInputProps extends Omit<InputProps, 'name' | 'defaultValue'>, ControllerProps {
  name: string;
  label: string;
  hideLabel?: boolean;
  helperText?: string;
  required?: boolean;
  zodSchema?: z.ZodSchema;
  id?: string;
  'data-testid'?: string;
  dataAttributes?: Record<string, string>;
}
```

## Test Plan

### Unit Tests

#### Rendering Tests
- [x] **should render with label**: Verify input renders with visible label
- [x] **should render without label when hideLabel is true**: Verify label is visually hidden but accessible
- [ ] **should render with aria-label when label is hidden**: Verify aria-label is applied correctly
- [x] **should render with helper text**: Verify helper text appears and is associated with input
- [x] **should render with placeholder**: Verify placeholder text appears
- [x] **should render required indicator**: Verify required field indication
- [ ] **should render with different variants**: Test standard, outlined, filled variants
- [ ] **should have auto-generated data test IDs**: Verify input, label, helper text have correct data-testid based on name prop
- [ ] **should use custom data-testid when provided**: Verify custom data-testid overrides auto-generated ones
- [ ] **should apply custom data attributes**: Verify dataAttributes prop adds custom data-* attributes
- [ ] **should use name as default ID**: Verify elements use name prop as base for IDs when no custom id provided
- [ ] **should use custom ID when provided**: Verify custom id prop overrides name-based IDs
- [ ] **should maintain MUI accessibility relationships**: Verify custom IDs don't break MUI's aria-labelledby/describedby relationships

#### Form Integration Tests
- [x] **should work inside FormProvider**: Verify component works with react-hook-form context
- [x] **should register with form control**: Verify field registers with form state
- [x] **should update form value on change**: Verify value changes update form state
- [ ] **should reset with form reset**: Verify field resets when form resets

#### Validation Tests
- [x] **should show required field error**: Test required validation
- [x] **should show min/max length errors**: Test length validation
- [x] **should show custom validation errors**: Test custom rules
- [ ] **should show zod validation errors**: Test zod schema validation
- [x] **should prevent whitespace-only input**: Test built-in trim validation (no explicit rules needed)
- [x] **should clear errors on valid input**: Test error clearing
- [ ] **should not submit form with validation errors**: Test form submission prevention

#### Accessibility Tests
- [ ] **should have accessible name**: Test aria-label or aria-labelledby
- [ ] **should have accessible description**: Test aria-describedby for helper text
- [x] **should indicate validation state**: Test aria-invalid attribute
- [ ] **should indicate required state**: Test aria-required attribute
- [x] **should be keyboard navigable**: Test tab navigation
- [ ] **should have visible focus indicator**: Test focus styles
- [ ] **should work with screen readers**: Test with testing-library screen reader assertions

#### Error Handling Tests
- [ ] **should handle network validation errors**: Test async validation failures
- [ ] **should handle malformed validation rules**: Test invalid rule handling
- [x] **should handle missing FormProvider**: Test error boundaries
- [ ] **should handle missing name prop**: Test required prop validation

### Integration Tests

#### Form Workflow Tests
- [ ] **should complete full form submission**: Test end-to-end form flow
- [ ] **should handle form validation on submit**: Test submission validation
- [ ] **should preserve values on re-render**: Test value persistence
- [ ] **should handle conditional fields**: Test dynamic form fields

#### Browser Compatibility Tests
- [ ] **should work in all supported browsers**: Test cross-browser compatibility
- [ ] **should work with assistive technologies**: Test with screen readers
- [ ] **should respect user preferences**: Test high contrast, reduced motion

### Performance Tests
- [ ] **should not cause unnecessary re-renders**: Test render optimization
- [ ] **should handle large forms efficiently**: Test with many fields
- [ ] **should debounce validation**: Test validation performance

### Storybook Stories

#### Basic Usage
- [ ] **Default**: Basic input with label
- [ ] **Required**: Required field with indicator
- [ ] **With Helper Text**: Input with guidance text
- [ ] **With Placeholder**: Input with placeholder text

#### Accessibility Variants
- [ ] **Hidden Label**: Input with aria-label instead of visible label
- [ ] **Error State**: Input with validation error
- [ ] **Disabled State**: Disabled input

#### Validation Examples
- [ ] **Required Validation**: Shows required field validation
- [ ] **Length Validation**: Shows min/max length validation
- [ ] **Custom Validation**: Shows custom zod validation
- [ ] **Real-time Validation**: Shows validation as user types

#### Visual Variants
- [ ] **All MUI Variants**: Standard, outlined, filled
- [ ] **Different Sizes**: Small, medium, large
- [ ] **Dark Mode**: All variants in dark theme
