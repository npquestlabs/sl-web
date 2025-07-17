import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Home, FileText, DollarSign, Wrench } from "lucide-react";
import { ActivityItem, SummaryStats, User } from "@/types";
import { dummyApi } from "@/api/dummy";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, httpService } from "@/api/httpService";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth";

const iconMap = {
  lease_signed: FileText,
  payment_received: DollarSign,
  maintenance_created: Wrench,
  maintenance_completed: Wrench,
};

export default function Dashboard() {
  const { data: stats } = useQuery<SummaryStats | null>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const result = await httpService.get<ApiResponse<SummaryStats>>("/landlords/summary");
      // const result = await dummyApi.getDashboardStats();
      if (result.error) {
        throw new Error(result.error);
      }
      console.log("summary data received", result);
      return result
    },
    initialData: null,
  });
  const { user } = useAuthStore();
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const activityData = await dummyApi.getRecentActivity();
        setActivity(activityData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = stats ? [
    { title: "Total Complexes", value: stats.complexes, icon: Building2 },
    { title: "Total Units", value: stats.units, icon: Home },
    { title: "Active Leases", value: stats.tenants, icon: FileText },
    { title: "Upcoming Payments", value: stats.payments, icon: DollarSign },
    { title: "Pending Maintenance Requests", value: stats.maintenanceRequests, icon: Wrench },
  ] : null;

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.firstName}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {
          statsData ? statsData.map(stat => {
            return <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          }) : [0, 1, 2, 3, 4].map((_, index) => <Skeleton key={index} className="h-36 w-full" />)
        }
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activity.map((item) => {
              const IconComponent = iconMap[item.type];
              return (
                <div key={item.id} className="flex items-start space-x-4">
                  <div className="p-2 bg-muted rounded-full">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(new Date(item.date), "MMM d, h:mm a")}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
