import { z } from "zod";

export const forgotPasswordSchema = z.compile(
  z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
  })
);

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
