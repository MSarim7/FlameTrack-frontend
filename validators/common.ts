import { z } from 'zod';

// Common validation schemas that can be reused across different forms

export const requiredStringSchema = (fieldName: string) =>
  z.string().min(1, `${fieldName} is required`);

export const optionalStringSchema = () =>
  z.string().optional();

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number');

export const positiveNumberSchema = (fieldName: string) =>
  z
    .number({ required_error: `${fieldName} is required` })
    .positive(`${fieldName} must be greater than 0`);

export const nonNegativeNumberSchema = (fieldName: string) =>
  z
    .number({ required_error: `${fieldName} is required` })
    .min(0, `${fieldName} must be 0 or greater`);

export const dateSchema = (fieldName: string) =>
  z
    .string()
    .min(1, `${fieldName} is required`)
    .refine((date) => !isNaN(Date.parse(date)), {
      message: `Please enter a valid ${fieldName.toLowerCase()}`,
    });

export const futureDateSchema = (fieldName: string) =>
  z
    .string()
    .min(1, `${fieldName} is required`)
    .refine((date) => {
      const inputDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate >= today;
    }, {
      message: `${fieldName} must be today or in the future`,
    });

export const pastOrPresentDateSchema = (fieldName: string) =>
  z
    .string()
    .min(1, `${fieldName} is required`)
    .refine((date) => {
      const inputDate = new Date(date);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      return inputDate <= today;
    }, {
      message: `${fieldName} cannot be in the future`,
    });
