import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { GraphIcon } from '../icons/graph';
import { FileIcon } from '../icons/file';
import { BatchIcon } from '../icons/batch';
import { AppLogo } from '../icons/app-logo';
import { NavItem } from './nav-item';

const items = [
  {
    href: '/',
    icon: (<GraphIcon fontSize="small" />),
    title: 'Your Profile'
  },
  {
    href: '/preferences',
    icon: (<FileIcon fontSize="small" />),
    title: 'Preferences'
  },
  {
    href: '/staff',
    icon: (<BatchIcon fontSize="small" />),
    title: 'Staff'
  },
  {
    href: '/staff/allotment/',
    icon: (<FileIcon fontSize="small" />),
    title: 'Allotment'
  },
  {
    href: '/404',
    icon: (<BatchIcon fontSize="small" />),
    title: '404 Page'
  },
];

export const AppSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  useEffect(() => {
      if (open) {
        onClose();
      }
    },[router?.asPath]);

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box
            sx={{
              height: '74px',
              px: 3,
              display: 'flex',
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
              "fontWeight": "500"
            }}>Panjab University</h2>
              {/* <AppLogo
                sx={{
                  height: 42,
                  width: 42,
                }}
              /> */}
            </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#EBF0F5',
            mb: 4
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item, key) => (
            <NavItem
              key={key}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        PaperProps={{
          sx: {
            backgroundColor: '#fff',
            color: '#FFFFFF',
            width: 280,
            zIndex: (theme) => theme.zIndex.appBar - 100 
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#fff',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
