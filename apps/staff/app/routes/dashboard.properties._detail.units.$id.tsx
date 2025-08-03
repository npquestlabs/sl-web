import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useParams,
  useLoaderData,
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

import type { DetailedUnit } from '~/types';
import { httpService } from '@repo/api/httpService';
import type { RouteHandle } from './dashboard.properties';

// Reusing the same helper component
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

// Loader to fetch data before rendering
export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const { id } = params;
  if (!id) throw new Response('Not Found', { status: 404 });

  const unit = await httpService.get<DetailedUnit>(`/units/${id}`);
  if (unit.error) {
    toast.error(`Error: ${unit.error}`);
    throw new Response('Not Found', { status: 404 });
  }
  return unit;
}

export const handle: RouteHandle = {
  breadcrumb: (match) => {
    const unit = match.data as DetailedUnit;
    if (!unit) return [{ title: 'Details' }];

    return [
      {
        title: unit.complex.name,
        to: `/dashboard/properties/complexes/${unit.complex.id}`,
      },
      {
        title: unit.label,
      },
    ];
  },
};

export default function UnitDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const initialData = useLoaderData<typeof clientLoader>();

  const {
    data: unit,
    isLoading,
    isError,
  } = useQuery<DetailedUnit>({
    queryKey: ['unit', id],
    queryFn: async () => {
      const res = await httpService.get<DetailedUnit>(`/units/${id}`);
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
      </Stack>
    );
  }

  if (isError || !unit) {
    return (
      <Typography color="error">
        Failed to load unit details. Please try again.
      </Typography>
    );
  }

  return (
    <Stack divider={<Divider />} spacing={4}>
      {/* --- Unit Information Section --- */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Unit Information
        </Typography>
        <InfoRow label="Complex" value={unit.complex.name} />
        <Divider />
        <InfoRow
          label="Unit Label"
          value={unit.label}
          onEdit={() => toast.info('Edit Label clicked')}
        />
        <Divider />
        <InfoRow
          label="Type"
          value={unit.type}
          onEdit={() => toast.info('Edit Type clicked')}
        />
        <Divider />
        <InfoRow
          label="Rent"
          value={
            unit.rentAmount
              ? `${unit.rentCurrency} ${Number(
                  unit.rentAmount,
                ).toLocaleString()}`
              : 'N/A'
          }
          onEdit={() => toast.info('Edit Rent clicked')}
        />
        <Divider />
        <InfoRow
          label="Description"
          value={unit.description}
          onEdit={() => toast.info('Edit Description clicked')}
        />
      </Box>

      {/* --- Active Tenant Section --- */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
          Occupancy
        </Typography>
        {unit.activeLease ? (
          <>
            <InfoRow
              label="Tenant"
              value={`${unit.activeLease.tenant.firstName} ${unit.activeLease.tenant.lastName}`}
            />
            <Divider />
            <InfoRow
              label="Lease End Date"
              value={new Date(unit.activeLease.endsAt).toLocaleDateString()}
            />
            <Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button>View Lease Details</Button>
            </Box>
          </>
        ) : (
          <Box textAlign="center" py={3}>
            <Typography color="text.secondary">
              This unit is currently vacant.
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
              Create New Lease
            </Button>
          </Box>
        )}
      </Box>

      {/* --- Maintenance Section --- */}
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Maintenance Requests
          </Typography>
          <Button>View All</Button>
        </Stack>
        {unit.maintenanceRequests.length > 0 ? (
          <List disablePadding>
            {unit.maintenanceRequests.map((req) => (
              <ListItem key={req.id} disablePadding>
                <ListItemAvatar>
                  <Avatar src={req.creator.avatarUrl || ''} />
                </ListItemAvatar>
                <ListItemText
                  primary={req.description}
                  secondary={
                    <Chip
                      label={req.status}
                      size="small"
                      color={req.status === 'PENDING' ? 'warning' : 'default'}
                    />
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">
            No open maintenance requests.
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
