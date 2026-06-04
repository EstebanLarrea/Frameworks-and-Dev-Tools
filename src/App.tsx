import { useFormik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const roomieSchema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  presupuesto: z.number({ invalid_type_error: 'Debe ser un número' }).min(150, 'El presupuesto mínimo es $150'),
});

type RoomieFormValues = z.infer<typeof roomieSchema>;

export default function App() {
  const formik = useFormik<RoomieFormValues>({
    initialValues: { nombre: '', presupuesto: 0 },
    validationSchema: toFormikValidationSchema(roomieSchema),
    onSubmit: (values) => {
      console.log('Formik - Datos listos:', values);
    },
  });

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h2>Módulo de Registro (Formik)</h2>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '300px' }}>

        <div>
          <label>Nombre:</label>
          <input
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {formik.touched.nombre && formik.errors.nombre && <div style={{ color: 'red' }}>{formik.errors.nombre}</div>}
        </div>

        <div>
          <label>Presupuesto ($):</label>
          <input
            name="presupuesto"
            type="number"
            value={formik.values.presupuesto}
            onChange={formik.handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
          {formik.touched.presupuesto && formik.errors.presupuesto && <div style={{ color: 'red' }}>{formik.errors.presupuesto}</div>}
        </div>

        <button type="submit" style={{ padding: '10px', background: '#333', color: '#fff' }}>Guardar</button>
      </form>
    </div>
  );
}