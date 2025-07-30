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

import { House, Notifications } from '@mui/icons-material';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export function meta() {
  return [
    { title: 'PropertyPro - Your Rental, Simplified' },
    {
      name: 'description',
      content:
        'Easily pay rent, manage your lease, and submit maintenance requests. PropertyPro makes renting simple, secure, and transparent.',
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

  // Tenant-focused testimonials
  const testimonials = [
    {
      name: 'Aisha Mensah',
      date: '2023-11-10',
      rating: 5,
      text: "Paying rent has never been easier. I love the automatic reminders and getting a receipt instantly.",
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjV_3gY-Gg-w-gBIVzFwOqQ-C-Q-Q',
    },
    {
      name: 'Ben Chen',
      date: '2023-10-22',
      rating: 5,
      text: "I had a leaky faucet, reported it with a photo on the app, and it was scheduled for repair the next day. Incredibly efficient!",
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjW_8zX-gY-gBIVzFwOqQ-C-Q-Q',
    },
    {
      name: 'Chloe Williams',
      date: '2023-09-15',
      rating: 5,
      text: "It's great to have my lease agreement accessible anytime. No more digging through old emails.",
      avatar: 'https://lh3.googleusercontent.com/a-/ALV-UjU_7gY-gBIVzFwOqQ-C-Q-Q',
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
      {/* Header (Consistent with Landlord Page) */}
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
              <House className="size-6" />
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
                Features
              </Button>
              <Button variant="text" onClick={() => smoothScroll('testimonials')}>
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
        {/* === HERO SECTION (TENANT-FOCUSED) === */}
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
              label="Simple, Transparent, and Convenient"
              color="primary"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 800, color: 'primary.dark', mb: 2 }}
            >
              Your Rental, Simplified.
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}
            >
              A single, secure portal to pay rent, view your lease, and report maintenance issues. Welcome to a better renting experience.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: '999px',
                fontWeight: 'bold',
              }}
            >
              Access Your Portal
            </Button>
          </motion.div>
        </Container>

        {/* === FEATURES SECTION (TENANT-FOCUSED) === */}
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
              Everything You Need for a Smooth Tenancy
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 6 }}
            >
              Our platform is designed to make your life easier, with all your rental needs in one place.
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  icon: <PaymentIcon color="primary" sx={{ fontSize: 40 }} />,
                  title: 'Simple & Secure Rent Payments',
                  desc: 'Pay your rent online using Card, Bank Transfer, or Mobile Money. Get automatic reminders and instant receipts for every payment. [1, 2]',
                },
                {
                  icon: (
                    <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />
                  ),
                  title: 'Your Lease at Your Fingertips',
                  desc: 'Access your lease agreement, rules, and renewal information anytime, anywhere. No more searching for paper copies. [2, 4, 5]',
                },
                {
                  icon: <BuildIcon color="primary" sx={{ fontSize: 40 }} />,
                  title: 'Hassle-Free Maintenance',
                  desc: "Found an issue? Submit a maintenance request with photos directly through the portal and track its status from 'Pending' to 'Completed'. [1, 2, 5]",
                },
                {
                  icon: (
                    <Notifications color="primary" sx={{ fontSize: 40 }} />
                  ),
                  title: 'Stay Informed',
                  desc: 'Receive important updates, announcements, and payment notifications directly from your landlord through the platform, ensuring clear communication. [1, 6]',
                },
              ].map((item, index) => (
                <Grid size={{xs:12, sm:6, md:3}} key={index}>
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

        {/* Testimonials Section (Tenant-focused) */}
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
              Loved by Tenants Like You
            </Typography>
            <Grid container spacing={3}>
              {testimonials.map((t, index) => (
                <Grid size={{xs:12, md:4}} key={index}>
                  <Card elevation={0} sx={{ height: '100%', borderRadius: 2, bgcolor: 'background.paper' }}>
                    <CardHeader
                      avatar={<Avatar src={t.avatar} alt={t.name} />}
                      title={t.name}
                      subheader={t.date}
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

      {/* Footer (Consistent with Landlord Page) */}
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
            <Grid size={{xs:12, md:4}}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: 'primary.main',
                  mb: 2,
                }}
              >
                <House className="size-6" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  PropertyPro
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                The modern solution for rental property management.
              </Typography>
            </Grid>
            <Grid size={{xs:6, md:2}}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                Product
              </Typography>
              <Link
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Features
              </Link>
              <Link
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Security
              </Link>
            </Grid>
            <Grid size={{xs:12, md:2}}>
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
            <Grid size={{xs:6, md:2}}>
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