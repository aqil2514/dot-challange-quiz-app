import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .max(20, "Username maksimal 20 karakter")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh berisi huruf, angka, dan underscore",
    )
    .trim(),

  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .max(32, "Password maksimal 32 karakter")
    .trim(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const defaultValue: LoginSchemaType = {
  password: "",
  username: "",
};
