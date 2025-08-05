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
import { coreService } from '@repo/api/coreService';
import { type MessageResponse } from '@repo/types';
import { OTP } from '@repo/ui/components/otp';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<'form' | 'otp'>('form');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //const refetch = useAuthStore((state) => state.refetch);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = { email, password, staff: { firstName, lastName } };
      const result = await coreService.post<MessageResponse>(
        '/auth/register/stage-one',
        { email, user },
      );
      if (result.error) throw new Error(result.error);

      toast.success(result.message || 'Verification code sent to your email.');
      setStage('otp');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed');
    }
    setLoading(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = { email, password, staff: { firstName, lastName } };
    try {
      const result = await coreService.post<MessageResponse>(
        '/auth/register/stage-two',
        { otp, user },
      );
      if (result.error) throw new Error(result.error);

      toast.success(result.message ?? 'Account created!');
      //await refetch();
      navigate('/dashboard');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Verification failed',
      );
    }
    setLoading(false);
  };

  return (
    <>
      {stage === 'form' ? (
        <Box
          component="form"
          onSubmit={handleSignup}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Typography
            component="h2"
            variant="h5"
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}
          >
            Create Account
          </Typography>

          <TextField
            label="First Name"
            variant="outlined"
            size="small"
            fullWidth
            required
            autoFocus
            disabled={loading}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            size="small"
            fullWidth
            required
            disabled={loading}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            size="small"
            fullWidth
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              'Sign Up'
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
              Already have an account?
            </Typography>
            <Button
              component={Link as any}
              variant="text"
              to="/login"
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          component="form"
          onSubmit={handleVerify}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center',
          }}
        >
          <Typography
            component="h2"
            variant="h5"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Enter Verification Code
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ textAlign: 'center', mt: -2, mb: 1 }}
          >
            A 6-digit code was sent to{' '}
            <Typography
              component="span"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              {email}
            </Typography>
          </Typography>

          <OTP
            length={6}
            pattern="^[0-9]*$"
            value={otp}
            onChange={(val) => setOtp(val)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.5 }}
            disabled={loading || otp.length !== 6}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Verify & Create Account'
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
              Changed your mind?
            </Typography>
            <Button
              component={Link as any}
              variant="text"
              to="/login"
              sx={{ textTransform: 'none' }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
