import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingScreen = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress size={60} />
    <Typography variant="h6" sx={{ mt: 2 }}>
      Loading...
    </Typography>
  </Box>
);

export default LoadingScreen;
