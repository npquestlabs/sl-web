import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/layout/Auth";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Replace with real API call
    if (email) {
      toast.success("Password reset link sent!");
      navigate("/dashboard/login");
    } else {
      toast.error("Please enter your email");
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleForgot} className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl mb-2 text-center">Forgot Password</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
        <div className="flex justify-center text-sm mt-2 gap-2">
          <span className="text-muted-foreground">Remembered?</span>
          <Button
            variant="link"
            type="button"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
