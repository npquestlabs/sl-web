import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { coreService } from '@repo/api/coreService';
import { toast } from 'sonner';
import { type MessageResponse, type GoogleAuthResponse } from '@repo/types';

import {
  Box,
  Card,
  Button,
  Typography,
  CircularProgress,
  Avatar,
  Stack,
} from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { parseAsString, useQueryState } from '@repo/hooks/useQueryState';

type PageState =
  | 'authenticating'
  | 'confirmation_required'
  | 'creating_account'
  | 'success'
  | 'error';

export default function GoogleAuthCallback() {
  const navigate = useNavigate();
  const [code] = useQueryState('code', parseAsString);

  const [pageState, setPageState] = useState<PageState>('authenticating');
  const [error, setError] = useState<{ title: string; message: string } | null>(
    null,
  );
  const [confirmationData, setConfirmationData] =
    useState<GoogleAuthResponse | null>(null);

  useEffect(() => {
    if (!code) {
      setError({
        title: 'Invalid Request',
        message: 'No authentication code found. Please try again.',
      });
      setPageState('error');
      return;
    }

    const handleAuthentication = async (authCode: string) => {
      try {
        const response = await coreService.post<
          MessageResponse | GoogleAuthResponse
        >('/auth/google', { token: authCode });

        if ('error' in response) throw new Error(response.error);

        if ('completionToken' in response) {
          setConfirmationData(response);
          setPageState('confirmation_required');
          return;
        }

        // Case 2: No 'completionToken' field means it was a successful login for an existing user
        setPageState('success');
        toast.success(response.message || 'Welcome back!');
        navigate('/dashboard', { replace: true });
      } catch (err) {
        setError({
          title: 'Authentication Failed',
          message:
            err instanceof Error ? err.message : 'An unknown error occurred.',
        });
        setPageState('error');
      }
    };

    if (code) {
      handleAuthentication(code);
    } else {
      setError({
        title: 'Invalid Request',
        message: 'No authentication code found. Please try again.',
      });
      setPageState('error');
    }
  }, [code, navigate]);

  // Handler for when the user agrees to create their account
  const handleCreateAccount = async () => {
    if (!confirmationData) return;
    setPageState('creating_account');

    try {
      const response = await coreService.post<MessageResponse>(
        '/auth/google/register',
        { token: confirmationData.completionToken },
      );

      if ('error' in response) throw new Error(response.error);

      setPageState('success');
      toast.success(response.message || 'Account created successfully!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to create account.',
      );
      // Revert to the confirmation screen so the user can retry
      setPageState('confirmation_required');
    }
  };

  const renderContent = () => {
    switch (pageState) {
      case 'confirmation_required':
        if (!confirmationData) return null;
        return (
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
              textAlign: 'center',
            }}
            spacing={2}
          >
            <Avatar
              src={confirmationData.userPreview.avatarUrl}
              sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Create Your Account
            </Typography>
            <Typography color="text.secondary">
              Welcome! We&apos;ll use this info from Google to get you started.
            </Typography>
            <Card variant="outlined" sx={{ p: 2, textAlign: 'left' }}>
              <Typography>
                <strong>Name:</strong> {confirmationData.userPreview.firstName}{' '}
                {confirmationData.userPreview.lastName}
              </Typography>
              <Typography>
                <strong>Email:</strong> {confirmationData.userPreview.email}
              </Typography>
            </Card>
            <Button
              variant="contained"
              size="large"
              onClick={handleCreateAccount}
            >
              Agree & Create Account
            </Button>
          </Stack>
        );

      case 'success':
        return (
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
              textAlign: 'center',
            }}
            spacing={2}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 64, color: 'success.main' }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Success!
            </Typography>
            <Typography color="text.secondary">
              Redirecting you to the dashboard...
            </Typography>
          </Stack>
        );

      case 'error':
        return (
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
              textAlign: 'center',
            }}
            spacing={2}
          >
            <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {error?.title}
            </Typography>
            <Typography color="text.secondary">{error?.message}</Typography>
          </Stack>
        );

      default: // Handles 'authenticating' and 'creating_account'
        return (
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4,
              textAlign: 'center',
            }}
            spacing={2}
          >
            <CircularProgress size={48} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {pageState === 'authenticating'
                ? 'Finalizing Authentication...'
                : 'Creating Your Account...'}
            </Typography>
            <Typography color="text.secondary">
              Please wait a moment.
            </Typography>
          </Stack>
        );
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.paper',
        p: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: '420px', boxShadow: 5 }}>
        {renderContent()}
      </Card>
      <Button
        variant="text"
        component={Link}
        startIcon={<ArrowBackIcon />}
        to="/login"
        sx={{ mt: 4, color: 'text.secondary' }}
      >
        Back to Login
      </Button>
    </Box>
  );
}
