import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "~/store/auth";

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
} from "@mui/material";

import { motion } from "framer-motion";

import HomeWorkIcon from "@mui/icons-material/HomeWork";
import DescriptionIcon from "@mui/icons-material/Description";
import PaymentIcon from "@mui/icons-material/Payment";
import BuildIcon from "@mui/icons-material/Build";
import StarIcon from "@mui/icons-material/Star";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { House } from "@mui/icons-material";

export function meta() {
  return [
    { title: "PropertyPro" },
    { name: "description", content: "Welcome to PropertyPro!" },
  ];
}

export function loader() {
  return { ssr: 'SSR is working!' }
}

export default function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const testimonials = [
    {
      name: "Sophia Carter",
      date: "2023-08-15",
      rating: 5,
      text: "PropertyPro has transformed how I manage my properties. It's intuitive and saves me so much time.",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBoYG0vUQvpzqnvCh81FRlc__En9nUt6s1WDAfxAN9LpD0YOZYgOJjGsLAVamerbevkTHcvrSN4RZYKeY_7yCNR1ezqs77SM0tF4X9YEhA5xlK3ZNUiKSRYiQS6TN_11wmmr2iFBkfo6ObugBhCf4jo2xSCk2uFiEhIwqtyG_G-h8fxMsoQQEmBh5l1dbPKTXTV8C-TOhOWDzFBRa-mZRICjwMC8Zr8PHE_5-Cp7oKBbnx-WzDKSL6ruKSQ66RYcsxOftS1o5P0Ea4u",
    },
    {
      name: "Ethan Lin",
      date: "2023-09-20",
      rating: 5,
      text: "The lease management feature is a game-changer. I no longer worry about missing deadlines.",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDf0leGagO9m8WdUEKL_yJKDqx1_lZXrPHrP0DmViqhOqCCN9fuFF6Nw-UrBBNbx-d6fJLLoy1reBGSeEvY8NW6kl0jLlPwDxdu4DXXdLk2ZbP5WJhinXuZADV4ROuwIH3DnfJNLOHQrRxZI9h6Ncc_n2gsFHjzDVo7aaikOKhwMOjE_HHt8es2rjIeig8GI8DOtJJ4u1Mes1iV9o9MGmBHVH4tZiaql8bYt2eFslIQwKropg00hGi82Lo1D9JpJAkQMUPfpbKtBXko",
    },
    {
      name: "Olivia Ramirez",
      date: "2023-10-05",
      rating: 5,
      text: "I love the payment processing system. It's secure and makes rent collection a breeze.",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAfFj2abSzQeMeOQGZLxxl64pwQZCOszmO0KmQa17yHBamfGUaYSEyX3kqF49xX4NFIuECrE30nyDZRzlPfkAM7m9fcoauNlXIbJbq6PPG_LikFmEE4IHBhmLALRksvr-fCYjzY6a6kA7TTtHNda0QfU-sqpXz2GVpcE653MlT3kFuO_FyuPOfduLJf8Q4-YXUKpeoCIeNwbpiZ2M7eoEjP3SAGAq7IltS7f4JNEPF1e6iO0McNU4hYeOFOgKZHfZeVzZodqmPcmvhe",
    },
  ];

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(to bottom right, #eff6ff, #ffffff, #e0f2fe)",
        fontFamily: "Public Sans, Noto Sans, sans-serif",
      }}
    >
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={scrolled ? 2 : 0}
        sx={{
          background: scrolled ? "rgba(255, 255, 255, 0.8)" : "transparent",
          backdropFilter: "blur(10px)",
          transition: (theme) =>
            theme.transitions.create(["background-color", "box-shadow"]),
          borderBottom: scrolled ? "1px solid #e0e0e0" : "none",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 5 } }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "primary.main",
              }}
            >
              <House className="size-6" />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                PropertyPro
              </Typography>
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button variant="text" onClick={() => smoothScroll("features")}>
                Features
              </Button>
              <Button
                variant="text"
                onClick={() => smoothScroll("testimonials")}
              >
                Testimonials
              </Button>
              {user ? (
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()}
                </Avatar>
              ) : (
                <Button variant="outlined" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
            </Box>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Container
          maxWidth="md"
          sx={{ textAlign: "center", py: { xs: 8, md: 16 } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card elevation={0} sx={{ p: 4, background: "transparent" }}>
              <Chip
                label="Elevate Your Property Management"
                color="primary"
                variant="outlined"
                sx={{ mb: 3 }}
              />
              <Typography
                variant="h2"
                component="h1"
                sx={{ fontWeight: 800, color: "primary.darker", mb: 2 }}
              >
                Simplify Property Management
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: "600px", mx: "auto", mb: 4 }}
              >
                Manage your properties, leases, payments, and maintenance
                requests all in one place. Streamline your workflow and maximize
                your returns with PropertyPro.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/dashboard")}
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: "999px",
                  fontWeight: "bold",
                }}
              >
                Get Started
              </Button>
            </Card>
          </motion.div>
        </Container>

        {/* Features Section */}
        <Box id="features" sx={{ py: 8, bgcolor: "rgba(255,255,255,0.5)" }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.darker",
                mb: 2,
              }}
            >
              Key Features
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ textAlign: "center", maxWidth: "600px", mx: "auto", mb: 6 }}
            >
              PropertyPro offers a comprehensive suite of tools to streamline
              your property management tasks.
            </Typography>
            <Grid container spacing={4}>
              {/* Feature Cards - Mapped for cleaner code */}
              {[
                {
                  icon: <HomeWorkIcon color="primary" sx={{ fontSize: 40 }} />,
                  title: "Property Management",
                  desc: "Efficiently manage all your properties from a single dashboard.",
                },
                {
                  icon: (
                    <DescriptionIcon color="primary" sx={{ fontSize: 40 }} />
                  ),
                  title: "Lease Management",
                  desc: "Easily create, manage, and track leases with automated reminders.",
                },
                {
                  icon: <PaymentIcon color="primary" sx={{ fontSize: 40 }} />,
                  title: "Payment Processing",
                  desc: "Securely process rent payments and track payment history.",
                },
                {
                  icon: <BuildIcon color="primary" sx={{ fontSize: 40 }} />,
                  title: "Maintenance Tracking",
                  desc: "Track and manage maintenance requests with real-time updates.",
                },
              ].map((item, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Card
                    elevation={2}
                    sx={{
                      p: 3,
                      textAlign: "center",
                      height: "100%",
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{item.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
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

        {/* Testimonials Section */}
        <Box id="testimonials" sx={{ py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "primary.darker",
                mb: 6,
              }}
            >
              Loved by Landlords Everywhere
            </Typography>
            <Grid container spacing={3}>
              {testimonials.map((t, index) => (
                // The `item` prop is removed. `xs` and `md` work as intended.
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Card elevation={2} sx={{ height: "100%", borderRadius: 2 }}>
                    <CardHeader
                      avatar={<Avatar src={t.avatar} alt={t.name} />}
                      title={t.name}
                      subheader={t.date}
                    />
                    <CardContent>
                      <Box sx={{ display: "flex", mb: 1, color: "#ffb400" }}>
                        {[...Array(t.rating)].map((_, i) => (
                          <StarIcon key={i} fontSize="small" />
                        ))}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        &quot;{t.text}&quot;
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ mt: "auto", py: 4, px: 2 }}>
        <Divider sx={{ mb: 4 }} />
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            <Link href="#" color="text.secondary" underline="hover">
              Contact Us
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" underline="hover">
              Terms of Service
            </Link>
          </Box>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <IconButton href="#" aria-label="Twitter">
              <TwitterIcon color="primary" />
            </IconButton>
            <IconButton href="#" aria-label="Facebook">
              <FacebookIcon color="primary" />
            </IconButton>
            <IconButton href="#" aria-label="Instagram">
              <InstagramIcon sx={{ color: "#E1306C" }} />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} PropertyPro. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
