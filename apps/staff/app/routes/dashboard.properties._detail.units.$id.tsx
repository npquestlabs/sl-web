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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { toast } from 'sonner';

import type { DetailedUnit } from '~/types';
import { coreService } from '@repo/api/coreService';
import type { RouteHandle } from './dashboard.properties';
import { EditableInfoRow, InfoRow } from '~/components/info-row';

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const { id } = params;
  if (!id) throw new Response('Not Found', { status: 404 });

  const unit = await coreService.get<DetailedUnit>(`/units/${id}`);
  if (unit.error) {
    toast.error(`Error: ${unit.error}`);
    throw new Response('Not Found', { status: 404 });
  }
  return unit;
}

export const handle: RouteHandle<DetailedUnit> = {
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
  const unitQueryKey = ['unit', id];
  const {
    data: unit,
    isLoading,
    isError,
  } = useQuery<DetailedUnit>({
    queryKey: unitQueryKey,
    queryFn: async () => {
      const res = await coreService.get<DetailedUnit>(`/units/${id}`);
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
        <EditableInfoRow
          label="Label"
          value={unit.label}
          entityId={unit.id}
          fieldName="label"
          endpoint="/units"
          queryKey={unitQueryKey}
        />
        <Divider />
        <EditableInfoRow
          label="Type"
          value={unit.type}
          entityId={unit.id}
          fieldName="type"
          endpoint="/units"
          queryKey={unitQueryKey}
        />
        <Divider />
        <EditableInfoRow
          label="Rent"
          value={unit.rentAmount}
          entityId={unit.id}
          fieldName="rentAmount"
          endpoint="/units"
          queryKey={unitQueryKey}
        />
        <Divider />
        <EditableInfoRow
          label="Description"
          value={unit.description}
          entityId={unit.id}
          fieldName="description"
          endpoint="/units"
          queryKey={unitQueryKey}
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
