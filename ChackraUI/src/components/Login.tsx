import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Center,
  useToast,
} from '@chakra-ui/react';

export default function LoginChakra() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Hook de Chakra UI para mostrar notificaciones flotantes
  const toast = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulamos el tiempo de espera de la API (1.5 segundos)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate Validation
      if (email === 'admin@ejemplo.com' && password.length > 0) {
        toast({
          title: '¡Acceso concedido!',
          description: 'Token: fake_jwt_token_98765',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: 'Error de autenticación',
          description: 'Usuario o contraseña incorrectos.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      toast({
        title: 'Error de red',
        description: 'Verifica tu conexión.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Center es un componente de Chakra para centrar contenido fácilmente
    <Center minH="100vh" bg="gray.50" p={4}>
      {/* Box es como un <div> pero con superpoderes de Chakra */}
      <Box w="full" maxW="md" bg="white" p={8} borderRadius="2xl" boxShadow="xl" borderWidth="1px" borderColor="gray.100">
        
        <Box mb={8} textAlign="center">
          <Heading as="h2" size="xl" color="gray.900" mb={2}>
            Bienvenido
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Ingresa a tu cuenta para usar Chakra UI
          </Text>
        </Box>

        <form onSubmit={handleLogin}>
          {/* VStack apila los elementos verticalmente y les da un espaciado uniforme */}
          <VStack spacing={6}>
            
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                Correo Electrónico
              </FormLabel>
              <Input
                type="email"
                placeholder="admin@ejemplo.com"
                size="lg"
                focusBorderColor="blue.500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                Contraseña
              </FormLabel>
              <Input
                type="password"
                placeholder="••••••••"
                size="lg"
                focusBorderColor="blue.500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              w="full"
              isLoading={loading}
              loadingText="Procesando..."
            >
              Iniciar Sesión
            </Button>

          </VStack>
        </form>
      </Box>
    </Center>
  );
}