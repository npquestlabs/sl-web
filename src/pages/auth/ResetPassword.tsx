import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { ApiResponse, httpService } from "@/api/httpService";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Loader,
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
    XCircle,
    ArrowLeft,
} from "lucide-react";
import { MessageResponse } from "@/types";

type PageState = "verifying" | "form" | "invalid_token" | "success";

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // State Management
    const [pageState, setPageState] = useState<PageState>("verifying");
    const [isResetting, setIsResetting] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("This link is invalid or has expired.");

    // 1. Get the previous URL, default to /dashboard
    const from = location.state?.from?.pathname || "/dashboard";

    // 2 & 3. Read verification query and handle if missing
    useEffect(() => {
        const verificationToken = searchParams.get("verification");

        if (!verificationToken) {
            setPageState("invalid_token");
            return;
        }

        const verifyToken = async () => {
            try {
                // 4. Hit the verification endpoint
                const result = await httpService.post<ApiResponse<MessageResponse>>("/auth/verifications/use", {
                    token: verificationToken,
                });

                if (result.error) {
                    // 5. Handle invalid/expired token
                    setError(result.error); // Set specific error from API
                    throw new Error(result.error);
                }

                // On success, show the form (interceptor handles new tokens)
                setPageState("form");
            } catch (err) {
                setPageState("invalid_token");
            }
        };

        verifyToken();
    }, [searchParams]);

    // Handler for the password reset form
    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        setIsResetting(true);
        try {
            const result = await httpService.post<ApiResponse<MessageResponse>>("/auth/reset-password", {
                password,
            });

            if (result.error) {
                throw new Error(result.error);
            }

            // 6. After successful reset, show success and navigate
            setPageState("success");
            toast.success(result.message || "Password has been reset successfully!");

            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500); // Brief delay to show success message

        } catch (err) {
            // 7. On fail, toast the error
            toast.error(
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred."
            );
            setIsResetting(false);
        }
    };

    const renderContent = () => {
        switch (pageState) {
            case "verifying":
                return (
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                        <Loader className="h-12 w-12 animate-spin text-primary" />
                        <h2 className="font-bold text-xl">Verifying your link...</h2>
                        <p className="text-muted-foreground">Please wait a moment.</p>
                    </div>
                );

            case "invalid_token":
                return (
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                        <XCircle className="h-16 w-16 text-destructive" />
                        <h2 className="font-bold text-2xl">Invalid Link</h2>
                        <p className="text-muted-foreground">{error}</p>
                        <Button
                            type="button"
                            className="w-full mt-4"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Request a New Link
                        </Button>
                    </div>
                );

            case "form":
                return (
                    <form onSubmit={handleResetPassword} className="flex flex-col gap-4 p-8">
                        <h2 className="font-bold text-2xl mb-4 text-center">Reset Your Password</h2>
                        {/* New Password Input */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Lock className="h-4 w-4" />
                            </span>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
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
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {/* Confirm Password Input */}
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Lock className="h-4 w-4" />
                            </span>
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="pl-10 pr-10"
                            />
                        </div>
                        <Button type="submit" className="w-full mt-2" disabled={isResetting}>
                            {isResetting ? <Loader className="h-4 w-4 animate-spin" /> : "Reset Password"}
                        </Button>
                    </form>
                );

            case "success":
                return (
                    <div className="flex flex-col items-center gap-4 p-8 text-center">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                        <h2 className="font-bold text-2xl">Password Reset!</h2>
                        <p className="text-muted-foreground">Redirecting you now...</p>
                    </div>
                );
        }
    };

    // 8 & 9. The new, sleek, self-contained layout
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 flex-col p-4">
            <div
                className="mb-8 flex flex-col items-center cursor-pointer select-none"
                onClick={() => navigate("/")}
            >
                <div className="h-14 w-14 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-primary-foreground font-extrabold text-2xl">P</span>
                </div>
                <span className="mt-2 font-bold text-xl text-primary">PropertyPro</span>
            </div>

            <Card className="w-full max-w-md shadow-xl">
                {renderContent()}
            </Card>

            <Button
                variant="ghost"
                type="button"
                onClick={() => navigate("/dashboard")}
                className="mt-6 flex items-center gap-2 text-muted-foreground"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </Button>
        </div>
    );
}