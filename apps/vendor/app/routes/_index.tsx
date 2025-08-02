import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '~/store/auth';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Container,
  Grid,
  Divider,
  Link,
  IconButton,
  alpha,
} from '@mui/material';

import { motion } from 'framer-motion';

import HouseIcon from '@mui/icons-material/House';
import HandymanIcon from '@mui/icons-material/Handyman';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import StarIcon from '@mui/icons-material/Star';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export function meta() {
  return [
    { title: 'PropertyPro - Jobs for Vendors' },
    {
      name: 'description',
      content:
        'Connect with property managers, receive job requests, manage your schedule, and get paid faster. Join the PropertyPro vendor network.',
    },
  ];
}

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Vendor-focused testimonials
  const testimonials = [
    {
      name: 'David Lee',
      specialty: 'Plumbing Services',
      rating: 5,
      text: 'PropertyPro provides a steady stream of jobs. The communication with staffs is direct and simple, which saves me a ton of time.',
      avatar:
        'https://lh3.googleusercontent.com/a-/ALV-UjX_9gY-gBIVzFwOqQ-C-Q-Q',
    },
    {
      name: 'Grace Adomako',
      specialty: 'Electrician',
      rating: 5,
      text: 'The best part is the payment system. As soon as a job is marked complete, the payment process starts. No more chasing invoices.',
      avatar:
        'https://lh3.googleusercontent.com/a-/ALV-UjY_1gY-gBIVzFwOqQ-C-Q-Q',
    },
    {
      name: 'Samuel Rodriguez',
      specialty: 'General Handyman',
      rating: 5,
      text: 'Managing my schedule has never been easier. I can see all my upcoming jobs in one place and plan my week effectively.',
      avatar:
        'https://lh3.googleusercontent.com/a-/ALV-UjZ_5gY-gBIVzFwOqQ-C-Q-Q',
    },
  ];

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
        fontFamily: 'Public Sans, Noto Sans, sans-serif',
      }}
    >
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={scrolled ? 2 : 0}
        sx={{
          backgroundColor: (theme) =>
            scrolled
              ? alpha(theme.palette.background.paper, 0.8)
              : 'transparent',
          backdropFilter: 'blur(10px)',
          transition: (theme) =>
            theme.transitions.create(['background-color', 'box-shadow']),
          borderBottom: (theme) =>
            scrolled ? `1px solid ${theme.palette.divider}` : 'none',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 5 } }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                color: 'primary.main',
              }}
            >
              <HouseIcon className="size-6" />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                PropertyPro
              </Typography>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Button variant="text" onClick={() => smoothScroll('features')}>
                Benefits
              </Button>
              <Button
                variant="text"
                onClick={() => smoothScroll('testimonials')}
              >
                Testimonials
              </Button>
              {user ? (
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {`${user.firstName.charAt(0)}${user.lastName.charAt(
                    0,
                  )}`.toUpperCase()}
                </Avatar>
              ) : (
                <Button variant="outlined" onClick={() => navigate('/login')}>
                  Login
                </Button>
              )}
            </Box>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* === HERO SECTION (VENDOR-FOCUSED) === */}
        <Container
          maxWidth="md"
          sx={{ textAlign: 'center', py: { xs: 8, md: 16 } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Chip
              label="More Jobs. Faster Payments."
              color="primary"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 800, color: 'primary.dark', mb: 2 }}
            >
              Connect Directly with Property Managers.
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}
            >
              Get notified about new maintenance jobs, manage your schedule, and
              track your payments—all in one place.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: '999px',
                fontWeight: 'bold',
              }}
            >
              Join Our Network
            </Button>
          </motion.div>
        </Container>

        {/* === FEATURES SECTION (VENDOR-FOCUSED) === */}
        <Box id="features" sx={{ py: 8, bgcolor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'primary.dark',
                mb: 2,
              }}
            >
              A Better Way to Manage Your Work
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 6 }}
            >
              Our platform streamlines the entire maintenance process, from
              request to payment.
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  icon: <HandymanIcon color="primary" sx={{ fontSize: 40 }} />,
                  title: 'Receive Job Requests',
                  desc: 'Get instant notifications for maintenance requests from staffs that match your specialty.',
                },
                {
                  icon: (
                    <PlaylistAddCheckIcon
                      color="primary"
                      sx={{ fontSize: 40 }}
                    />
                  ),
                  title: 'Manage Jobs Easily',
                  desc: 'Respond to requests, provide quotes, and track the status of all your jobs from "Pending" to "Completed".',
                },
                {
                  icon: (
                    <EventAvailableIcon color="primary" sx={{ fontSize: 40 }} />
                  ),
                  title: 'Schedule with Confidence',
                  desc: 'A clear view of all scheduled jobs helps you organize your time and manage your workload efficiently.',
                },
                {
                  icon: (
                    <PriceCheckIcon color="primary" sx={{ fontSize: 40 }} />
                  ),
                  title: 'Get Paid Promptly',
                  desc: 'Once a job is complete, the platform facilitates the payment process, ensuring you get paid faster, without the hassle.',
                },
              ].map((item, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      height: '100%',
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{item.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Testimonials Section (Vendor-focused) */}
        <Box id="testimonials" sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'primary.dark',
                mb: 6,
              }}
            >
              Trusted by Skilled Professionals
            </Typography>
            <Grid container spacing={3}>
              {testimonials.map((t, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                    }}
                  >
                    <CardHeader
                      avatar={<Avatar src={t.avatar} alt={t.name} />}
                      title={t.name}
                      subheader={t.specialty}
                    />
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          mb: 1,
                          color: 'warning.main',
                        }}
                      >
                        {[...Array(t.rating)].map((_, i) => (
                          <StarIcon key={i} fontSize="small" />
                        ))}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {`"${t.text}"`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Footer (Consistent) */}
      <Box
        component="footer"
        sx={{
          mt: 'auto',
          py: 6,
          px: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: 'primary.main',
                  mb: 2,
                }}
              >
                <HouseIcon className="size-6" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  PropertyPro
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                The modern solution for rental property management.
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                Platform
              </Typography>
              <Link
                href="/staff"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                For Property Managers
              </Link>
              <Link
                href="/tenants"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                For Tenants
              </Link>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                Company
              </Typography>
              <Link
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                About Us
              </Link>
              <Link
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Contact
              </Link>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Legal</Typography>
              <Link
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Terms of Service
              </Link>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} PropertyPro. All rights reserved.
            </Typography>
            <Box sx={{ mt: { xs: 2, sm: 0 } }}>
              <IconButton href="#" aria-label="Twitter">
                <TwitterIcon color="primary" />
              </IconButton>
              <IconButton href="#" aria-label="Facebook">
                <FacebookIcon color="primary" />
              </IconButton>
              <IconButton href="#" aria-label="Instagram">
                <InstagramIcon color="primary" />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
