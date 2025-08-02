import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';

import ApartmentIcon from '@mui/icons-material/Apartment';
import HouseIcon from '@mui/icons-material/House';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';

import { type SummaryStats } from '@repo/types';
import { httpService } from '@repo/api/httpService';
import { getCurrentUser } from '~/store/auth';
import { toast } from 'sonner';
import { useEffect } from 'react';

const iconMap = {
  complexes: ApartmentIcon,
  units: HouseIcon,
  tenants: DescriptionIcon,
  payments: AttachMoneyIcon,
  maintenanceRequests: BuildIcon,
};

export default function DashboardPage() {
  const user = getCurrentUser();
  const {
    data: stats,
    isLoading,
    isError,
    error,
  } = useQuery<SummaryStats>({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const result = await httpService.get<SummaryStats>('/staff/summary');
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  // Prepare data for rendering stat cards
  const statsData = stats
    ? [
        {
          title: 'Total Complexes',
          value: stats.complexes,
          icon: iconMap.complexes,
        },
        { title: 'Total Units', value: stats.units, icon: iconMap.units },
        { title: 'Active Leases', value: stats.tenants, icon: iconMap.tenants },
        {
          title: 'Upcoming Payments',
          value: stats.payments,
          icon: iconMap.payments,
        },
        {
          title: 'Pending Maintenance',
          value: stats.maintenanceRequests,
          icon: iconMap.maintenanceRequests,
        },
      ]
    : null;

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {/* Welcome Section */}
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Welcome back, {user.firstName}
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        {isLoading ? (
          // Render skeleton loaders while data is being fetched
          Array.from(new Array(5)).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={index}>
              <Skeleton
                variant="rectangular"
                height={118}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))
        ) : statsData ? (
          statsData.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={stat.title}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        pb: 1,
                      }}
                    >
                      <Typography
                        color="text.primary"
                        sx={{ fontWeight: 'medium' }}
                      >
                        {stat.title}
                      </Typography>
                      <IconComponent sx={{ color: 'text.secondary' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid size={{ xs: 12 }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary">
                  No data available. Please check back later.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
