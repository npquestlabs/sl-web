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

import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import HouseIcon from '@mui/icons-material/House';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import HandymanIcon from '@mui/icons-material/Handyman';

export function meta() {
  return [
    { title: 'PropertyPro - Automate Your Rentals' },
    {
      name: 'description',
      content:
        'The all-in-one platform for landlords, tenants, and vendors. Automate rent collection, manage leases, and coordinate maintenance effortlessly.',
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

  const testimonials = [
    {
      name: 'Sophia Carter',
      date: '2023-08-15',
      rating: 5,
      text: "PropertyPro has transformed how I manage my properties. It's intuitive and saves me so much time.",
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBoYG0vUQvpzqnvCh81FRlc__En9nUt6s1WDAfxAN9LpD0YOZYgOJjGsLAVamerbevkTHcvrSN4RZYKeY_7yCNR1ezqs77SM0tF4X9YEhA5xlK3ZNUiKSRYiQS6TN_11wmmr2iFBkfo6ObugBhCf4jo2xSCk2uFiEhIwqtyG_G-h8fxMsoQQEmBh5l1dbPKTXTV8C-TOhOWDzFBRa-mZRICjwMC8Zr8PHE_5-Cp7oKBbnx-WzDKSL6ruKSQ66RYcsxOftS1o5P0Ea4u',
    },
    {
      name: 'Ethan Lin',
      date: '2023-09-20',
      rating: 5,
      text: 'The lease management feature is a game-changer. I no longer worry about missing deadlines.',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDf0leGagO9m8WdUEKL_yJKDqx1_lZXrPHrP0DmViqhOqCCN9fuFF6Nw-UrBBNbx-d6fJLLoy1reBGSeEvY8NW6kl0jLlPwDxdu4DXXdLk2ZbP5WJhinXuZADV4ROuwIH3DnfJNLOHQrRxZI9h6Ncc_n2gsFHjzDVo7aaikOKhwMOjE_HHt8es2rjIeig8GI8DOtJJ4u1Mes1iV9o9MGmBHVH4tZiaql8bYt2eFslIQwKropg00hGi82Lo1D9JpJAkQMUPfpbKtBXko',
    },
    {
      name: 'Olivia Ramirez',
      date: '2023-10-05',
      rating: 5,
      text: "I love the payment processing system. It's secure and makes rent collection a breeze.",
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAfFj2abSzQeMeOQGZLxxl64pwQZCOszmO0KmQa17yHBamfGUaYSEyX3kqF49xX4NFIuECrE30nyDZRzlPfkAM7m9fcoauNlXIbJbq6PPG_LikFmEE4IHBhmLALRksvr-fCYjzY6a6kA7TTtHNda0QfU-sqpXz2GVpcE653MlT3kFuO_FyuPOfduLJf8Q4-YXUKpeoCIeNwbpiZ2M7eoEjP3SAGAq7IltS7f4JNEPF1e6iO0McNU4hYeOFOgKZHfZeVzZodqmPcmvhe',
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
                Features
              </Button>
              <Button variant="text" onClick={() => smoothScroll('platform')}>
                Platform
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
        {/* === HERO SECTION (UPDATED) === */}
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
              label="Automation & Collaboration for Modern Landlords"
              color="primary"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 800, color: 'primary.dark', mb: 2 }}
            >
              Automate Your Rentals, From Lease to Final Payment.
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}
            >
              Finally, a single platform to manage your portfolio, sign digital
              leases, automate rent collection, and coordinate maintenance with
              tenants and vendors.
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
              Get Started
            </Button>
          </motion.div>
        </Container>

        {/* === FEATURES SECTION (UPDATED) === */}
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
              Everything You Need, All In One Place
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 6 }}
            >
              Our comprehensive suite of tools is designed to save you time and
              reduce the complexity of property management.
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  icon: <HomeWorkIcon color="primary" sx={{ fontSize: 40 }} />,
                  title: 'Centralized Portfolio Management',
                  desc: "Group your units into complexes. Get a bird's-eye view of your entire property portfolio, from country to a single room.",
                },
                {
                  icon: (
                    <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />
                  ),
                  title: 'Digital & Automated Leasing',
                  desc: 'Create, manage, and store lease agreements digitally. Our system tracks dates and sends automated renewal reminders.',
                },
                {
                  icon: <PaymentIcon color="primary" sx={{ fontSize: 40 }} />,
                  title: 'Automated Rent Collection',
                  desc: 'Accept payments via Card, Bank Transfer, or Mobile Money. We automatically track due dates and record payments.',
                },
                {
                  icon: <BuildIcon color="primary" sx={{ fontSize: 40 }} />,
                  title: 'Collaborative Maintenance',
                  desc: "Allow tenants to submit requests with photos. Assign jobs to vendors and track the status from 'Pending' to 'Completed'.",
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

        {/* === NEW SECTION: PLATFORM FOR EVERYONE === */}
        <Box id="platform" sx={{ py: 8 }}>
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
              A Seamless Experience for Everyone
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 6 }}
            >
              PropertyPro connects landlords, tenants, and vendors on a single,
              easy-to-use platform, creating a transparent and efficient
              ecosystem.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  icon: (
                    <AdminPanelSettingsIcon
                      color="primary"
                      sx={{ fontSize: 40 }}
                    />
                  ),
                  role: 'For Landlords',
                  desc: 'Complete oversight of your finances, properties, and people. Reduce manual work and maximize your returns.',
                },
                {
                  icon: <PeopleIcon color="primary" sx={{ fontSize: 40 }} />,
                  role: 'For Tenants',
                  desc: 'A simple way to pay rent, view your lease, and report issues. Invite tenants to join or manage them manually—they can claim their data anytime.',
                },
                {
                  icon: <HandymanIcon color="primary" sx={{ fontSize: 40 }} />,
                  role: 'For Vendors',
                  desc: 'Receive job requests, provide quotes, and manage your schedule. A direct line to property managers for faster work and payment.',
                },
              ].map((item) => (
                <Grid size={{ xs: 12, md: 4 }} key={item.role}>
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
                      {item.role}
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

        {/* Testimonials Section (No Changes) */}
        <Box id="testimonials" sx={{ py: 8, bgcolor: 'background.paper' }}>
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
              Loved by Landlords Everywhere
            </Typography>
            <Grid container spacing={3}>
              {testimonials.map((t, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Card elevation={0} sx={{ height: '100%', borderRadius: 2 }}>
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

      {/* === FOOTER (EXPANDED) === */}
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
                Pricing
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
            <Grid size={{ xs: 6, md: 2 }}>
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
                Careers
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
