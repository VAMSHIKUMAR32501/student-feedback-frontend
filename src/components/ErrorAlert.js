import React from 'react';
import { Alert, Box, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';

const ErrorAlert = ({ message }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      p: 3,
    }}
  >
    <Alert
      severity="error"
      action={
        <Button
          color="inherit"
          size="small"
          onClick={() => window.location.reload()}
          startIcon={<Refresh />}
        >
          Retry
        </Button>
      }
      sx={{ mb: 2 }}
    >
      {message}
    </Alert>
  </Box>
);

export default ErrorAlert;
