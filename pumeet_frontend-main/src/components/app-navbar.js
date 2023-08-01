import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import { AppLogo } from '../icons/app-logo';
import { AuthLogout } from '../services/authentication';

const AppNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 1px 0rgba(0, 0, 0, 0.08)',
  height: '75px',
  justifyContent: 'center',
  borderBottom: '1px solid #EBF0F5'
}));

export const AppNavbar = (props) => {
  const { onSidebarOpen } = props;

  return (
    <>
      <AppNavbarRoot>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              height: '90px',
              px: 1,
              display: {
                lg: 'flex',
                xs: 'none'
              },
              alignItems: 'center',
          }}>
            <img
              src="/static/images/pu-logo.png"
              width="62"
            />
            <h2 style={{
              "color": "#566474",
              "lineHeight": "30px",
              "fontSize": "22px",
              "paddingLeft": "10px",
              "fontWeight": "300"
            }}>Panjab University</h2>
            {/* <AppLogo
              sx={{
                height: 42,
                width: 42,
              }}
            /> */}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              py: 1,
              mr: 4,
              border: '1px solid #EBF0F5',
              borderRadius: 1,
              display: 'flex',
              cursor: 'pointer'
            }}
            onClick={AuthLogout}
          >
            <Avatar
              sx={{
                height: 26,
                width: 26,
                ml: 1
              }}
              src="/static/images/avatar.svg"
            >
            </Avatar>
            <Box
              sx={{
                color: '#1E272E',
                fontSize: 16,
                px: 2
              }}
            >
              Logout
            </Box>
          </Box>
        </Toolbar>
      </AppNavbarRoot>
    </>
  );
};
