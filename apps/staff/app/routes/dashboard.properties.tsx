import React from 'react';
import {
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import {
  NavLink,
  Outlet,
  useMatches,
  type UIMatch,
} from 'react-router';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface RouteHandle {
  breadcrumb?: (match: UIMatch<unknown, RouteHandle>) => React.ReactNode;
}

export const handle: RouteHandle = {
  breadcrumb: () => 'Properties',
};

export default function PropertiesLayout() {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];

  const crumbs = matches
    // 1. Filter out routes that don't have a `breadcrumb` function in their handle.
    .filter((match) => Boolean(match.handle?.breadcrumb))
    // 2. Map over the remaining routes to create the breadcrumb components.
    .map((match, index, { length }) => {
      const isLast = index === length - 1;
      const crumbContent = match.handle!.breadcrumb!(match);

      if (isLast) {
        // The last crumb is the current page, so we render it as plain text.
        return (
          <Typography key={match.id} color="text.primary" sx={{fontWeight: 500}}>
            {crumbContent}
          </Typography>
        );
      } else {
        // All previous crumbs in the path are rendered as links.
        return (
          <MuiLink
            key={match.id}
            component={NavLink}
            to={match.pathname}
            underline="hover"
            color="text.secondary"
            sx={{
                '&:hover': {
                    color: 'primary.main'
                }
            }}
          >
            {crumbContent}
          </MuiLink>
        );
      }
    });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 3, // Creates space between breadcrumbs and the main content
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {/* A static "home" breadcrumb pointing to the main dashboard */}
        <MuiLink
          component={NavLink}
          to="/dashboard"
          underline="hover"
          color="text.secondary"
          sx={{
             display: 'flex',
             alignItems: 'center',
             '&:hover': {
                color: 'primary.main'
             }
          }}
        >
          Dashboard
        </MuiLink>
        {crumbs}
      </Breadcrumbs>

      {/* The <Outlet> is the placeholder where child routes will be rendered */}
      <Box component="div" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}