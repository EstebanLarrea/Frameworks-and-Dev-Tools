import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';

export default function LoginMui() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      // Simulamos el tiempo de espera de la API (1.5 segundos)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validación simulada
      if (email === 'admin@example.com' && password.length > 0) {
        setFeedback({ type: 'success', text: '¡Acceso concedido! Token: fake_jwt_token_98765' });
      } else {
        setFeedback({ type: 'error', text: 'Usuario o contraseña incorrectos.' });
      }
    } catch (error) {
      setFeedback({ type: 'error', text: 'Error de red. Verifica tu conexión.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Container ayuda a centrar y limitar el ancho máximo en la pantalla
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      {/* Paper le da ese efecto de tarjeta con sombra (elevation) */}
      <Paper elevation={4} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
        
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
            Bienvenido
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ingresa a tu cuenta para usar Material UI
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          <TextField
            label="Correo Electrónico"
            type="email"
            placeholder="admin@example.com"
            required
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            required
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {feedback && (
            <Alert severity={feedback.type} sx={{ borderRadius: 2 }}>
              {feedback.text}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{ py: 1.5, mt: 1, textTransform: 'none', fontSize: '1.1rem' }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Iniciar Sesión'}
          </Button>

        </Box>
      </Paper>
    </Container>
  );
}