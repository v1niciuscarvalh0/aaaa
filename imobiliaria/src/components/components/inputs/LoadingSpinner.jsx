import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export function LoadingSpinner() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
        </Box>
    );
}