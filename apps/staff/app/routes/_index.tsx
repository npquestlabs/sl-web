import React from 'react';
import { useNavigate, Link, NavLink } from 'react-router';
import { useAuthStore } from '~/store/auth';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  Container,
  Grid,
  Divider,
  IconButton,
  Link as MuiLink,
  alpha,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';

import { motion } from 'framer-motion';

// --- ICONS ---
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

import AppLogo from '@repo/ui/components/logo';
import { coreService } from '@repo/api/coreService';

export function meta() {
  return [
    { title: 'PropertyPro - The Complete Property Management Ecosystem' },
    {
      name: 'description',
      content:
        'A unified platform for landlords, property managers, and hostel operators to automate rent, manage leases, and coordinate maintenance.',
    },
  ];
}

export default function Welcome() {
  const navigate = useNavigate();
  const { user, refetch, isLoading } = useAuthStore();
  const [scrolled, setScrolled] = React.useState(false);

  const theme = useTheme();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    if (!user && !isLoading && coreService.hasTokens()) {
      refetch();
    }
  }, [isLoading, refetch, user]);

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const testimonials = [
    {
      name: 'Michael Chen',
      role: 'Portfolio Manager, Greenleaf Estates',
      rating: 5,
      text: "The ability to assign staff to specific complexes has cleaned up our operations immensely. It's powerful, yet simple.",
      avatar: 'https://i.pravatar.cc/150?u=michael',
    },
    {
      name: 'Amina Okoro',
      role: 'Hostel Operator, City Campus Hostels',
      rating: 5,
      text: 'Lease management and automated rent collection via Mobile Money have been game-changers for managing student turnover.',
      avatar: 'https://i.pravatar.cc/150?u=amina',
    },
    {
      name: 'David Rodriguez',
      role: 'Landlord & Investor',
      rating: 5,
      text: "I went from spreadsheets to PropertyPro and haven't looked back. Seeing all my maintenance requests and payments in one dashboard is incredible.",
      avatar: 'https://i.pravatar.cc/150?u=david',
    },
  ];

  const features = [
    {
      icon: <HomeWorkIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Centralized Portfolio Management',
      desc: "Get a bird's-eye view of your entire portfolio. Group units into complexes and manage properties across multiple locations effortlessly.",
    },
    {
      icon: <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Automated Lease Lifecycle',
      desc: 'Create, sign, and store leases digitally. The system automatically tracks key dates and simplifies renewals by linking new leases to old ones.',
    },
    {
      icon: <PaymentIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Multi-Method Payment Automation',
      desc: 'Accept payments via Card, Bank Transfer, or Mobile Money. Automatically track due dates, send reminders, and issue receipts.',
    },
    {
      icon: <GroupsIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'Team Roles & Permissions',
      desc: "Assign staff (e.g., 'Admin', 'Regular') to specific complexes, ensuring team members only see and manage the properties relevant to them.",
    },
  ];

  const personas = [
    {
      icon: <BusinessIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'For Property Managers',
      desc: 'Scale your operations with portfolio-level views and granular staff permissions. Maximize efficiency for all the properties you manage.',
    },
    {
      icon: <PersonOutlineIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'For Landlords',
      desc: 'Save time and reduce stress. Automate rent collection and maintenance requests for your properties, whether you own one unit or twenty.',
    },
    {
      icon: <SchoolIcon color="primary" sx={{ fontSize: 40 }} />,
      title: 'For Hostel Operators',
      desc: 'Manage high tenant turnover with ease. Track room assignments, handle term-based leases, and communicate with all your residents seamlessly.',
    },
  ];

  const faqs = [
    {
      question: 'How does tenant onboarding work?',
      answer:
        'You can invite tenants to the platform where they can create an account, view their lease, and make payments. Alternatively, you can manage their data manually and they can claim their profile at any time. The system is flexible to your needs.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes. Security is our top priority. All data is encrypted in transit and at rest. We use industry-standard practices to ensure your property and financial data is protected.',
    },
    {
      question: 'What are the fees for payment processing?',
      answer:
        'We partner with secure, trusted payment processors. Transaction fees are transparent and depend on the method used (e.g., Mobile Money, Card). You can find detailed information on our upcoming pricing page.',
    },
    {
      question: 'Can I use this for commercial properties?',
      answer:
        "While our current feature set is heavily optimized for residential properties, hostels, and apartments, the flexible nature of 'Complexes' and 'Units' allows for basic management of commercial spaces. We are actively expanding our commercial features.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      {/* --- HEADER --- */}
      <AppBar
        position="sticky"
        elevation={scrolled ? 2 : 0}
        sx={{
          backgroundColor: (theme) =>
            scrolled
              ? alpha(theme.palette.background.paper, 0.85)
              : 'transparent',
          backdropFilter: 'blur(8px)',
          transition: (theme) =>
            theme.transitions.create(['background-color', 'box-shadow']),
          borderBottom: (theme) =>
            `1px solid ${scrolled ? theme.palette.divider : 'transparent'}`,
          color: 'text.primary',
        }}
      >
        <Toolbar
          sx={{ justifyContent: 'space-between', px: { xs: 2, md: 5 }, py: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <NavLink to=".">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: 'primary.main',
                }}
              >
                <AppLogo
                  color1={theme.palette.secondary.main}
                  color2={theme.palette.primary.main}
                  size={48}
                />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  PropertyPro
                </Typography>
              </Box>
            </NavLink>
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
              <Button variant="text" onClick={() => smoothScroll('personas')}>
                Solutions
              </Button>
              <Button
                variant="text"
                onClick={() => smoothScroll('testimonials')}
              >
                Testimonials
              </Button>
              {user ? (
                <Button variant="contained" component={Link} to="/dashboard">
                  Go to Dashboard
                </Button>
              ) : (
                <Stack direction="row" spacing={1.5}>
                  <Button variant="outlined" component={Link} to="/login">
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard')}
                  >
                    Get Started
                  </Button>
                </Stack>
              )}
            </Box>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* --- MAIN CONTENT --- */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* === HERO SECTION === */}
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
              label="The All-In-One Property Management Ecosystem"
              color="primary"
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontWeight: 800, mb: 2 }}
            >
              The Clear Path to Effortless Property Management
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: '700px', mx: 'auto', mb: 4 }}
            >
              From multi-unit complexes to single rentals, PropertyPro provides
              the tools to automate payments, manage teams, and streamline
              communication.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/dashboard')}
                endIcon={<ArrowForwardIcon />}
              >
                Go to Your Dashboard
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => smoothScroll('how-it-works')}
              >
                See How It Works
              </Button>
            </Stack>
          </motion.div>
        </Container>

        {/* === HOW IT WORKS SECTION === */}
        <Box
          id="how-it-works"
          sx={{
            py: 8,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
            >
              A Smarter Workflow in 4 Steps
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 8 }}
            >
              We&apos;ve designed a simple, repeatable process to take the
              complexity out of property management.
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  num: 1,
                  title: 'Setup Your Portfolio',
                  desc: 'Add your complexes and units. Our flexible hierarchy handles everything from single rooms to large estates.',
                },
                {
                  num: 2,
                  title: 'Create Digital Leases',
                  desc: 'Onboard tenants with secure, digital leases. Set rent amounts, durations, and custom rules.',
                },
                {
                  num: 3,
                  title: 'Automate Rent Collection',
                  desc: 'Schedule recurring payments. Tenants can pay via methods they prefer, and you get notified instantly.',
                },
                {
                  num: 4,
                  title: 'Collaborate & Maintain',
                  desc: 'Receive maintenance requests, assign vendors, and track jobs from start to finish. Everyone stays in the loop.',
                },
              ].map((step) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={step.num}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        width: 48,
                        height: 48,
                        margin: '0 auto 16px auto',
                        fontSize: '1.5rem',
                      }}
                    >
                      {step.num}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {step.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* === FEATURES DEEP DIVE === */}
        <Box id="features" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
            >
              Everything You Need, Intelligently Connected
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 8 }}
            >
              Our comprehensive suite of tools is designed to save you time and
              provide clarity across your entire portfolio.
            </Typography>
            <Grid container spacing={4}>
              {features.map((item) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
                  <Card
                    variant="outlined"
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 2,
                      borderColor: 'divider',
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

        {/* === PERSONA-DRIVEN SOLUTIONS === */}
        <Box
          id="personas"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}
            >
              A Platform Built For You
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textAlign: 'center', maxWidth: '600px', mx: 'auto', mb: 8 }}
            >
              PropertyPro is designed to meet the unique challenges of different
              property management roles.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {personas.map((item) => (
                <Grid size={{ xs: 12, md: 4 }} key={item.title}>
                  <Box
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      height: '100%',
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{item.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* === TESTIMONIALS === */}
        <Box id="testimonials" sx={{ py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 8 }}
            >
              Trusted by Modern Property Professionals
            </Typography>
            <Grid container spacing={3}>
              {testimonials.map((t, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{ display: 'flex', mb: 1.5, color: 'warning.main' }}
                      >
                        {[...Array(t.rating)].map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ fontStyle: 'italic', mb: 2 }}
                      >{`"${t.text}"`}</Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        pt: 0,
                      }}
                    >
                      <Avatar src={t.avatar} alt={t.name} sx={{ mr: 2 }} />
                      <Box>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {t.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t.role}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* === FAQ SECTION === */}
        <Box
          id="faq"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}
        >
          <Container maxWidth="md">
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 8 }}
            >
              Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                variant="outlined"
                sx={{
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { mt: '0 !important' },
                  mb: 1,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 'medium' }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </Box>

        {/* === FINAL CTA === */}
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.primary.dark,
            color: 'primary.contrastText',
          }}
        >
          <Container
            maxWidth="md"
            sx={{ textAlign: 'center', py: { xs: 8, md: 12 } }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Ready to Take Control of Your Properties?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                mb: 4,
                color: (theme) =>
                  alpha(theme.palette.primary.contrastText, 0.8),
              }}
            >
              Sign up today and experience a new era of property management.
              Your dashboard is one click away.
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
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.common.white, 0.9),
                },
              }}
            >
              Get Started Now
            </Button>
          </Container>
        </Box>
      </Box>

      {/* === FOOTER === */}
      <Box
        component="footer"
        sx={{ py: 6, px: 2, bgcolor: 'background.paper' }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid size={{ xs: 12, md: 4 }}>
              <NavLink to=".">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    color: 'primary.main',
                    mb: 2,
                  }}
                >
                  <AppLogo
                    color1={theme.palette.secondary.main}
                    color2={theme.palette.primary.main}
                    size={48}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    PropertyPro
                  </Typography>
                </Box>
              </NavLink>
              <Typography variant="body2" color="text.secondary">
                The modern ecosystem for rental property management.
              </Typography>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                Product
              </Typography>
              <MuiLink
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Features
              </MuiLink>
              <MuiLink
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Pricing
              </MuiLink>
              <MuiLink
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Security
              </MuiLink>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
                Company
              </Typography>
              <MuiLink
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                About Us
              </MuiLink>
              <MuiLink
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Careers
              </MuiLink>
              <MuiLink
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Contact
              </MuiLink>
            </Grid>
            <Grid size={{ xs: 6, md: 2 }}>
              <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Legal</Typography>
              <MuiLink
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Privacy Policy
              </MuiLink>
              <MuiLink
                href="#"
                color="text.secondary"
                display="block"
                underline="hover"
                sx={{ mb: 0.5 }}
              >
                Terms of Service
              </MuiLink>
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
