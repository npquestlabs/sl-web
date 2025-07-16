import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/layout/Auth";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";
import { Eye, EyeOff, Loader, Lock, Mail } from "lucide-react";
import { httpService } from "@/api/httpService";
import { User } from "@/types";
import { dummyApi } from "@/api/dummy";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);

    try {
      //const result = await httpService.login(email, password);
      const result = await dummyApi.login(email, password);
      if (result.error) {
        throw new Error(result.error);
      } else {
        setUser(new User(result.user));
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    }

    setLoggingIn(false);
  };

  // Social login handlers (stub)
  const handleSocialLogin = (provider: string) => {
    toast.info(`Login with ${provider} coming soon!`);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl mb-2 text-center">Login</h2>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Mail className="h-4 w-4" />
          </span>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Lock className="h-4 w-4" />
          </span>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <Button type="submit" className="w-full" disabled={loggingIn}>
          {loggingIn ? <Loader className="h-4 w-4 animate-spin" /> : "Login"}
        </Button>
        <div className="flex justify-between text-sm mt-2">
          <Button
            variant="link"
            type="button"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </Button>
          <Button
            variant="link"
            type="button"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
