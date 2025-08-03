import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useParams,
  useLoaderData,
  NavLink,
  type ClientLoaderFunctionArgs,
} from 'react-router';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'sonner';

import type { DetailedComplex } from '~/types';
import { httpService } from '@repo/api/httpService';
import type { RouteHandle } from './dashboard.properties';

const InfoRow = ({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: React.ReactNode;
  onEdit?: () => void;
}) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ py: 2 }}
  >
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
        {value || 'N/A'}
      </Typography>
    </Box>
    {onEdit && (
      <IconButton onClick={onEdit} size="small">
        <EditIcon fontSize="small" />
      </IconButton>
    )}
  </Stack>
);

// Loader function to fetch data before the component renders
export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const { id } = params;
  if (!id) throw new Response('Not Found', { status: 404 });

  const complex = await httpService.get<DetailedComplex>(`/complexes/${id}`);
  if (complex.error) {
    toast.error(`Error: ${complex.error}`);
    throw new Response('Not Found', { status: 404 });
  }
  return complex;
}

export const handle: RouteHandle<DetailedComplex> = {
  breadcrumb: (match) => [{ title: match.data?.name || 'Complex Details' }],
};

export default function ComplexDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const initialData = useLoaderData<typeof clientLoader>();

  const {
    data: complex,
    isLoading,
    isError,
  } = useQuery<DetailedComplex>({
    queryKey: ['complex', id],
    queryFn: async () => {
      const res = await httpService.get<DetailedComplex>(`/complexes/${id}`);
      if (res.error) throw new Error(res.error);
      return res;
    },
    initialData,
  });

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Skeleton variant="text" width="40%" height={40} />
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="rectangular" height={80} />
      </Stack>
    );
  }

  if (isError || !complex) {
    return (
      <Typography color="error">
        Failed to load complex details. Please try again.
      </Typography>
    );
  }

  return (
    <Stack divider={<Divider />} spacing={4}>
      {/* --- Main Information Section --- */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Complex Information
        </Typography>
        <InfoRow
          label="Name"
          value={complex.name}
          onEdit={() => toast.info('Edit Name clicked')}
        />
        <Divider />
        <InfoRow
          label="Address"
          value={`${complex.address}, ${complex.cityName}, ${complex.countryCode}`}
          onEdit={() => toast.info('Edit Address clicked')}
        />
        <Divider />
        <InfoRow
          label="Description"
          value={complex.description}
          onEdit={() => toast.info('Edit Description clicked')}
        />
        <Divider />
        <InfoRow
          label="Notes"
          value={complex.notes}
          onEdit={() => toast.info('Edit Notes clicked')}
        />
      </Box>

      {/* --- Units Section --- */}
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Units ({complex._count.units})
          </Typography>
          <Button
            component={NavLink}
            to={`/dashboard/properties/units?complex=${complex.id}`}
          >
            View All
          </Button>
        </Stack>
        {complex.units.length > 0 ? (
          <List disablePadding>
            {complex.units.map((unit) => (
              <ListItem key={unit.id} disablePadding>
                <ListItemText primary={unit.label} secondary={unit.type} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">
            No units have been added to this complex yet.
          </Typography>
        )}
      </Box>

      {/* --- Staff Section --- */}
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Assigned Staff ({complex._count.assignments})
          </Typography>
          <Button>Manage Staff</Button>
        </Stack>
        {complex.assignments.length > 0 ? (
          <List disablePadding>
            {complex.assignments.map((assignment) => (
              <ListItem key={assignment.staff.id} disablePadding>
                <ListItemAvatar>
                  <Avatar src={assignment.staff.user.avatarUrl || ''} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${assignment.staff.firstName} ${assignment.staff.lastName}`}
                  secondary={<Chip label={assignment.role} size="small" />}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">
            No staff assigned to this complex yet.
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
