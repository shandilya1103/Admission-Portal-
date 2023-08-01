import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Button, ListItem } from '@mui/material';

export const NavItem = (props) => {
  const { href, icon, title } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
      }}
    >
      <NextLink
        href={href}
        passHref
      >
        <Button
          component="a"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && '#F7F8FA',
            borderRadius: 0,
            color: active ? '#445EE2' : '#566474',
            fontWeight: 500,
            justifyContent: 'flex-start',
            textAlign: 'left',
            textTransform: 'none',
            pl: 6,
            pb: 2,
            width: '100%',
            '& .MuiButton-startIcon svg path': {
              stroke: active ? '#445EE2' : '#566474'
            },
            '&:hover': {
              backgroundColor: '#F7F8FA'
            }
          }}
        >
          <Box sx={{ fontSize: 16 }}>
            {title}
          </Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};
