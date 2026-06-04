import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { roomieRegistrationSchema, RoomieRegistrationDTO } from '../schemas/roomieSchema';
import { submitRoomieProfile } from '../services/roomieService';

export default function RoomieFormikFeature() {
    const valoresIniciales: RoomieRegistrationDTO = {
        datosPersonales: { nombreCompleto: '', edad: 0 },
        presupuestoMensual: 0,
        habitos: [''], // Inicializamos con un input vacío
    };

    const manejarEnvio = async (valores: RoomieRegistrationDTO, { setSubmitting }: any) => {
        await submitRoomieProfile(valores);
        setSubmitting(false);
        alert('¡Perfil Guardado con Formik!');
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h2>Registro de Perfil (Controlado)</h2>
            <Formik
                initialValues={valoresIniciales}
                validationSchema={toFormikValidationSchema(roomieRegistrationSchema)}
                onSubmit={manejarEnvio}
            >
                {({ isSubmitting, values }) => (
                    <Form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* Objetos Anidados */}
                        <fieldset>
                            <legend>Datos Personales</legend>
                            <div>
                                <label>Nombre:</label>
                                <Field name="datosPersonales.nombreCompleto" style={{ width: '100%' }} />
                                <ErrorMessage name="datosPersonales.nombreCompleto" component="div" className="error" style={{ color: 'red' }} />
                            </div>
                            <div>
                                <label>Edad:</label>
                                <Field name="datosPersonales.edad" type="number" style={{ width: '100%' }} />
                                <ErrorMessage name="datosPersonales.edad" component="div" className="error" style={{ color: 'red' }} />
                            </div>
                        </fieldset>

                        {/* Arrays Dinámicos (FieldArray) */}
                        <fieldset>
                            <legend>Hábitos de Convivencia</legend>
                            <FieldArray name="habitos">
                                {({ push, remove }) => (
                                    <div>
                                        {values.habitos.map((_, index) => (
                                            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                                <Field name={`habitos.${index}`} style={{ flex: 1 }} />
                                                {values.habitos.length > 1 && (
                                                    <button type="button" onClick={() => remove(index)}>Quitar</button>
                                                )}
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => push('')}>+ Agregar Hábito</button>
                                    </div>
                                )}
                            </FieldArray>
                            <ErrorMessage name="habitos" component="div" style={{ color: 'red' }} />
                        </fieldset>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Guardando...' : 'Finalizar Registro'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}