/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { toast } from 'sonner';
import { httpService } from '@repo/api/httpService';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();
  //const { refetch } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      const result = await httpService.post('/auth/login', { email, password });
      if (result.error) throw new Error(result.error);

      //await refetch();
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Login failed. Please try again.',
      );
    }
    setLoggingIn(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Typography
        component="h2"
        variant="h5"
        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}
      >
        Login
      </Typography>

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        size="small"
        fullWidth
        required
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loggingIn}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        size="small"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loggingIn}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2, py: 1.5 }}
        disabled={loggingIn}
      >
        {loggingIn ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Button
          component={Link as any}
          variant="text"
          to="/forgot-password"
          sx={{ textTransform: 'none' }}
        >
          Forgot Password?
        </Button>
        <Button
          component={Link as any}
          variant="text"
          to="/signup"
          sx={{ textTransform: 'none' }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
