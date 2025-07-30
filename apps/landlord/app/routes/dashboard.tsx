import { Box, CircularProgress, useTheme } from '@mui/material';
import { httpService } from '@repo/api/httpService';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Header } from '~/components/header';
import { useAuthStore } from '~/store/auth';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, reload } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    reload({
      handleError: (error) => {
        toast.error(
          error instanceof Error ? error.message : 'Failed to load user data',
        );
        setIsLoading(false);
      },
      handleSuccess: () => {
        setIsLoading(false);
      },
    });
  }, [reload]);

  useEffect(() => {
    httpService.intercept401Response(() => {
      toast.error('Session expired. Please log in again.');
      navigate('/login');
    });
    return () => {
      httpService.clear401Interceptor();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          backgroundColor: theme.palette.background.default,
          p: { xs: 2, sm: 3 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
