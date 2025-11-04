import { email, z } from 'zod';

export const UserSchema = z.object({
  nome: z.string().min(2, "Username must have more then 3 characters"),
  email: z.email(),
  senha: z.number()
}) 