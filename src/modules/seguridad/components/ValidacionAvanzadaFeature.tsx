import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registroSeguridadSchema, type RegistroSeguridadDTO } from '../schemas/registroSchema';

export default function ValidacionAvanzadaFeature() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid, isDirty },
    } = useForm<RegistroSeguridadDTO>({
        resolver: zodResolver(registroSeguridadSchema),
        mode: 'onChange', // Evalúa en tiempo real al teclear (ideal para ver si las contraseñas coinciden al instante)
        defaultValues: { traeMascota: false }
    });

    // Usamos watch de RHF de forma aislada solo para mostrar/ocultar el input condicional
    const traeMascota = watch('traeMascota');

    const manejarEnvio = (datos: RegistroSeguridadDTO) => {
        // Si llega aquí, los datos pasaron TODAS las validaciones cruzadas y condicionales
        alert(JSON.stringify(datos, null, 2));
    };

    return (
        <div style={{ maxWidth: '450px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
            <h2>Validaciones Cruzadas y Condicionales</h2>

            <form onSubmit={handleSubmit(manejarEnvio)} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                {/* Campo Correo */}
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold' }}>Correo Electrónico:</label>
                    <input
                        {...register('correo')}
                        style={{ width: '100%', padding: '8px', border: errors.correo ? '2px solid red' : '1px solid #ccc' }}
                    />
                    {errors.correo && <span style={{ color: 'red', fontSize: '14px' }}>{errors.correo.message}</span>}
                </div>

                {/* Campos de Contraseña (Validación Cruzada) */}
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '8px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Contraseña:</label>
                        <input
                            type="password"
                            {...register('password')}
                            style={{ width: '100%', padding: '8px' }}
                        />
                        {errors.password && <span style={{ color: 'red', fontSize: '14px' }}>{errors.password.message}</span>}
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Confirmar Contraseña:</label>
                        <input
                            type="password"
                            {...register('confirmarPassword')}
                            style={{ width: '100%', padding: '8px' }}
                        />
                        {errors.confirmarPassword && <span style={{ color: 'red', fontSize: '14px', fontWeight: 'bold' }}>{errors.confirmarPassword.message}</span>}
                    </div>
                </div>

                {/* Campos Condicionales */}
                <div style={{ padding: '15px', border: '1px solid #17a2b8', borderRadius: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                        <input type="checkbox" {...register('traeMascota')} />
                        ¿Tienes alguna mascota?
                    </label>

                    {traeMascota && (
                        <div style={{ marginTop: '15px' }}>
                            <label style={{ display: 'block' }}>¿Qué tipo de mascota es? (Requerido ahora)</label>
                            <input
                                {...register('tipoMascota')}
                                placeholder="Ej. Gato, Perro, Iguana..."
                                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            />
                            {errors.tipoMascota && <span style={{ color: 'red', fontSize: '14px' }}>{errors.tipoMascota.message}</span>}
                        </div>
                    )}
                </div>

                {/* Botón Inteligente: Se deshabilita si el formulario no es válido o no ha sido modificado */}
                <button
                    type="submit"
                    disabled={!isDirty || !isValid}
                    style={{
                        padding: '12px',
                        backgroundColor: (!isDirty || !isValid) ? '#ccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: (!isDirty || !isValid) ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Validar y Enviar
                </button>

            </form>
        </div>
    );
}