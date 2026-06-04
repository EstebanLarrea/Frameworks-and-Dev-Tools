import { RoomieRegistrationDTO } from '../schemas/roomieSchema';

export const submitRoomieProfile = async (payload: RoomieRegistrationDTO): Promise<Response> => {
  console.log('Enviando datos al backend (Node.js)...', payload);
  // Simulación de latencia de red
  return new Promise((resolve) => setTimeout(() => resolve(new Response('OK')), 1000));
};