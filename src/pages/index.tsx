import * as React from 'react';
import type { GetServerSideProps } from 'next'
import { Grid } from '@mui/material';
import GraphSection from '@/components/Dashboard/GraphSection';
import TopTrendingSection from '@/components/Dashboard/TopTrendingSection';
import ListTable from '@/components/Dashboard/ListTable';
import Layout from '@/components/Layout';
import { NEXT_PUBLIC_APP_URL } from '@/utils/config';
import { useToast } from '@/components/ToastContext';

interface Props {
    content1?: Object;
    error?: string;
}

export default function Dashboard(props: Props) {
    const { showError } = useToast();

    if(props.error){
        showError(props.error); 
    }
    return (
        <Layout>
            <Grid container spacing={2} sx={{
                padding: '20px',
                flexGrow: 1
            }}>
                <Grid item xs={12} sm={12} md={6}>
                    <GraphSection content={props.content1} />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <TopTrendingSection />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <ListTable />
                </Grid>
            </Grid>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    try {

        // Get bitcoin price and volume information 
        const result = await fetch(`${NEXT_PUBLIC_APP_URL}/api/price`);
        const content1 = await result.json();
        
        if (!result.ok) {
            throw new Error('Failed to fetch data');
        }

        // Return data as props
        return {
            props: {
                content1
            },
        };
    } catch (error) {
        return {
            props: {
                error: 'Failed to fetch data',
            },
        };
    }
};