import { z } from 'zod';

export const roomieRegistrationSchema = z.object({
  datosPersonales: z.object({
    nombreCompleto: z.string().min(3, 'Mínimo 3 caracteres'),
    edad: z.number({ invalid_type_error: 'Requerido' }).min(18, 'Debe ser mayor de edad'),
  }),
  presupuestoMensual: z.number().min(150, 'Mínimo $150'),
  habitos: z.array(z.string()).min(1, 'Agrega al menos un hábito (ej. Fumar, Madrugar)'),
});

// Inferimos el tipo para TypeScript automáticamente
export type RoomieRegistrationDTO = z.infer<typeof roomieRegistrationSchema>;