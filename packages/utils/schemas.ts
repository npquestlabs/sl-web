import { z } from 'zod';
import { UnitType } from '@repo/types';

export const CreateComplexSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  cityName: z
    .string()
    .min(1, 'City is required')
    .max(50, 'City must be less than 50 characters'),
  countryCode: z
    .string()
    .min(1, 'Country is required')
    .max(50, 'Country must be less than 50 characters'),
  street: z
    .string()
    .min(1, 'Street is required')
    .max(100, 'Street must be less than 100 characters')
    .optional(),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(100, 'Address must be less than 100 characters')
    .optional(),
  notes: z
    .string()
    .min(1, 'Notes are required')
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
})


export const CreateUnitSchema = z.object({
  type: z.enum(UnitType),
  label: z.string().optional().default(''),
  description: z.string().optional(),
  notes: z.string().optional(),
  rentAmount: z.number().optional(),
  rentCurrency: z.string().optional(),
  rentAdvance: z.number().optional(),
  rentDuration: z.number().optional(),
})