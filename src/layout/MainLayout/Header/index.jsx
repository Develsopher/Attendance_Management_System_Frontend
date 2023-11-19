import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';

//project import
import HeaderContent from './HeaderContent';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

function Header() {
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid grey`,
      // boxShadow: theme.customShadows.z1
    },
  };
  return (
    <AppBar {...appBar}>
      <Toolbar>
        <IconButton
          disableRipple
          aria-label="open drawer"
          edge="start"
          color="secondary"
          sx={{
            color: 'text.primary',
            bgcolor: '#fff',
            ml: { xs: 0, lg: -2 },
          }}
        >
          <MenuFoldOutlined />
        </IconButton>
        <HeaderContent />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
