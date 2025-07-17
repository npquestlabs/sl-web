import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const { user, reload } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);

  // Fix animation scroll bug: always scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Listen for scroll to toggle header background/border
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!user) {
      reload();
    }
  }, [reload, user]);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100"
      style={{ fontFamily: "Public Sans, Noto Sans, sans-serif" }}
    >
      <div className="flex h-full grow flex-col">
        {/* Sticky Header, transparent at top, bg+border on scroll */}
        <header
          className={`sticky top-0 z-30 flex items-center justify-between px-10 py-3 backdrop-blur-md transition-all duration-300
            ${scrolled ? "bg-gradient-to-br from-blue-50 via-white to-blue-100 border-b border-border shadow-sm" : "bg-transparent border-none shadow-none"}`}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-4 text-foreground"
          >
            <div className="size-6">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold leading-tight tracking-[-0.015em] text-foreground">
              PropertyPro
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-1 justify-end gap-8"
          >
            <div className="flex items-center gap-9">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  window.scrollTo({ top: 800, behavior: "smooth" })
                }
              >
                Features
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  window.scrollTo({ top: 1200, behavior: "smooth" })
                }
              >
                Pricing
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  window.scrollTo({ top: 1600, behavior: "smooth" })
                }
              >
                Support
              </Button>
            </div>
            {user ? (
              <Avatar>
                <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlVs89AdXKZBVayAs7YyxkjI0KiRiEz8Mt4in9CHsU1Hp8kdbqQ7jN_GZtF6RVZqbensDfqRNTTociCEAHAZPqnChj0-C95s8dP2gsPgid_HRnGvgyWuIXZ1e-6esf_RLxZe-kb1LS-ZQxdj2UK9inS8hsdCF_oqJh0OJxiZBx8ariyes5dJPGPozM94LaLNAuQvJPaqS_N_VhApKgYmKkCd0iTeslMH5bEkh1-SR2WW6DPBSYy1pmTtNYyGm4HmOtZRNPkCdeQUri" />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </motion.div>
        </header>
        {/* Hero Section with animation and taller height */}
        <section className="flex flex-col items-center justify-center px-4 py-28 md:py-40 bg-gradient-to-br from-blue-50 via-white to-blue-100">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-3xl"
          >
            <Card className="w-full bg-gradient-to-br from-white via-blue-50 to-white shadow-2xl">
              <CardHeader className="pb-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <Badge className="mb-2" variant="secondary">
                    Elevate Your Property Management
                  </Badge>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  <CardTitle className="text-4xl md:text-5xl font-extrabold text-center text-blue-900">
                    Simplify Property Management
                  </CardTitle>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <CardDescription className="text-center text-lg text-muted-foreground">
                    Manage your properties, leases, payments, and maintenance
                    requests all in one place. Streamline your workflow and
                    maximize your returns with PropertyPro.
                  </CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent className="flex justify-center pt-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4"
                    onClick={() => navigate("/dashboard")}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
        {/* Features Section */}
        <section
          className="flex flex-col items-center px-4 py-16"
          id="features"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-900">
            Key Features
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl">
            PropertyPro offers a comprehensive suite of tools to streamline your
            property management tasks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <span className="text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
                  </svg>
                </span>
                <CardTitle className="text-lg">Property Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Efficiently manage all your properties from a single
                  dashboard.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <span className="text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
                  </svg>
                </span>
                <CardTitle className="text-lg">Lease Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Easily create, manage, and track leases with automated
                  reminders.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <span className="text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M152,120H136V56h8a32,32,0,0,1,32,32,8,8,0,0,0,16,0,48.05,48.05,0,0,0-48-48h-8V24a8,8,0,0,0-16,0V40h-8a48,48,0,0,0,0,96h8v64H104a32,32,0,0,1-32-32,8,8,0,0,0-16,0,48.05,48.05,0,0,0,48,48h16v16a8,8,0,0,0,16,0V216h16a48,48,0,0,0,0-96Zm-40,0a32,32,0,0,1,0-64h8v64Zm40,80H136V136h16a32,32,0,0,1,0,64Z" />
                  </svg>
                </span>
                <CardTitle className="text-lg">Payment Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Securely process rent payments and track payment history.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <span className="text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M226.76,69a8,8,0,0,0-12.84-2.88l-40.3,37.19-17.23-3.7-3.7-17.23,37.19-40.3A8,8,0,0,0,187,29.24,72,72,0,0,0,88,96,72.34,72.34,0,0,0,94,124.94L33.79,177c-.15.12-.29.26-.43.39a32,32,0,0,0,45.26,45.26c.13-.13.27-.28.39-.42L131.06,162A72,72,0,0,0,232,96,71.56,71.56,0,0,0,226.76,69ZM160,152a56.14,56.14,0,0,1-27.07-7,8,8,0,0,0-9.92,1.77L67.11,211.51a16,16,0,0,1-22.62-22.62L109.18,133a8,8,0,0,0,1.77-9.93,56,56,0,0,1,58.36-82.31l-31.2,33.81a8,8,0,0,0-1.94,7.1L141.83,108a8,8,0,0,0,6.14,6.14l26.35,5.66a8,8,0,0,0,7.1-1.94l33.81-31.2A56.06,56.06,0,0,1,160,152Z" />
                  </svg>
                </span>
                <CardTitle className="text-lg">Maintenance Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track and manage maintenance requests with real-time updates.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Testimonials Section */}
        <section
          className="flex flex-col items-center px-4 py-16 bg-white/80"
          id="testimonials"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-900">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Avatar>
                  <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoYG0vUQvpzqnvCh81FRlc__En9nUt6s1WDAfxAN9LpD0YOZYgOJjGsLAVamerbevkTHcvrSN4RZYKeY_7yCNR1ezqs77SM0tF4X9YEhA5xlK3ZNUiKSRYiQS6TN_11wmmr2iFBkfo6ObugBhCf4jo2xSCk2uFiEhIwqtyG_G-h8fxMsoQQEmBh5l1dbPKTXTV8C-TOhOWDzFBRa-mZRICjwMC8Zr8PHE_5-Cp7oKBbnx-WzDKSL6ruKSQ66RYcsxOftS1o5P0Ea4u" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Sophia Carter</p>
                  <p className="text-xs text-muted-foreground">2023-08-15</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < 5 ? "text-yellow-400" : "text-muted-foreground"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <CardDescription>
                  PropertyPro has transformed how I manage my properties. It's
                  intuitive and saves me so much time.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Avatar>
                  <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf0leGagO9m8WdUEKL_yJKDqx1_lZXrPHrP0DmViqhOqCCN9fuFF6Nw-UrBBNbx-d6fJLLoy1reBGSeEvY8NW6kl0jLlPwDxdu4DXXdLk2ZbP5WJhinXuZADV4ROuwIH3DnfJNLOHQrRxZI9h6Ncc_n2gsFHjzDVo7aaikOKhwMOjE_HHt8es2rjIeig8GI8DOtJJ4u1Mes1iV9o9MGmBHVH4tZiaql8bYt2eFslIQwKropg00hGi82Lo1D9JpJAkQMUPfpbKtBXko" />
                  <AvatarFallback>EL</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Ethan Lin</p>
                  <p className="text-xs text-muted-foreground">2023-09-20</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 mb-2">
                  {[...Array(4)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < 4 ? "text-yellow-400" : "text-muted-foreground"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-muted-foreground">★</span>
                </div>
                <CardDescription>
                  The lease management feature is a game-changer. I no longer
                  worry about missing deadlines.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Avatar>
                  <AvatarImage src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfFj2abSzQeMeOQGZLxxl64pwQZCOszmO0KmQa17yHBamfGUaYSEyX3kqF49xX4NFIuECrE30nyDZRzlPfkAM7m9fcoauNlXIbJbq6PPG_LikFmEE4IHBhmLALRksvr-fCYjzY6a6kA7TTtHNda0QfU-sqpXz2GVpcE653MlT3kFuO_FyuPOfduLJf8Q4-YXUKpeoCIeNwbpiZ2M7eoEjP3SAGAq7IltS7f4JNEPF1e6iO0McNU4hYeOFOgKZHfZeVzZodqmPcmvhe" />
                  <AvatarFallback>OR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Olivia Ramirez</p>
                  <p className="text-xs text-muted-foreground">2023-10-05</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < 5 ? "text-yellow-400" : "text-muted-foreground"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <CardDescription>
                  I love the payment processing system. It's secure and makes
                  rent collection a breeze.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Footer Section */}
        <footer className="flex flex-col items-center px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 mt-10">
          <Separator className="mb-6" />
          <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
            <a
              className="text-muted-foreground text-base font-normal min-w-40"
              href="#"
            >
              Contact Us
            </a>
            <a
              className="text-muted-foreground text-base font-normal min-w-40"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-muted-foreground text-base font-normal min-w-40"
              href="#"
            >
              Terms of Service
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="#" aria-label="Twitter">
              <span className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" />
                </svg>
              </span>
            </a>
            <a href="#" aria-label="Facebook">
              <span className="text-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
                </svg>
              </span>
            </a>
            <a href="#" aria-label="Instagram">
              <span className="text-pink-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                </svg>
              </span>
            </a>
          </div>
          <p className="text-muted-foreground text-base font-normal">
            © 2024 PropertyPro. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
