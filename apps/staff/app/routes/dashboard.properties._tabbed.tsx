import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { NavLink, Outlet, useLocation } from 'react-router';

/**
 * A pathless layout route that provides the tabbed navigation for the
 * properties section. It renders "Complexes" and "Units" tabs and an
 * Outlet for the active tab's content.
 */
export default function PropertiesTabLayout() {
  const location = useLocation();

  return (
    <Box sx={{ width: '100%' }}>
      {/*
        The Tabs component from Material-UI. We synchronize it with the router's
        current location. The `value` of the Tabs component is set to the current
        URL pathname, which ensures the correct tab is highlighted on initial
        render and on navigation.
      */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={location.pathname}>
          <Tab
            label="Complexes"
            value="/dashboard/properties/complexes"
            // Use NavLink for routing, allowing for active styles and proper navigation
            component={NavLink}
            to="/dashboard/properties/complexes"
          />
          <Tab
            label="Units"
            value="/dashboard/properties/units"
            component={NavLink}
            to="/dashboard/properties/units"
          />
        </Tabs>
      </Box>

      {/*
        The content panel for the tabs. The <Outlet> will render the
        component for the currently active child route, either
        `complexes.tsx` or `units.tsx`.
      */}
      <Box sx={{ pt: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}