import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple, Facebook } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background flex-col">
      {/* Organization Info/Logo */}
      <div
        className="mb-8 flex flex-col items-center cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        <div className="h-14 w-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <span className="text-primary-foreground font-extrabold text-2xl">
            P
          </span>
        </div>
        <span className="mt-2 font-bold text-xl text-primary">PropertyPro</span>
        <span className="text-muted-foreground text-sm">
          Premium Property Management
        </span>
      </div>
      {/* Card Layout */}
      <Card className="w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl p-0 shadow-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Left side: illustration or info */}
          <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-l-xl p-10 w-1/2">
            <img
              src="/placeholder.svg"
              alt="PropertyPro"
              className="h-24 mb-4"
            />
            <h2 className="font-bold text-2xl text-blue-900 mb-2">
              Welcome to PropertyPro
            </h2>
            <p className="text-muted-foreground text-center">
              Your all-in-one solution for managing properties, leases,
              payments, and maintenance.
            </p>
          </div>
          {/* Right side: form and social login */}
          <div className="flex-1 p-8">
            {children}
            <div className="my-6 flex items-center gap-2">
              <span className="flex-1 h-px bg-muted" />
              <span className="text-xs text-muted-foreground">
                or continue with
              </span>
              <span className="flex-1 h-px bg-muted" />
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                type="button"
                className="flex items-center gap-2"
                onClick={() => alert("Google login coming soon!")}
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-5 w-5"
                />{" "}
                Google
              </Button>
              <Button
                variant="outline"
                type="button"
                className="flex items-center gap-2"
                onClick={() => alert("Apple login coming soon!")}
              >
                <Apple className="h-5 w-5" /> Apple
              </Button>
              <Button
                variant="outline"
                type="button"
                className="flex items-center gap-2"
                onClick={() => alert("Facebook login coming soon!")}
              >
                <Facebook className="h-5 w-5 text-[#1877f3]" /> Facebook
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
