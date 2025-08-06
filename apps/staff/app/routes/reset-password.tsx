/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router';
import { coreService } from '@repo/api/coreService';
import { toast } from 'sonner';
import { type MessageResponse } from '@repo/types';

import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  useTheme,
  Avatar,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useAuthStore } from '~/store/auth';

type PageState = 'verifying' | 'form' | 'resetting' | 'success';

const invalidLinkError = {
  title: 'Invalid Link',
  message: 'This link is invalid or has expired.',
  action: (
    <Button variant="contained" component={Link as any} to="/forgot-password">
      Request a New Link
    </Button>
  ),
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoading: authLoading, isAuthenticated } = useAuthStore();
  const theme = useTheme();
  const { state } = useLocation();

  const [pageState, setPageState] = useState<PageState>('verifying');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<typeof invalidLinkError | null>(null);

  useEffect(() => {
    const token = searchParams.get('verification');
    const verifyToken = async () => {
      setPageState('verifying');
      try {
        const result = await coreService.post<MessageResponse>(
          '/auth/verifications/use',
          { token },
        );
        if (result.error) {
          setError({
            title: 'Invalid Link',
            message: result.error ?? 'This link is invalid or has expired.',
            action: (
              <Button
                variant="contained"
                component={Link as any}
                to="/forgot-password"
              >
                Request a New Link
              </Button>
            ),
          });
          return;
        }
        setPageState('form');
      } catch (err) {
        setError({
          title: 'Failed to Verify Link',
          message: err instanceof Error ? err.message : 'Unknown error',
          action: (
            <Button
              variant="contained"
              onClick={() => {
                setError(null);
                verifyToken();
              }}
            >
              Retry
            </Button>
          ),
        });
      }
    };

    if (token?.length) {
      verifyToken();
    } else if (authLoading) {
      setPageState('verifying');
    } else if (isAuthenticated) {
      setPageState('form');
    } else {
      setError(invalidLinkError);
    }
  }, [searchParams, authLoading, isAuthenticated]);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    setPageState('resetting');
    try {
      const result = await coreService.post<MessageResponse>(
        '/auth/reset-password',
        { password },
      );
      if (result.error) throw new Error(result.error);
      setPageState('success');
      toast.success(result.message || 'Password has been reset successfully!');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 1500);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
      setPageState('form');
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: 4,
            textAlign: 'center',
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {error.title}
          </Typography>
          <Typography color="text.secondary">{error.message}</Typography>
          {error.action}
        </Box>
      );
    }
    switch (pageState) {
      case 'verifying':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              p: 4,
              textAlign: 'center',
            }}
          >
            <CircularProgress size={48} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Verifying your link...
            </Typography>
            <Typography color="text.secondary">
              Please wait a moment.
            </Typography>
          </Box>
        );

      case 'success':
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              p: 4,
              textAlign: 'center',
            }}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 64, color: 'success.main' }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Password Reset!
            </Typography>
            <Typography color="text.secondary">
              Redirecting you to login...
            </Typography>
          </Box>
        );
      default:
        return (
          <Box
            component="form"
            onSubmit={handleResetPassword}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
            >
              Reset Your Password
            </Typography>
            <TextField
              type={showPassword ? 'text' : 'password'}
              label="New Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              type={showPassword ? 'text' : 'password'}
              label="Confirm New Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 2, py: 1.5 }}
              disabled={pageState === 'resetting'}
            >
              {pageState === 'resetting' ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Reset Password'
              )}
            </Button>
          </Box>
        );
    }
  };

  const action =
    pageState !== 'verifying'
      ? { message: 'Reset later', href: state?.from ?? '/dashboard' }
      : { message: 'Back to Login', href: '/login' };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Box
        sx={{ mb: 4, textAlign: 'center', a: { textDecoration: 'none' } }}
        component={Link as any}
        to="/"
      >
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 56,
            height: 56,
            mx: 'auto',
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'primary.contrastText',
            }}
          >
            P
          </Typography>
        </Avatar>
        <Typography
          variant="h6"
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          PropertyPro
        </Typography>
      </Box>

      <Card
        sx={{ width: '100%', maxWidth: '400px', boxShadow: theme.shadows[10] }}
      >
        {renderContent()}
      </Card>

      <Button
        variant="text"
        component={Link as any}
        startIcon={<ArrowBackIcon />}
        to={action.href}
        sx={{ mt: 4, color: 'text.secondary' }}
      >
        {action.message}
      </Button>
    </Box>
  );
}
