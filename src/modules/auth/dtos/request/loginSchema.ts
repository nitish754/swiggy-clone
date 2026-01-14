import { DEVICE } from '@/generated/enums';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string('Email is required').email('Invalid email'),
  password: z
    .string('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  isRemember: z.boolean().default(true),
  device: z.enum(DEVICE),
});
