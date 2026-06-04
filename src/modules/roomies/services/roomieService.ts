import type { RoomieRegistrationDTO } from '../schemas/roomieSchema';
export const submitRoomieProfile = async (payload: RoomieRegistrationDTO): Promise<void> => {
  console.log('Preparando payload para enviar al servidor Node.js:', payload);
  
  // Simulación de una petición HTTP asíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Respuesta del servidor: 200 OK');
      resolve();
    }, 1200);
  });
};