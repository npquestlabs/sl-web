import React from 'react';
import { Outlet, useMatches, useNavigate } from 'react-router';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// The handle now also includes an optional title property
export interface FormRouteHandle {
  title?: string;
}

export default function FormLayout() {
  const navigate = useNavigate();
  const matches = useMatches();

  // Find the last match with a 'title' in its handle to display it
  const routeHandle = matches.at(-1)?.handle as FormRouteHandle | undefined;
  const title = routeHandle?.title || 'Create New Entry';

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        {/* Header with Back button and Title */}
        <Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)} // Go back to the previous page
            sx={{ mb: 2 }}
          >
            Back to list
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Box>

        {/* Form content from child routes will render here */}
        <Paper variant="outlined" sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
          <Outlet />
        </Paper>
      </Stack>
    </Container>
  );
}
