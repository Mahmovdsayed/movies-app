import { z } from "zod";

export const resetPasswordSchema = z.compile(
  z.object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(64, "Password is too long"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
);

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
