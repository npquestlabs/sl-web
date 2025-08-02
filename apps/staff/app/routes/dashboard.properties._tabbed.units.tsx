import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  Card,
  Chip,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'sonner';

import type { ListedUnit } from '~/types';
import { httpService } from '@repo/api/httpService';

// Define the shape of the API response, including pagination metadata
interface PaginatedUnitsResponse {
  data: ListedUnit[];
  total: number;
  page: number;
  limit: number;
}

// Custom hook for debouncing a value
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default function UnitsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Component state for the search input field
  const [filterInput, setFilterInput] = useState(
    () => searchParams.get('filter') || '',
  );

  // Debounce the search input to avoid rapid API calls
  const debouncedFilter = useDebounce(filterInput, 300);

  // Pagination and filter state derived from URL search parameters
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // Update URL when debounced filter changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (debouncedFilter) {
      newSearchParams.set('filter', debouncedFilter);
    } else {
      newSearchParams.delete('filter');
    }
    // Reset to first page when filter changes
    newSearchParams.set('page', '1');
    setSearchParams(newSearchParams, { replace: true });
  }, [debouncedFilter, setSearchParams]);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      filter: searchParams.get('filter') || undefined,
    }),
    [page, limit, searchParams],
  );

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<PaginatedUnitsResponse>({
    queryKey: ['units', queryParams],
    queryFn: async () => {
      const result = await httpService.get<PaginatedUnitsResponse>('/units', {
        params: queryParams,
      });
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
  });

  if (isError) {
    toast.error(`Failed to fetch units: ${error.message}`);
  }

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setSearchParams(
      (prev) => {
        prev.set('page', (newPage + 1).toString());
        return prev;
      },
      { replace: true },
    );
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchParams(
      (prev) => {
        prev.set('limit', event.target.value);
        prev.set('page', '1'); // Reset to first page
        return prev;
      },
      { replace: true },
    );
  };

  // --- Action Menu State ---
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<null | string>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    unitId: string,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedUnitId(unitId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUnitId(null);
  };

  const getLeaseStatusChip = (status: ListedUnit['leaseStatus']) => {
    switch (status) {
      case 'ACTIVE':
        return <Chip label="Active" color="success" size="small" />;
      case 'EXPIRED':
        return <Chip label="Expired" color="default" size="small" />;
      case 'PENDING':
        return <Chip label="Pending" color="warning" size="small" />;
      case 'TERMINATED':
        return <Chip label="Terminated" color="error" size="small" />;
      default:
        return <Chip label="Vacant" variant="outlined" size="small" />;
    }
  };

  return (
    <Card>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <TextField
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          placeholder="Search by label, type, or complex..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '100%', sm: '320px' } }}
        />
        <Button variant="contained">Add Unit</Button>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Unit Label</TableCell>
              <TableCell>Complex</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Rent</TableCell>
              <TableCell>Lease Status</TableCell>
              <TableCell align="center">Maintenance</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              // Skeleton loaders
              Array.from(new Array(limit)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={7}>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                  </TableCell>
                </TableRow>
              ))
            ) : isError ? (
              // Error state
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="error">
                    Error loading units. Please try again later.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : response?.data.length === 0 ? (
              // Empty state
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography color="text.secondary">
                    No units found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              // Data rows
              response?.data.map((unit) => (
                <TableRow hover key={unit.id}>
                  <TableCell>
                    <Typography
                      component={NavLink}
                      to={`/dashboard/properties/units/${unit.id}`}
                      variant="subtitle2"
                      sx={{
                        color: 'text.primary',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {unit.label}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      component={NavLink}
                      to={`/dashboard/properties/complexes/${unit.complex.id}`}
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      {unit.complex.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{unit.type || 'N/A'}</TableCell>
                  <TableCell>
                    {unit.rentAmount
                      ? `${unit.rentCurrency} ${Number(
                          unit.rentAmount,
                        ).toLocaleString()}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{getLeaseStatusChip(unit.leaseStatus)}</TableCell>
                  <TableCell align="center">
                    {unit._count.maintenanceRequests > 0 ? (
                      <Chip
                        label={unit._count.maintenanceRequests}
                        color="warning"
                        size="small"
                      />
                    ) : (
                      '0'
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, unit.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          component={NavLink}
          to={`/dashboard/properties/units/${selectedUnitId}`}
          onClick={handleMenuClose}
        >
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit Unit</MenuItem>
      </Menu>

      <TablePagination
        component="div"
        count={response?.total ?? 0}
        page={page - 1} // MUI TablePagination is 0-indexed
        onPageChange={handlePageChange}
        rowsPerPage={limit}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
