import { z } from 'zod';

// Schema para Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es requerido")
    .email("Correo electrónico inválido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
});

// Schema para Register
export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "El nombre de usuario es requerido")
    .min(3, "Debe tener al menos 3 caracteres")
    .max(20, "No debe exceder 20 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guiones bajos"),
  email: z
    .string()
    .min(1, "El correo es requerido")
    .email("Correo electrónico inválido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  confirmPassword: z
    .string()
    .min(1, "Debes confirmar tu contraseña")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

// Tipos inferidos automáticamente
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;