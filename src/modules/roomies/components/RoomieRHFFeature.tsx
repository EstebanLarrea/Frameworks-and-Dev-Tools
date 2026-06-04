import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roomieRegistrationSchema, type RoomieRegistrationDTO } from '../schemas/roomieSchema';
import { submitRoomieProfile } from '../services/roomieService';

export default function RoomieRHFFeature() {
    // 1. Inicialización del motor de RHF
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RoomieRegistrationDTO>({
        resolver: zodResolver(roomieRegistrationSchema),
        defaultValues: {
            datosPersonales: { nombreCompleto: '' },
            habitos: [''], // Iniciamos con un input vacío para el primer hábito
        },
    });

    // 2. Controlador de Arrays Dinámicos
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'habitos',
    });

    // 3. Manejador de Envío
    const manejarEnvio = async (datos: RoomieRegistrationDTO) => {
        try {
            await submitRoomieProfile(datos);
            alert('¡Perfil de Roomie guardado exitosamente!');
            reset(); // Limpiamos el formulario tras un envío exitoso
        } catch (error) {
            console.error('Error al guardar el perfil', error);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
            <h2>Registro de Roomie (Arquitectura RHF + Zod)</h2>

            <form onSubmit={handleSubmit(manejarEnvio)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* BLOQUE 1: Objetos Anidados */}
                <fieldset style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}>
                    <legend style={{ fontWeight: 'bold', padding: '0 5px' }}>Datos Personales</legend>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Nombre Completo:</label>
                        <input
                            {...register('datosPersonales.nombreCompleto')}
                            style={{ width: '100%', padding: '0.5rem' }}
                            placeholder="Ej. Ricardo"
                        />
                        {errors.datosPersonales?.nombreCompleto && (
                            <span style={{ color: '#d32f2f', fontSize: '0.875rem' }}>{errors.datosPersonales.nombreCompleto.message}</span>
                        )}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Edad:</label>
                        <input
                            type="number"
                            {...register('datosPersonales.edad', { valueAsNumber: true })}
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                        {errors.datosPersonales?.edad && (
                            <span style={{ color: '#d32f2f', fontSize: '0.875rem' }}>{errors.datosPersonales.edad.message}</span>
                        )}
                    </div>
                </fieldset>

                {/* BLOQUE 2: Valores Simples */}
                <fieldset style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}>
                    <legend style={{ fontWeight: 'bold', padding: '0 5px' }}>Finanzas</legend>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Presupuesto Mensual ($):</label>
                    <input
                        type="number"
                        {...register('presupuestoMensual', { valueAsNumber: true })}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                    {errors.presupuestoMensual && (
                        <span style={{ color: '#d32f2f', fontSize: '0.875rem' }}>{errors.presupuestoMensual.message}</span>
                    )}
                </fieldset>

                {/* BLOQUE 3: Matrices Dinámicas (Arrays) */}
                <fieldset style={{ padding: '1rem', borderRadius: '8px', border: '1px solid #ccc' }}>
                    <legend style={{ fontWeight: 'bold', padding: '0 5px' }}>Hábitos de Convivencia</legend>

                    {fields.map((field, index) => (
                        <div key={field.id} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <div style={{ flex: 1 }}>
                                <input
                                    {...register(`habitos.${index}` as const)}
                                    style={{ width: '100%', padding: '0.5rem' }}
                                    placeholder="Ej. Ordenado, No fuma..."
                                />
                                {errors.habitos?.[index] && (
                                    <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'block' }}>
                                        {errors.habitos[index]?.message}
                                    </span>
                                )}
                            </div>

                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    style={{ padding: '0.5rem 1rem', backgroundColor: '#ffebee', color: '#d32f2f', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    X
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => append('')}
                        style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', backgroundColor: '#e3f2fd', color: '#1976d2', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        + Añadir Hábito
                    </button>
                    {errors.habitos?.root && (
                        <span style={{ color: '#d32f2f', fontSize: '0.875rem', display: 'block', marginTop: '0.5rem' }}>{errors.habitos.root.message}</span>
                    )}
                </fieldset>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        padding: '1rem',
                        backgroundColor: isSubmitting ? '#9e9e9e' : '#2e7d32',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isSubmitting ? 'Procesando Perfil...' : 'Completar Registro'}
                </button>
            </form>
        </div>
    );
}