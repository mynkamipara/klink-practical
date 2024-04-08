'use client';
import Image from "next/image";
import { Button, Box, Typography, List, Divider, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import { useEffect, useState } from "react";
import { DashboardBoxItem } from "@/components/Styled/Box";
import { useToast } from "@/components/ToastContext";
import { Loader } from "../Loading";
import { percentageFormat } from "@/utils/common";

interface CoinItemProps {
    data: any;
}

const trendIcon = (usd_24h_change: number) => {
    if (usd_24h_change < 0) {
        return <Image src={'icons/DownTrend.svg'} width={45} height={40} alt={''} />
    } else {
        return <Image src={'icons/UpTrend.svg'} width={45} height={40} alt={''} />
    }
}

const percentageTag = (value: number) => {
    if (value < 0) {
        return (<Typography fontSize={'12px'} color={'#E84142'} justifyContent={'flex-end'} display={'flex'}>
            <span>{percentageFormat(value)}</span>
        </Typography>)
    } else {
        return (<Typography fontSize={'12px'} color={'#31832E'} justifyContent={'flex-end'} display={'flex'}>
            <span>+{percentageFormat(value)}</span>
        </Typography>)
    }
}

const CoinItem = ({ data }: CoinItemProps) => {
    return (
        <>
            <Box sx={{ paddingRight: 1 }}>
                <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box display={'flex'} gap={'10px'}>
                        <Box sx={{
                            "borderRadius": "8px",
                            "border": "1px solid  #313130",
                        }}>
                            {trendIcon(data.usd_24h_change)}
                        </Box>
                        <Box>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={'5px'}>
                                <Typography>{data.name}</Typography>
                                <Image alt={''} src={'icons/Done.svg'} width={18} height={18} />
                            </Box>
                            <Typography fontSize={'14px'} fontWeight={400} color={'#A7A5A3'}>{moment.unix(data.last_updated_at).format('HH:MM')}</Typography>
                        </Box>
                    </Box>
                    <Box mr={2}>
                        <Typography fontSize={'16px'} fontWeight={400} color={'white'} textAlign={'right'} lineHeight={'130%'} fontStyle={'normal'}>{`$${data.usd.toFixed(5)}`}</Typography>
                        {percentageTag(data.usd_24h_change)}
                    </Box>
                </List>
                <Divider sx={{ border: '0.5px solid #313130' }} />
            </Box>
        </>
    )
}

const TopTrendingSection = () => {

    const { showError } = useToast();
    const [trendingCoins, setTrendingCoins] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTopTrendingCoins = async () => {
        setIsLoading(true);
        const result = await fetch('/api/trending');
        const data = await result.json();

        if (data.error) {
            showError(data.error);
            setTrendingCoins([])
        } else {
            setTrendingCoins(data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchTopTrendingCoins();
    }, [])

    return (
        <DashboardBoxItem>
            <Box width={'100%'}>
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography fontWeight={600} fontSize={{ xs: '18px', sm: '18px', md: '24px', lg: '24px' }}>{'Top Trending coins '}</Typography>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
                        <Typography fontSize={{ xs: '12px', sm: '14px' }}>{'Sort By'}</Typography>
                        <Button endIcon={<ExpandMoreIcon />}
                            sx={{
                                borderRadius: '12px',
                                "background": '#1E1D1D',
                                padding: '5px 10px',
                                textTransform: 'none',
                                color: 'white',
                                marginLeft: 1,
                                fontSize: { xs: '12px', sm: '14px' },
                            }}>{'Select'}</Button>
                    </Box>
                </Box>

                <Typography color={'#807E7C'} fontWeight={400} fontSize={'14px'}>{moment().format('DD MMM YYYY')}</Typography>

                {trendingCoins.length ?
                    (<Box gap={'10px'} mt={2}
                        sx={{
                            overflow: 'auto',
                            minHeight: '310px',
                            maxHeight: '310px',
                            height: "100%",
                            "&::-webkit-scrollbar": {
                                width: "6.41px"
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#313130",
                                borderRadius: '30px'
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                background: "#313130",
                                borderRadius: '30px'
                            },
                        }}
                    >{trendingCoins.map((item, index) => <div key={index}><CoinItem data={item} /></div>)}</Box>) :
                    <Stack justifyContent={'center'} alignItems={'center'} sx={{
                        minHeight: '310px',
                        maxHeight: '310px',
                        height: "100%",
                    }} mt={2}>
                        {isLoading ? <Loader /> : <Typography color={'#807E7C'}>Not Found</Typography>}
                    </Stack>
                }
            </Box>
        </DashboardBoxItem>
    );
}

export default TopTrendingSection;

