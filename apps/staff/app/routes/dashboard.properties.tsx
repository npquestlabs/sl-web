import React from 'react';
import {
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import { NavLink, Outlet, useMatches, type UIMatch } from 'react-router';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface CrumbData {
  title: string;
  to?: string;
}

export interface RouteHandle {
  breadcrumb?: (match: UIMatch<unknown, unknown>) => CrumbData[];
}

export const handle: RouteHandle = {
  breadcrumb: () => [
    {
      title: 'Properties',
      to: '/dashboard/properties/complexes',
    },
  ],
};

export default function PropertiesLayout() {
  const matches = useMatches() as UIMatch<unknown, RouteHandle>[];

  const crumbsData = matches
    .filter((match) => Boolean(match.handle?.breadcrumb))
    .flatMap((match) => match.handle!.breadcrumb!(match));

  const crumbs = crumbsData.map((crumb, index) => {
    const isLast = index === crumbsData.length - 1;

    if (isLast || !crumb.to) {
      return (
        <Typography key={index} color="text.primary" sx={{ fontWeight: 500 }}>
          {crumb.title}
        </Typography>
      );
    } else {
      return (
        <MuiLink
          key={index}
          component={NavLink}
          to={crumb.to}
          underline="hover"
          color="text.secondary"
        >
          {crumb.title}
        </MuiLink>
      );
    }
  });

  return (
    <Stack sx={{ height: '100%' }} gap={3}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {crumbs}
      </Breadcrumbs>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: 0,
          overflowY: 'auto',
          paddingBottom: 2,
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
}
