import { z } from 'zod';

export const registroSeguridadSchema = z.object({
  correo: z.string().email('Debe ser un correo válido'),
  
  // Expresión regular para obligar a usar contraseñas fuertes
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
    
  confirmarPassword: z.string(),

  // Booleano condicional
  traeMascota: z.boolean().default(false),
  
  // Campo que será obligatorio SOLO si traeMascota es true
  tipoMascota: z.string().optional(),

}).refine((datos) => datos.password === datos.confirmarPassword, {
  // Validación Cruzada: Comparamos dos campos
  message: 'Las contraseñas no coinciden',
  path: ['confirmarPassword'], // ¡Clave! Esto le dice a RHF dónde mostrar el error
})
.refine((datos) => {
  // Validación Condicional: Si trae mascota, debe especificar cuál
  if (datos.traeMascota && (!datos.tipoMascota || datos.tipoMascota.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: 'Por favor, especifica qué mascota tienes',
  path: ['tipoMascota'],
});

export type RegistroSeguridadDTO = z.infer<typeof registroSeguridadSchema>;