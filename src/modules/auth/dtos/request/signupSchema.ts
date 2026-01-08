import { z } from 'zod';
import { ROLE } from '@/generated/enums';

export const SignupSchema = z.object({
  firstName: z.string('First name is required').min(1),
  middleName: z.string('Middle name must be string').nullable().optional(),
  lastName: z.string('Last name is required').min(1),
  email: z.string('Email is required').email('Email is invalid'),
  password: z
    .string('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  role: z.enum(ROLE, 'Role is required').default(ROLE.USER),
});
