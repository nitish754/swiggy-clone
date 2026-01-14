import z from 'zod';

export const RefreshTokenSchema = z.object({
  refreshToken: z.string('Refresh token is required').min(1),
});
