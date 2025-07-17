import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/layout/Auth";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { httpService } from "@/api/httpService";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuthStore } from "@/store/auth";
import { User } from "@/types";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = {
      firstName,
      lastName,
      email,
      password,
      landlord: {},
    };
      const result = await httpService.registerStageOne({ email, user });
      if (result.error) {
        throw new Error(result.error);
      }
      toast.success(result.message || "Verification code sent to your email.");
      setStage("otp");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
    }
    setLoading(false);
  };

  // Stage 2: submit OTP and full user data
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = {
      firstName,
      lastName,
      email,
      password,
      landlord: {},
    };
    try {
      const result = await httpService.registerStageTwo({ otp, user });
      if (result.error) {
        throw new Error(result.error);
      }
      toast.success("Account created!");
      setUser(new User(result.user));
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Verification failed");
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      {stage === "form" ? (
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl mb-2 text-center">Sign Up</h2>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Sign Up"}
          </Button>
          <div className="flex justify-center items-center text-sm mt-2 gap-2">
            <span className="text-muted-foreground">
              Already have an account?
            </span>
            <Button
              variant="link"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl mb-2 text-center">Enter Verification Code</h2>
          <InputOTP maxLength={6} pattern="^\d+$" value={otp} onChange={(val) => setOtp(val)} className="w-full">
            <InputOTPGroup className="flex w-full justify-evenly">
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot key={index} index={index} className="border-2" />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
            {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Verify & Create Account"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
