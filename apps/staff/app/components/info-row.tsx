import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  CircularProgress,
  IconButton,
  Input,
  Stack,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { toast } from 'sonner';

import { coreService } from '@repo/api/coreService';

interface EditableInfoRowProps {
  label: string;
  value: string | null;
  // The ID of the entity (e.g., complex or unit)
  entityId: string;
  // The field name to be updated in the database
  fieldName: string;
  // The API endpoint path (e.g., '/complexes' or '/units')
  endpoint: string;
  // The query key to invalidate upon successful update
  queryKey: (string | undefined)[];
}

export const EditableInfoRow: React.FC<EditableInfoRowProps> = ({
  label,
  value,
  entityId,
  fieldName,
  endpoint,
  queryKey,
}) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  // Update internal state if the external value prop changes
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const mutation = useMutation({
    mutationFn: (newValue: string | null) => {
      const payload = { [fieldName]: newValue };
      return coreService.patch(`${endpoint}/${entityId}`, payload);
    },
    onSuccess: (result) => {
      if (result.error) {
        toast.error(`Update failed: ${result.error}`);
        // Optionally revert to original value
        setCurrentValue(value);
      } else {
        toast.success(`${label} updated successfully!`);
        // Invalidate the query to refetch fresh data
        queryClient.invalidateQueries({ queryKey });
      }
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(`An error occurred: ${error.message}`);
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    // Only save if the value has changed
    if (currentValue !== value) {
      mutation.mutate(currentValue);
    } else {
      setIsEditing(false);
    }
  };

  return (
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
        {isEditing ? (
          <Input
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
            sx={{
              fontWeight: 500,
              fontSize: '1rem',
              color: 'text.primary',
            }}
          />
        ) : (
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 500 }}
          >
            {value || 'N/A'}
          </Typography>
        )}
      </Box>
      <IconButton
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        size="small"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <CircularProgress size={20} />
        ) : isEditing ? (
          <CheckIcon fontSize="small" />
        ) : (
          <EditIcon fontSize="small" />
        )}
      </IconButton>
    </Stack>
  );
};

export const InfoRow = ({
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
