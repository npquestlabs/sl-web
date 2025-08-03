import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import ArticleIcon from '@mui/icons-material/Article';
import PaymentIcon from '@mui/icons-material/Payment';
import ConstructionIcon from '@mui/icons-material/Construction';
import HandymanIcon from '@mui/icons-material/Handyman';
import HouseIcon from '@mui/icons-material/House';

import { NavLink } from 'react-router';

export const navConfig = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: <DashboardIcon />,
    end: true,
  },
  {
    label: 'Properties',
    to: '/dashboard/properties',
    icon: <BusinessIcon />,
  },
  {
    label: 'Leases',
    to: '/dashboard/leases',
    icon: <ArticleIcon />,
  },
  {
    label: 'Payments',
    to: '/dashboard/payments',
    icon: <PaymentIcon />,
  },
  {
    label: 'Maintenance',
    to: '/dashboard/maintenance',
    icon: <ConstructionIcon />,
  },
  {
    label: 'Vendors',
    to: '/dashboard/vendors',
    icon: <HandymanIcon />,
  },
];

interface SidebarProps {
  drawerWidth: number;
  isCollapsed: boolean;
}

export function Sidebar({ drawerWidth, isCollapsed }: SidebarProps) {
  const theme = useTheme();

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* === Header of Sidebar === */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '64px',
          p: 2,
        }}
      >
        <HouseIcon
          sx={{ mr: isCollapsed ? 0 : 1.5, transition: 'margin 0.2s' }}
        />
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 'bold',
            opacity: isCollapsed ? 0 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          PropertyPro
        </Typography>
      </Box>

      {/* === Navigation List === */}
      <List sx={{ px: isCollapsed ? 1 : 2 }}>
        {navConfig.map((item) => (
          <Tooltip
            key={item.label}
            title={isCollapsed ? item.label : ''}
            placement="right"
          >
            <ListItemButton
              component={NavLink}
              to={item.to}
              end={item.end}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                justifyContent: isCollapsed ? 'center' : 'initial',
                // Active link styles
                '&.active': {
                  backgroundColor: theme.palette.action.selected,
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isCollapsed ? 0 : 3,
                  justifyContent: 'center',
                  color: 'text.secondary', // Default icon color
                  transition: 'margin 0.2s',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  opacity: isCollapsed ? 0 : 1,
                  transition: 'opacity 0.2s',
                  '& .MuiTypography-root': {
                    fontWeight: 'inherit',
                  },
                }}
              />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: { sm: `1px solid ${theme.palette.divider}` },
          // Smooth transition for the width property
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden', // Prevent horizontal scrollbar during transition
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
