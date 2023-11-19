import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project-import
import Header from './Header/index.jsx';

function MainLayout() {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header />
      {/* drawer */}
      <Box
        component="main"
        sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
