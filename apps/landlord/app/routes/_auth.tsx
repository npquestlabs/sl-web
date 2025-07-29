import { Outlet, useNavigate } from "react-router";
import { Card, Button, Typography, useTheme } from "@mui/material";

export default function AuthLayout() {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    // NEW: Added horizontal padding for mobile and a subtle background color
    <div className="flex min-h-screen items-center justify-center p-4" style={{ backgroundColor: theme.palette.background.default }}>
      {/* Card now has a cleaner shadow and overflow-hidden to contain the image */}
      <Card className="w-full max-w-4xl shadow-xl rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* --- LEFT SIDE: THE VISUAL WELCOME --- */}
          {/* NEW: Replaced gradient with a full-bleed background image for a premium feel */}
          <div
            className="hidden md:flex flex-col justify-end text-white p-10 w-1/2 bg-cover bg-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2400)" }}
          >
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              Welcome to PropertyPro
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
              Your all-in-one solution for modern property management.
            </Typography>
          </div>

          {/* --- RIGHT SIDE: THE INTERACTION PANEL --- */}
          <div className="flex flex-col p-8 md:p-10 flex-1">

            {/* NEW: Logo and Org Info moved INSIDE the card for a unified look */}
            <div
              className="flex flex-col items-center cursor-pointer select-none mb-6"
              onClick={() => navigate("/")}
            >
              <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center shadow-md mb-2">
                <span className="text-primary-foreground font-extrabold text-3xl">P</span>
              </div>
              <span className="font-bold text-2xl text-primary">PropertyPro</span>
            </div>

            {/* --- Social Logins --- */}
            {/* UX REORDER: Social logins are now the FIRST option for the user */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                fullWidth // Easy to tap on mobile
                variant="outlined"
                startIcon={<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />}
                onClick={() => alert("Google login coming soon!")}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<img src="https://www.svgrepo.com/show/503173/apple-logo.svg" alt="Apple" className="h-5 w-5" />}
                onClick={() => alert("Apple login coming soon!")}
              >
                Apple
              </Button>
            </div>

            {/* --- Divider --- */}
            <div className="my-6 flex items-center gap-3">
              <span className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-muted-foreground">
                OR
              </span>
              <span className="flex-1 h-px bg-slate-200" />
            </div>

            {/* --- Main Form (Login, Signup, etc.) --- */}
            {/* The Outlet now renders below the primary login options */}
            <Outlet />

          </div>
        </div>
      </Card>
    </div>
  );
}