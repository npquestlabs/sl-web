import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Tooltip,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material';

import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppLogo from '@repo/ui/components/logo'

import { NavLink, useNavigate } from 'react-router';
import { getCurrentUser, useAuthStore } from '~/store/auth';

const navigation = [
  { to: '/dashboard', label: 'Dashboard', end: true },
  { to: '/dashboard/properties', label: 'Properties' },
  { to: '/dashboard/leases', label: 'Leases' },
  { to: '/dashboard/payments', label: 'Payments' },
  { to: '/dashboard/maintenance', label: 'Maintenance' },
];

export function Header({ user }: { user: ReturnType<typeof getCurrentUser> }) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 'bold',
              a: { textDecoration: 'none', color: 'inherit' },
            }}
          >
            <NavLink to="/">
              <AppLogo
                  color1={theme.palette.background.default}
                  color2={theme.palette.primary.main}
                  size={48}
                />
            </NavLink>
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {navigation.map((item) => (
              <Button
                key={item.to}
                component={NavLink}
                to={item.to}
                end={item.end}
                sx={{
                  color: 'text.primary',
                  '&.active': {
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    textUnderlineOffset: '6px',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
          <Tooltip title="Notifications">
            <IconButton sx={{ color: 'text.secondary' }}>
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Button
            onClick={handleMenuOpen}
            startIcon={
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
              >{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</Avatar>
            }
            endIcon={<KeyboardArrowDownIcon />}
            sx={{ color: 'text.primary', display: { xs: 'none', sm: 'flex' } }}
          >
            {`${user.firstName} ${user.lastName}`}
          </Button>
          <IconButton
            onClick={handleMenuOpen}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <Avatar
              sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
            >{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <MenuItem
              component={NavLink}
              to="/dashboard/profile"
              onClick={handleMenuClose}
            >
              <AccountCircleIcon sx={{ mr: 1.5 }} /> Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <LogoutIcon sx={{ mr: 1.5 }} /> Logout
            </MenuItem>
          </Menu>

          <IconButton
            onClick={() => setMobileMenuOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>

        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              <ListItem>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  PropertyPro
                </Typography>
              </ListItem>
              <Divider />
              {navigation.map((item) => (
                <ListItem key={item.to} disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={item.to}
                    end={item.end}
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{
                      '&.active': {
                        backgroundColor: 'action.selected',
                        fontWeight: 'fontWeightBold',
                      },
                    }}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
