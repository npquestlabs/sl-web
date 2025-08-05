import React from 'react';
import { useNavigate } from 'react-router';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Box, Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'sonner';

import { coreService } from '@repo/api/coreService';
import { CreateComplexSchema } from '@repo/utils/schemas';

type CreateComplexInputs = z.infer<typeof CreateComplexSchema>;

export const handle = {
  title: 'Create New Complex',
};

export default function CreateComplexPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateComplexInputs>({
    resolver: zodResolver(CreateComplexSchema),
    defaultValues: {
      name: '',
      description: '',
      cityName: '',
      countryCode: '',
      address: '',
      notes: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (data: CreateComplexInputs) => {
      return coreService.post('/complexes', data);
    },
    onSuccess: async () => {
      toast.success('Complex created successfully!');
      // Invalidate the query for the complexes list to refetch fresh data
      await queryClient.invalidateQueries({ queryKey: ['complexes'] });
      navigate('/dashboard/properties/complexes', { replace: true });
    },
    onError: (error) => {
      toast.error(`Failed to create complex: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<CreateComplexInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Complex Name"
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="countryCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country Code"
                fullWidth
                required
                error={!!errors.countryCode}
                helperText={errors.countryCode?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="cityName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City Name"
                fullWidth
                required
                error={!!errors.cityName}
                helperText={errors.cityName?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address / Street"
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Internal Notes"
                fullWidth
                multiline
                rows={2}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting || mutation.status === 'pending'}
            >
              Create Complex
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
