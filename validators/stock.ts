import { z } from 'zod';
import { 
  requiredStringSchema, 
  optionalStringSchema, 
  positiveNumberSchema, 
  dateSchema, 
  pastOrPresentDateSchema 
} from './common';

// Stock item categories
export const STOCK_CATEGORIES = [
  'Meat',
  'Buns', 
  'Vegetables',
  'Beverages',
  'Condiments',
  'Others'
] as const;

// Unit types
export const UNIT_TYPES = [
  'kg',
  'litre', 
  'pcs',
  'box',
  'packet'
] as const;

// Shop names
export const SHOP_NAMES = [
  'Flaming Bun',
  'Flaming Dough'
] as const;

// Stock form validation schema
export const stockFormSchema = z.object({
  itemName: requiredStringSchema('Item name')
    .min(2, 'Item name must be at least 2 characters')
    .max(100, 'Item name must be less than 100 characters')
    .regex(/^[a-zA-Z0-9\s\-&.,()]+$/, 'Item name contains invalid characters'),

  category: z.enum(STOCK_CATEGORIES, {
    required_error: 'Category is required',
    invalid_type_error: 'Please select a valid category'
  }),

  description: optionalStringSchema()
    .refine((val) => !val || val.length <= 500, {
      message: 'Description must be less than 500 characters'
    }),

  unitType: z.enum(UNIT_TYPES, {
    required_error: 'Unit type is required',
    invalid_type_error: 'Please select a valid unit type'
  }),

  quantity: z
    .string()
    .min(1, 'Quantity is required')
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, {
      message: 'Quantity must be a positive number'
    })
    .refine((val) => {
      const num = parseFloat(val);
      return num <= 999999;
    }, {
      message: 'Quantity cannot exceed 999,999'
    }),

  costPrice: z
    .string()
    .min(1, 'Cost price is required')
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, {
      message: 'Cost price must be a positive number'
    })
    .refine((val) => {
      const num = parseFloat(val);
      return num <= 999999.99;
    }, {
      message: 'Cost price cannot exceed ₨999,999.99'
    }),

  sellingPrice: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional field
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, {
      message: 'Selling price must be a non-negative number'
    })
    .refine((val) => {
      if (!val) return true; // Optional field
      const num = parseFloat(val);
      return num <= 999999.99;
    }, {
      message: 'Selling price cannot exceed ₨999,999.99'
    }),

  shop: z.enum(SHOP_NAMES, {
    required_error: 'Shop is required',
    invalid_type_error: 'Please select a valid shop'
  }),

  supplier: optionalStringSchema()
    .refine((val) => !val || val.length >= 2, {
      message: 'Supplier name must be at least 2 characters'
    })
    .refine((val) => !val || val.length <= 100, {
      message: 'Supplier name must be less than 100 characters'
    }),

  purchaseDate: pastOrPresentDateSchema('Purchase date'),

  expiryDate: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional field
      return !isNaN(Date.parse(val));
    }, {
      message: 'Please enter a valid expiry date'
    }),

  notes: optionalStringSchema()
    .refine((val) => !val || val.length <= 1000, {
      message: 'Notes must be less than 1000 characters'
    })
});

// Type inference for the form data
export type StockFormData = z.infer<typeof stockFormSchema>;

// Validation helper function
export const validateStockForm = (data: unknown) => {
  try {
    return {
      success: true,
      data: stockFormSchema.parse(data),
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
export const validateItemName = (value: string) => {
  try {
    stockFormSchema.shape.itemName.parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid item name' };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

export const validateQuantity = (value: string) => {
  try {
    stockFormSchema.shape.quantity.parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid quantity' };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

export const validateCostPrice = (value: string) => {
  try {
    stockFormSchema.shape.costPrice.parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid cost price' };
    }
    return { isValid: false, error: 'Validation error' };
  }
};

export const validateSellingPrice = (value: string, costPrice?: string) => {
  try {
    // Create a temporary object with both values for cross-field validation
    const tempData = { sellingPrice: value, costPrice: costPrice || '0' };
    stockFormSchema.partial().parse(tempData);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message || 'Invalid selling price' };
    }
    return { isValid: false, error: 'Validation error' };
  }
};
