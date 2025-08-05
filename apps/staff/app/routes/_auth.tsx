import { Link, Outlet } from 'react-router';
import {
  Card,
  Button,
  Typography,
  Box,
  Grid,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import { coreService } from '@repo/api/coreService';
import { googleService } from '@repo/api/googleService';
import { type MessageResponse } from '@repo/types';
import { toast } from 'sonner';

export default function AuthLayout() {
  const handleGoogleLogin = async () => {
    try {
      const token = await googleService.signIn();
      // Now, manually call coreService to send the token to the backend
      const response = await coreService.post<MessageResponse>('/auth/google', { token });
      if (response.error) {
        throw new Error(response.error)
      }
      // Handle successful login, e.g., redirect or update user state
    } catch (error) {
      toast.error(error instanceof Error ? error.message: "Unknown error occurred");
      // TODO
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        bgcolor: 'background.default',
      }}
    >
      <Card sx={{ width: '100%', maxWidth: '896px', overflow: 'hidden' }}>
        <Grid container>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 5,
              color: 'primary.contrastText',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage:
                'url(https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2400)',
            }}
          >
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              Welcome to PropertyPro
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
              Your all-in-one solution for modern property management.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack sx={{ p: { xs: 4, md: 5 }, height: '100%' }}>
              <Link to="/">
                <Stack
                  alignItems="center"
                  spacing={1.5}
                  sx={{ cursor: 'pointer', mb: 4 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 64,
                      height: 64,
                    }}
                  >
                    <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      P
                    </Typography>
                  </Avatar>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                  >
                    PropertyPro
                  </Typography>
                </Stack>
              </Link>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ width: '100%' }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      style={{ height: '20px', width: '20px' }}
                    />
                  }
                  onClick={handleGoogleLogin}
                >
                  Google
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={
                    <img
                      src="https://www.svgrepo.com/show/503173/apple-logo.svg"
                      alt="Apple"
                      style={{ height: '20px', width: '20px' }}
                    />
                  }
                  onClick={() => alert('Apple login coming soon!')}
                >
                  Apple
                </Button>
              </Stack>

              <Divider sx={{ my: 3, color: 'text.secondary', fontSize: 'xs' }}>
                OR
              </Divider>

              <Outlet />
            </Stack>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
