import React from 'react';
import { Outlet } from 'react-router';
import { Container, Paper } from '@mui/material';

/**
 * A pathless layout route that provides a consistent container for detail pages.
 *
 * This component wraps the individual detail pages (e.g., a specific complex or unit)
 * in a `Paper` component to give them a unified, contained appearance.
 * The actual content, including titles, data, and actions, is rendered by the
 * child route via the `<Outlet />`.
 */

export default function DetailPageLayout() {
  return (
    <Container maxWidth="lg">
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
          borderRadius: 2, // Consistent with other page styles
        }}
      >
        <Outlet />
      </Paper>
    </Container>
  );
}
