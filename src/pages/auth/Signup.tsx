import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/layout/Auth";
import { toast } from "sonner";
import { Loader } from "lucide-react";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Replace with real API call
    if (email && password && firstName) {
      toast.success("Account created!");
      navigate("/dashboard/login");
    } else {
      toast.error("Please fill all fields");
    }
    setLoading(false);
  };

  return (
    <AuthLayout>
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
    </AuthLayout>
  );
}
