import { useState } from 'react';
import { apiPayloadSchema } from './schemas/roomieApiSchema';

export default function App() {
  const [jsonInput, setJsonInput] = useState('{\n  "correoUniversitario": " RICARDO@uce.edu.ec  ",\n  "semestreActual": 7\n}');
  const [resultado, setResultado] = useState<any>(null);
  const [metodoUsado, setMetodoUsado] = useState<string>('');

  // 1. Evaluación Agresiva: schema.parse()
  // Ideal para el backend cerrado. Si falla, rompe la ejecución (throw).
  const ejecutarParse = () => {
    try {
      const objetoParseado = JSON.parse(jsonInput);
      const datosLimpios = apiPayloadSchema.parse(objetoParseado);

      setMetodoUsado('parse() - ¡Éxito!');
      setResultado(datosLimpios);
    } catch (error: any) {
      setMetodoUsado('parse() - ¡Lanzó una Excepción (Crash)!');
      setResultado(error.errors || error.message);
    }
  };

  // 2. Evaluación Segura: schema.safeParse()
  // Ideal para UI o APIs públicas. Nunca rompe la app, retorna un objeto { success, data/error }.
  const ejecutarSafeParse = () => {
    try {
      const objetoParseado = JSON.parse(jsonInput);
      const evaluacion = apiPayloadSchema.safeParse(objetoParseado);

      if (evaluacion.success) {
        setMetodoUsado('safeParse() - Éxito (success: true)');
        setResultado(evaluacion.data);
      } else {
        setMetodoUsado('safeParse() - Fallo controlado (success: false)');
        // ZodError tiene un método format() muy útil para estructurar los errores
        setResultado(evaluacion.error.format());
      }
    } catch (error: any) {
      setResultado("El JSON ingresado ni siquiera es válido sintácticamente.");
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2563eb' }}>Zod Core Lab: Parse vs SafeParse</h1>

      <div style={{ display: 'flex', gap: '2rem' }}>

        {/* Panel Izquierdo: Entrada de Datos */}
        <div style={{ flex: 1 }}>
          <h3>Payload Entrante (JSON Crudo):</h3>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={10}
            style={{ width: '100%', padding: '1rem', backgroundColor: '#1e293b', color: '#38bdf8', borderRadius: '8px' }}
          />

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              onClick={ejecutarParse}
              style={{ padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ejecutar parse()
            </button>
            <button
              onClick={ejecutarSafeParse}
              style={{ padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Ejecutar safeParse()
            </button>
          </div>
        </div>

        {/* Panel Derecho: Salida y Transformaciones */}
        <div style={{ flex: 1 }}>
          <h3>Resultado del Motor Zod:</h3>
          <div style={{ padding: '0.5rem', backgroundColor: '#e2e8f0', color: '#333', fontWeight: 'bold', borderRadius: '4px', marginBottom: '1rem' }}>
            Método: {metodoUsado}
          </div>
          <pre style={{ backgroundColor: '#f1f5f9', padding: '1rem', borderRadius: '8px', overflowX: 'auto', minHeight: '180px', border: '1px solid #cbd5e1' }}>
            {resultado ? JSON.stringify(resultado, null, 2) : 'Esperando ejecución...'}
          </pre>
        </div>

      </div>
    </div>
  );
}