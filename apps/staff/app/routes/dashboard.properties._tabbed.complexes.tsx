import React from 'react';
import { useNavigate, Link } from 'react-router';
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

import type { ListedComplex } from '~/types';
import { coreService } from '@repo/api/coreService';
import type { Paginated } from '@repo/types';
import { useDebounce } from '@repo/hooks/useDebounce';
import {
  parseAsString,
  parseAsInteger,
  useQueryState,
} from '@repo/hooks/useQueryState';
import type { RouteHandle } from './dashboard.properties';

// Add the breadcrumb handle for consistency
export const handle: RouteHandle = {
  breadcrumb: () => [{ title: 'Complexes' }],
};

export default function ComplexesListPage() {
  const navigate = useNavigate();

  // --- State Management: Use the new hooks, mirroring the Units file ---
  const [search, setSearch] = useQueryState<string | null>(
    'search',
    parseAsString,
  );
  const debouncedSearch = useDebounce(search, 300);

  const [page, setPage] = useQueryState<number | null>('page', parseAsInteger);
  const debouncedPage = useDebounce(page ?? 1, 300);

  const [limit, setLimit] = useQueryState<number | null>(
    'pageSize',
    parseAsInteger,
  );
  const debouncedLimit = useDebounce(limit ?? 10, 300);

  // --- Data Fetching: Simplified queryKey and queryFn ---
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery<Paginated<ListedComplex>>({
    queryKey: [
      'complexes',
      'list',
      debouncedSearch,
      debouncedPage,
      debouncedLimit,
    ],
    queryFn: async () => {
      const result = await coreService.get<Paginated<ListedComplex>>(
        '/complexes',
        {
          params: {
            page: debouncedPage,
            limit: debouncedLimit,
            filter: debouncedSearch || undefined, // Use filter to match the API
          },
        },
      );
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    },
  });

  if (isError) {
    toast.error(`Failed to fetch complexes: ${error.message}`);
  }

  // --- Event Handlers: Simplified to use state setters directly ---
  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    // Note: The MUI component provides a 0-based index, our hook expects a 1-based page number.
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1); // Reset to the first page when page size changes
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
        {/* --- Toolbar: Bind TextField to the immediate state for responsiveness --- */}
        <TextField
          value={search ?? ''} // Bind to immediate state, use ?? '' for controlled component
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, address, or city..."
          variant="outlined"
          size="small"
          InputProps={{
            // Corrected usage of InputProps
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '100%', sm: '320px' } }}
        />
        <Button
          component={Link}
          variant="contained"
          to="/dashboard/properties/complexes/create"
        >
          Add Complex
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell align="center">Units</TableCell>
                <TableCell align="center">Staff</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                Array.from(new Array(limit ?? 10)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={5}>
                      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    </TableCell>
                  </TableRow>
                ))
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="error">
                      Error loading complexes. Please try again later.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : response?.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="text.secondary">
                      No complexes found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                response?.data.map((complex) => (
                  <TableRow
                    hover
                    key={complex.id}
                    onClick={() =>
                      navigate(`/dashboard/properties/complexes/${complex.id}`)
                    }
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Typography variant="subtitle2" color="text.primary">
                        {complex.name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>
                      {complex.address || 'N/A'}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>
                      {complex.cityName}
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={complex._count.units} size="small" />
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={complex._count.assignments} size="small" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* --- Pagination: Use immediate state and correct page index --- */}
        <TablePagination
          component="div"
          count={response?.meta.total ?? 0}
          page={(page ?? 1) - 1} // Convert 1-based page to 0-based index
          onPageChange={handlePageChange}
          rowsPerPage={limit ?? 10}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
    </Box>
  );
}
