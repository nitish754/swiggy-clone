import { z } from 'zod';
import { UserRole } from '../responseType';

export const SignupSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().nullable().optional(),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: UserRole,
});

export type SingupRequestDTO = z.infer<typeof SignupSchema>;
