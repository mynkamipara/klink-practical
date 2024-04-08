import React from 'react';
import { CircularProgress } from '@mui/material';

const BackgroundLoader: React.FC = () => {

    return <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    }}>
        <CircularProgress />
    </div>
};

export default BackgroundLoader;