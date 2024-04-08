import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DashboardBoxItem = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    border: '1px solid #ffffff80',
    borderRadius: '10px',
    display:'flex',
    minHeight:'430px',
    color: 'white',
    "fontFamily": "Inter",
    "fontSize": "14.565px",
    "fontStyle": "normal",
    "lineHeight": "130%",
}));
