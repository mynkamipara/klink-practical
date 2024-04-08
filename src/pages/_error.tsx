import React from 'react';
import { NextPage } from 'next';
import { Box, Container, Typography } from '@mui/material';

const ErrorPage: NextPage = () => {
    return (
        <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box textAlign="center">
                <img src="/icons/not-found.avif" alt="Not Found" style={{ maxWidth: '100%', marginBottom: '1rem' }} />
                <Typography variant="h4" gutterBottom>
                    404 - Page Not Found
                </Typography>
                <Typography variant="body1">
                    {`Sorry, the page you're looking for does not exist.`}
                </Typography>
            </Box>
        </Container>
    );
};

export default ErrorPage;
