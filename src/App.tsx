import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/Dashboard";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import PropertiesLayout from "./pages/properties/PropertiesLayout";
import Properties from "./pages/properties/index";
import ComplexDetails from "./pages/properties/ComplexDetails";
import UnitDetails from "./pages/properties/UnitDetails";
import AddProperty from "./pages/AddProperty";
import Leases from "./pages/Leases";
import Payments from "./pages/Payments";
import Maintenance from "./pages/Maintenance";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Signup from "./pages/auth/Signup";
import ResetPassword from "./pages/auth/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<PropertiesLayout />}>
              <Route index element={<Properties />} />
              <Route path="new" element={<AddProperty />} />
              <Route path=":complexId" element={<ComplexDetails />} />
              <Route
                path=":complexId/units/:unitId"
                element={<UnitDetails />}
              />
            </Route>
            <Route path="leases" element={<Leases />} />
            <Route path="payments" element={<Payments />} />
            <Route path="maintenance" element={<Maintenance />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
