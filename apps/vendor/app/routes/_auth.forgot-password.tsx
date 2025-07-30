/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Link } from 'react-router';
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { toast } from 'sonner';
import { httpService } from '@repo/api/httpService';
import { type MessageResponse } from '@repo/types';

import { MailOutline, CheckCircleOutline } from '@mui/icons-material';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await httpService.post<MessageResponse>(
        '/auth/forgot-password',
        { email },
      );
      if (result.error) throw new Error(result.error);

      toast.success(result.message || 'Password reset link sent!');
      setEmailSent(true);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to send reset link.',
      );
    }
    setLoading(false);
  };

  return (
    <>
      {emailSent ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
          }}
        >
          <CheckCircleOutline sx={{ fontSize: 60, color: 'success.main' }} />
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Check your inbox
          </Typography>
          <Typography color="text.secondary">
            A password reset link has been sent to{' '}
            <Typography
              component="span"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              {email}
            </Typography>
            .
          </Typography>
          <Button
            type="button"
            component={Link as any}
            fullWidth
            variant="contained" // Consistent primary button
            sx={{ mt: 2, py: 1.5 }}
            to="/login"
          >
            Back to Login
          </Button>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleForgot}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Box sx={{ textAlign: 'center', mb: 1 }}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              Forgot Password?
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              No problem! Enter your email below.
            </Typography>
          </Box>
          <TextField
            label="Email Address"
            variant="outlined"
            size="small"
            required
            fullWidth
            autoFocus
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutline sx={{ color: 'text.secondary' }} />
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
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Send Reset Link'
            )}
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 1,
              gap: 0.5,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Remembered your password?
            </Typography>
            <Button
              variant="text"
              component={Link as any}
              type="button"
              to="/login"
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
