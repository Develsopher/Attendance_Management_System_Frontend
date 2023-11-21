// material-ui
import { Box, Grid } from '@mui/material';

// project import
import AuthCard from './AuthCard';
// import Logo from 'components/Logo';

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh' }}>
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh',
      }}
    >
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        {/* <Logo /> */}
        <h1>구름</h1>
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' },
          }}
        >
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default AuthWrapper;
