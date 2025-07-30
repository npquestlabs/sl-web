import { Box, CircularProgress, useTheme } from '@mui/material';
import { httpService } from '@repo/api/httpService';
import { useEffect } from 'react';
import { Navigate, Outlet, useLoaderData, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Header } from '~/components/header';
import { useAuthStore } from '~/store/auth';

export async function clientLoader() {
  const { user, refetch } = useAuthStore.getState();
  if (user) return user;
  return await refetch();
}

export function HydrateFallback() {
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

export default function DashboardLayout() {
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useLoaderData<typeof clientLoader>();

  useEffect(() => {
    if (!user) {
      toast.error('Failed to load user data');
    }
  }, [user]);

  useEffect(() => {
    httpService.intercept401Response(() => {
      toast.error('Session expired. Please log in again.');
      navigate('/login');
    });
    return () => {
      httpService.clear401Interceptor();
    };
  }, [navigate]);

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
