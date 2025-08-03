import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'sonner';

import { httpService } from '@repo/api/httpService';
import { CreateUnitSchema } from '@repo/utils/schemas';
import type { ListedComplex } from '~/types';
import { UnitType, type Paginated } from '@repo/types';
import { useDebounce } from '@repo/hooks/useDebounce';

const FormUnitSchema = CreateUnitSchema.extend({
  complexId: z.string().min(1, 'You must select a complex.'),
});

type CreateUnitFormInputs = z.infer<typeof FormUnitSchema>;

export const handle = {
  title: 'Create New Unit',
};

export default function CreateUnitPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [complexSearchInput, setComplexSearchInput] = useState('');
  const debouncedComplexSearch = useDebounce(complexSearchInput, 300);

  const { data: complexes, isLoading: isLoadingComplexes } = useQuery<
    ListedComplex[]
  >({
    queryKey: ['complexes', 'search', debouncedComplexSearch],
    queryFn: async () => {
      const res = await httpService.get<Paginated<ListedComplex>>(
        '/complexes',
        {
          params: {
            limit: 10,
            filter: debouncedComplexSearch || undefined,
          },
        },
      );
      if (res.error) throw new Error(res.error);
      return res.data;
    },
    placeholderData: (previousData) => previousData,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUnitFormInputs>({
    resolver: zodResolver(FormUnitSchema),
    defaultValues: {
      complexId: '',
      label: '',
      type: UnitType.APARTMENT,
      description: '',
      notes: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: CreateUnitFormInputs) => {
      const { complexId, ...payload } = formData;
      return httpService.post(`/complexes/${complexId}/units`, payload);
    },
    onSuccess: async () => {
      toast.success('Unit created successfully!');
      await queryClient.invalidateQueries({ queryKey: ['units'] });
      await queryClient.invalidateQueries({ queryKey: ['complexes'] });
      navigate('/dashboard/properties/units');
    },
    onError: (error) => {
      toast.error(`Failed to create unit: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<CreateUnitFormInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name="complexId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                onInputChange={(_event, newValue) => {
                  setComplexSearchInput(newValue);
                }}
                onChange={(_event, newValue) => {
                  field.onChange(newValue ? newValue.id : '');
                }}
                value={complexes?.find((c) => c.id === field.value) || null}
                options={complexes || []}
                loading={isLoadingComplexes}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Complex"
                    required
                    error={!!errors.complexId}
                    helperText={errors.complexId?.message}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingComplexes ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="label"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Unit Label (e.g., Apt 101, Room 3B)"
                fullWidth
                required
                error={!!errors.label}
                helperText={errors.label?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Unit Type" fullWidth>
                {Object.values(UnitType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="rentAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Default Rent Amount"
                type="number"
                fullWidth
                error={!!errors.rentAmount}
                helperText={errors.rentAmount?.message}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === '' ? undefined : Number(e.target.value),
                  )
                }
                // Preserving your correct v7 slotProps syntax
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="rentCurrency"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Currency"
                fullWidth
                error={!!errors.rentCurrency}
                helperText={errors.rentCurrency?.message}
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
                label="Public Description"
                fullWidth
                multiline
                rows={3}
                error={!!errors.description}
                helperText={errors.description?.message}
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
              Create Unit
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}
