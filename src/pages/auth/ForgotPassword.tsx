import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/layout/Auth";
import { toast } from "sonner";
import { Mail, CheckCircle } from "lucide-react"; // Import a success icon
import { httpService } from "@/api/httpService";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // This state is the key to swapping the UI
  const [emailSent, setEmailSent] = useState(false);

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return; // Prevent further execution
    }
    setLoading(true);
    try {
      const result = await httpService.forgotPassword(email);
      if (result.error) {
        throw new Error(result.error);
      }
      toast.success(result.message || "Password reset link sent!");
      // On success, flip the state to true to change the UI
      setEmailSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to send reset link. Please try again.");
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      {/* --- CONDITIONAL RENDERING STARTS HERE --- */}
      {emailSent ? (
        // UI to show AFTER the email has been sent successfully
        <div className="flex flex-col items-center text-center gap-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h2 className="font-bold text-2xl">Check your inbox</h2>
          <p className="text-muted-foreground">
            A password reset link has been sent to{" "}
            <span className="font-semibold text-primary">{email}</span>.
          </p>
          <Button
            type="button"
            className="w-full mt-4"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </div>
      ) : (
        // The initial form UI
        <form onSubmit={handleForgot} className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl mb-2 text-center">Forgot Password</h2>
          <p className="text-center text-sm text-muted-foreground mb-4">
            Enter your email and we'll send you a link to reset your password.
          </p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Mail className="h-4 w-4" />
            </span>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
          <div className="flex justify-center text-sm mt-2 gap-2 items-center">
            <span className="text-muted-foreground">Remembered?</span>
            <Button
              variant="link"
              type="button"
              onClick={() => navigate("/login")}
              className="px-1"
            >
              Login
            </Button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}