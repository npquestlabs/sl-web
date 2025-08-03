import React from 'react';
import { useNavigate, NavLink, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Paper,
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
import { toast } from 'sonner';

import type { ListedUnit } from '~/types';
import { httpService } from '@repo/api/httpService';
import type { Paginated } from '@repo/types';
import type { RouteHandle } from './dashboard.properties';
import { useDebounce } from '@repo/hooks/useDebounce';
import { parseAsString, parseAsInteger, useQueryState } from '@repo/hooks/useQueryState';

export const handle: RouteHandle = {
  breadcrumb: () => [{ title: 'Units' }],
};

export default function UnitsListPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useQueryState<string | null>('search', parseAsString);
  const debouncedSearch = useDebounce(search, 300);

  const [page, setPage] = useQueryState<number | null>('page', parseAsInteger);
  const debouncedPage = useDebounce(page ?? 1, 300);

  const [limit, setLimit] = useQueryState<number | null>('pageSize', parseAsInteger);
  const debouncedLimit = useDebounce(limit ?? 10, 300);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<Paginated<ListedUnit>>({
    queryKey: ['units', 'list', debouncedSearch, debouncedPage, debouncedLimit],
    queryFn: async () => {
      const result = await httpService.get<Paginated<ListedUnit>>('/units', {
        params: {
          page: debouncedPage,
          limit: debouncedLimit,
          filter: debouncedSearch || undefined,
        },
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
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1);
  };

  const getLeaseStatusChip = (status: ListedUnit['leaseStatus']) => {
    switch (status) {
      case 'ACTIVE':
        return <Chip label="active" color="success" size="small" />;
      case 'EXPIRED':
        return <Chip label="expired" color="default" size="small" />;
      case 'PENDING':
        return <Chip label="pending" color="warning" size="small" />;
      case 'TERMINATED':
        return <Chip label="terminated" color="error" size="small" />;
      default:
        return <Chip label="vacant" variant="outlined" size="small" />;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
        <Button component={Link} variant="contained" to="/dashboard/properties/units/create">
          Add Unit
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading
                ? Array.from(new Array(limit)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell colSpan={6}>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                      </TableCell>
                    </TableRow>
                  ))
                : isError
                ? <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography color="error">
                        Error loading units. Please try again later.
                      </Typography>
                    </TableCell>
                  </TableRow>
                : response?.data.length === 0
                ? <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography color="text.secondary">
                        No units found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                : response?.data.map((unit) => (
                    <TableRow
                      hover
                      key={unit.id}
                      onClick={() =>
                        navigate(`/dashboard/properties/units/${unit.id}`)
                      }
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        <Typography variant="subtitle2" color="text.primary">
                          {unit.label}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          component={NavLink}
                          to={`/dashboard/properties/complexes/${unit.complex.id}`}
                          onClick={(e) => e.stopPropagation()} // Prevent row click
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                          }}
                        >
                          {unit.complex.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>
                        {unit.type || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>
                        {unit.rentAmount
                          ? `${unit.rentCurrency} ${Number(
                              unit.rentAmount,
                            ).toLocaleString()}`
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {getLeaseStatusChip(unit.leaseStatus)}
                      </TableCell>
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
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={response?.meta.total ?? 0}
          page={(page ?? 1) - 1}
          onPageChange={handlePageChange}
          rowsPerPage={limit ?? 10}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
}
