import { z } from 'zod';

// Definimos un esquema simulando un payload que llegaría a una API
export const apiPayloadSchema = z.object({
  // Transformaciones: Zod limpiará los espacios extra y forzará minúsculas antes de validar
  correoUniversitario: z.string()
    .trim()
    .toLowerCase()
    .email('Formato de correo inválido')
    .refine((email) => email.endsWith('@uce.edu.ec'), {
      message: 'Solo se permiten correos institucionales de la universidad',
    }),
    
  // Coerción y validación estricta
  semestreActual: z.number({ invalid_type_error: 'El semestre debe ser numérico' })
    .int('Debe ser un número entero')
    .min(1, 'El semestre mínimo es 1')
    .max(10, 'El semestre máximo es 10'),

  // Valores opcionales y por defecto
  rolEnProyecto: z.enum(['Frontend', 'Backend', 'DevOps', 'QA']).optional().default('Frontend'),
});

// Extraemos el DTO para el autocompletado en TypeScript
export type ApiPayloadDTO = z.infer<typeof apiPayloadSchema>;