import { z } from 'zod';
import { 
  requiredStringSchema, 
  optionalStringSchema, 
  emailSchema, 
  phoneSchema, 
  pastOrPresentDateSchema 
} from './common';

// Employer roles
export const EMPLOYER_ROLES = [
  'Cashier',
  'Manager', 
  'Staff'
] as const;

// Shop names
export const SHOP_NAMES = [
  'Flaming Bun',
  'Flaming Dough'
] as const;

// Employer status
export const EMPLOYER_STATUS = [
  'Active',
  'Inactive'
] as const;

// Employer form validation schema
export const employerFormSchema = z.object({
  name: requiredStringSchema('Employee name')
    .min(2, 'Employee name must be at least 2 characters')
    .max(100, 'Employee name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-.,()]+$/, 'Employee name contains invalid characters'),

  email: emailSchema
    .refine((email) => email.length <= 100, {
      message: 'Email must be less than 100 characters'
    }),

  phone: phoneSchema
    .refine((phone) => phone.length >= 10 && phone.length <= 15, {
      message: 'Phone number must be between 10 and 15 characters'
    }),

  shop: z.enum(SHOP_NAMES, {
    required_error: 'Shop is required',
    invalid_type_error: 'Please select a valid shop'
  }),

  role: z.enum(EMPLOYER_ROLES, {
    required_error: 'Role is required',
    invalid_type_error: 'Please select a valid role'
  }),

  dateJoined: pastOrPresentDateSchema('Date joined'),

  status: z.enum(EMPLOYER_STATUS, {
    required_error: 'Status is required',
    invalid_type_error: 'Please select a valid status'
  })
});

// Type inference for the form data
export type EmployerFormData = z.infer<typeof employerFormSchema>;

// Validation helper function
export const validateEmployerForm = (data: unknown) => {
  try {
    return {
      success: true,
      data: employerFormSchema.parse(data),
      errors: null
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.flatten().fieldErrors
      };
    }
    throw error;
  }
};

// Individual field validation helpers
export const validateName = (value: string) => {
  try {
    employerFormSchema.shape.name.parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid name' };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

export const validateEmail = (value: string) => {
  try {
    employerFormSchema.shape.email.parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid email' };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

export const validatePhone = (value: string) => {
  try {
    employerFormSchema.shape.phone.parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid phone number' };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

