import { useAuthStore } from "@/store/auth";
import { Header } from "@/components/Header";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export function DashboardLayout() {
  const { user, reload } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      reload({
        handleError: (error) => {
          setIsLoading(false);
        },
        handleSuccess: () => {
          setIsLoading(false);
        },
      });
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-y-auto px-4 md:px-12 lg:px-24 xl:px-32 mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}