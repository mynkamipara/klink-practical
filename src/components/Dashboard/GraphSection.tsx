import { Button, Grid, Box, Typography, Stack } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import moment from 'moment';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useToast } from '../ToastContext';
import { daysItem } from '@/utils/const';
import { DashboardBoxItem } from "@/components/Styled/Box";
import { Loader } from '@/components/Loading';
import { transformGraphData } from '@/utils/common';

const ChartSection = dynamic(
    () => {
        return import("@/components/Chart/LineChart1");
    },
    { ssr: false }
);

interface dayItemProps {
    text: string,
    value: string,
    active: boolean,
    handleChangeDay: (value: string) => void
}

interface Props {
    content: any;
}

const CoinBoardLabel = ({ content }: Props) => {
    return <Box display={'flex'} flexDirection={'row'} gap={'2px'}>
        <Typography fontSize={'28.901px'} fontWeight={800} color={'white'} letterSpacing={'-0.289px'} display={'inline'}>
            {'$'}
        </Typography>
        <Typography fontSize={'48px'} fontWeight={700} color={'white'} display={'inline'} letterSpacing={'-1.44px'}>
            {`${(Math.floor(content?.bitcoin?.usd * 100) / 100)}`}
        </Typography>
        <Typography fontSize={'28.901px'} fontWeight={800} color={'white'} letterSpacing={'-0.289px'} display={'inline'}>
            {`.${(Math.floor(content?.bitcoin?.usd * 100) / 100).toFixed(2).split('.')[1]}`}
        </Typography>
    </Box>
}

const DayItem = ({ text, value, active, handleChangeDay }: dayItemProps) => {
    return (
        <Grid item xs={4} sm={2} border={'1.214px solid #313130'} borderRadius={'4.855px'} padding={'4.855px 9.71px'} onClick={() => handleChangeDay(value)} style={{ cursor: 'pointer', backgroundColor: active ? '#313130' : 'transparent' }} >
            <Typography textAlign={'center'} color={active ? 'white' : '#626160'} fontWeight={600} fontSize={{ xs: '12px', sm: '14px' }}>{text}</Typography>
        </Grid>
    )
}

const GraphSection = ({ content }: Props) => {
    const { showError } = useToast();

    const [isGraphLoading, setIGrapsLoading] = useState(false);

    const [graphData, setGraphData] = useState<Object | null>();
    const [chartOption, setChartoption] = useState('Chart'); // Option Chart/Pie
    const [selectDay, setSelectDay] = useState('1'); // Days Value 1|7|30|90|365

    // fetch graph data for selected days value and arrange xaxis/yaxis to set graphData
    const fetchGraphData = async (selectDay: string) => {
        setIGrapsLoading(true);
        const result = await fetch(`/api/chart?id=bitcoin&days=${selectDay}&vs_currency=usd`);
        const data = await result.json();
        if (data.error) {
            showError(data.error);
            setGraphData(null)
        } else if (data.prices) {
            const graphObject = transformGraphData(data.prices);
            setGraphData(graphObject)
        } else {
            setGraphData(null)
        }
        setIGrapsLoading(false);
    }


    useEffect(() => {
        fetchGraphData(selectDay);
    }, [selectDay])


    return (
        <div>
            <DashboardBoxItem>
                {!content ? <Loader /> :
                    <Box width={'100%'}>
                        <Typography fontSize={16} fontWeight={700} color={'white'}>
                            {'BTC'}
                        </Typography>

                        <Stack justifyContent={'space-between'} mt={1} direction={'row'}>
                            <CoinBoardLabel content={content} />
                            <Box>
                                <Button endIcon={<RemoveRedEyeIcon />} style={{
                                    borderRadius: '65px',
                                    background: 'rgba(118, 96, 255, 0.10)',
                                    color: '#7660FF',
                                    padding: '8px 12px 8px 12px',
                                    textTransform: 'none'
                                }}>
                                    {'Visible'}
                                </Button>
                            </Box>
                        </Stack>

                        <Stack justifyContent={'space-between'} mt={1} direction={{ xs: 'column', sm: 'column', md: 'row' }} alignItems={{ xs: 'baseline', sm: 'baseline', md: 'center' }}>
                            <Box display={'flex'} flexDirection={'row'} gap={'4.855px'}>
                                <Typography fontWeight={600} color={'#51DA4C'} display={'flex'} flexDirection={'row'} >
                                    <ArrowDropUpIcon />
                                    <span>{`${(Math.floor(content?.bitcoin?.usd_24h_change * 100) / 100)}%`}</span>
                                </Typography>
                                <Typography color={'#A7A5A3'} fontWeight={400}>
                                    {moment.unix(content?.bitcoin?.last_updated_at).local().format('ddd, MMM DD, hh:mm')}
                                </Typography>
                            </Box>

                            <Box display={'flex'} flexDirection={'row'} mt={{ xs: 1 }}>
                                <Button
                                    style={{
                                        textTransform: 'none',
                                        color: chartOption == 'Chart' ? 'white' : '#A7A5A3',
                                        backgroundColor: chartOption == 'Chart' ? '#31832E' : 'transparent',
                                        border: '1.214px solid #313130',
                                        borderRadius: chartOption == 'Chart' ? "4.855px 0px 0px 4.855px" : "4.855px 0px 0px 4.855px",
                                    }}
                                    onClick={() => setChartoption('Chart')}
                                >
                                    {'Chart'}
                                </Button>
                                <Button
                                    style={{
                                        textTransform: 'none',
                                        color: chartOption == 'Pie' ? 'white' : '#A7A5A3',
                                        border: '1.214px solid #313130',
                                        backgroundColor: chartOption == 'Pie' ? '#31832E' : 'transparent',
                                        borderRadius: chartOption == 'Pie' ? "0px 4.855px 4.855px 0px" : "0px 4.855px 4.855px 0px",
                                    }}
                                    onClick={() => setChartoption('Pie')}
                                >
                                    {'Pie'}
                                </Button>
                            </Box>

                        </Stack>
                        <Stack style={{ height: '185px' }}>
                            {isGraphLoading ?
                                <Loader /> :
                                <>
                                    {graphData ?
                                        <ChartSection graphData={graphData} />
                                        : <Typography color={'#A7A5A3'} display={'flex'} justifyContent={'center'} margin={'auto'}>{`Graph data not found`}</Typography>
                                    }
                                </>
                            }
                        </Stack>

                        <Stack justifyContent={'center'} flexDirection={'row'} alignItems={'center'} gap={'12.138px;'} mt={1}>
                            {daysItem.map((item, index) => (
                                <DayItem text={item.label} value={item.value} key={index} active={selectDay == item.value} handleChangeDay={setSelectDay} />
                            ))}
                        </Stack>
                    </Box>
                }
            </DashboardBoxItem>
        </div>
    );
}
export default GraphSection;