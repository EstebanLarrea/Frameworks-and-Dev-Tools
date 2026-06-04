import { z } from 'zod';

export const roomieRegistrationSchema = z.object({
  datosPersonales: z.object({
    nombreCompleto: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    edad: z.number({ invalid_type_error: 'La edad es requerida' }).min(18, 'Debe ser mayor de 18 años'),
  }),
  presupuestoMensual: z.number({ invalid_type_error: 'Ingresa un monto válido' }).min(150, 'El presupuesto mínimo es $150'),
  habitos: z.array(z.string().min(2, 'El hábito no puede estar vacío')).min(1, 'Agrega al menos un hábito para la convivencia'),
});

// Inferimos el DTO (Data Transfer Object) para usarlo en el frontend y en la firma del servicio
export type RoomieRegistrationDTO = z.infer<typeof roomieRegistrationSchema>;