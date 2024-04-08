import { Box, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { colorCode } from '@/utils/const';
import LineChart from '@/components/Chart/LineChart2';
import { numberFormatter, percentageFormat, usdFormatter } from '@/utils/common';
import { useToast } from '@/components/ToastContext';

const ListTable = () => {
    const { showError } = useToast();

    const [sortModel, setSortModel] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [coinList, setCoinList] = useState([]);

    const fetchCoinList = async () => {
        setIsLoading(true);
        const coinlistapi = await fetch('/api/coinlist?ids=bitcoin,ethereum,tether,dai,polkadot,solana,dogecoin,cardano,avalanche-2&vs_currency=usd');
        const coinlist = await coinlistapi.json();
        if (coinlist.error) {
            showError(coinlist.error);
            setCoinList([])
        } else {
            setCoinList(coinlist);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchCoinList();
    }, [])

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Token Name',
            width: 150,
            headerAlign: 'left',
            renderHeader: () => {
                return <Box display={'flex'} alignItems={'center'}>
                    <span style={{ paddingLeft: '20px' }}>{'Token Name'}</span>
                    <div style={{ display: 'inline-grid' }}>
                        {sortModel[0]?.field == 'name' ? (
                            <>
                                {sortModel[0]?.field == 'name' && sortModel[0]?.sort == 'asc' && <ArrowDropUpIcon />}
                                {sortModel[0]?.field == 'name' && sortModel[0]?.sort == 'desc' && <ArrowDropDownIcon />}
                            </>
                        ) :
                            (
                                <>
                                    <ArrowDropUpIcon style={{ marginBottom: '-17px' }} />
                                    <ArrowDropDownIcon />
                                </>
                            )}
                    </div>
                </Box>
            },
            renderCell: (item: any) => {
                return <>
                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} paddingLeft={'20px'}>
                        <Image src={item.row.image} alt={item.row.name} width={28} height={28} />
                        <Box ml={2}>
                            <Typography textAlign={'left'} fontSize={'12px'}>{item.row.name}</Typography>
                            <Typography textAlign={'left'} fontSize={'8px'} color={'#A7A5A3'}>{(item.row.symbol).toUpperCase()}</Typography>
                        </Box>
                    </Box>
                </>
            }
        },
        {
            field: 'price_change_percentage_24h',
            headerName: 'Last 24 hrs',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderHeader: () => {
                return <Box display={'flex'} alignItems={'center'}>
                    <span>{'Last 24 hrs'}</span>
                    <div style={{ display: 'inline-grid' }}>
                        {sortModel[0]?.field == 'price_change_percentage_24h' ? (
                            <>
                                {sortModel[0]?.field == 'price_change_percentage_24h' && sortModel[0]?.sort == 'asc' && <ArrowDropUpIcon />}
                                {sortModel[0]?.field == 'price_change_percentage_24h' && sortModel[0]?.sort == 'desc' && <ArrowDropDownIcon />}
                            </>
                        ) :
                            (
                                <>
                                    <ArrowDropUpIcon style={{ marginBottom: '-17px' }} />
                                    <ArrowDropDownIcon />
                                </>
                            )}
                    </div>
                </Box>
            },
            renderCell: (item: any) => {
                const value = item.row.price_change_percentage_24h;
                if (value < 0) {
                    return (<Typography fontSize={'12px'} color={'#E84142'} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                        <span>{percentageFormat(value)}</span>
                        <ArrowDownward fontSize="inherit" sx={{ marginLeft: '3px' }} />
                    </Typography>)
                } else {
                    return (<Typography fontSize={'12px'} color={'#31832E'} display={'flex'} flexDirection={'row'} alignItems={'center'} >
                        <span>+{percentageFormat(value)}</span>
                        <ArrowUpward fontSize="inherit" sx={{ marginLeft: '3px' }} />
                    </Typography>)
                }
            }
        },
        {
            field: 'graph',
            headerName: '30 Day Trend',
            width: 200,
            headerAlign: 'center',
            renderCell: (item: any) => {
                return <Box height={'100%'} width={'100%'}><LineChart graphData={item.row['30daygraph']} id={item.row.id} /></Box>
            }
        },
        {
            field: 'current_price',
            headerName: 'Price',
            width: 150,
            headerAlign: 'left',
            renderHeader: () => {
                return <Box display={'flex'} alignItems={'center'}>
                    <span>{'Price'}</span>
                    <div style={{ display: 'inline-grid' }}>
                        {sortModel[0]?.field == 'current_price' ? (
                            <>
                                {sortModel[0]?.field == 'current_price' && sortModel[0]?.sort == 'asc' && <ArrowDropUpIcon />}
                                {sortModel[0]?.field == 'current_price' && sortModel[0]?.sort == 'desc' && <ArrowDropDownIcon />}
                            </>
                        ) :
                            (
                                <>
                                    <ArrowDropUpIcon style={{ marginBottom: '-17px' }} />
                                    <ArrowDropDownIcon />
                                </>
                            )}
                    </div>
                </Box>
            },
            renderCell: (item: any) => {
                return <Typography fontSize={'12px'} fontWeight={400} color={colorCode[item.row.id] || 'white'} display={'flex'} flexDirection={'row'} lineHeight={'130%'} alignItems={'center'}>
                    {`${numberFormatter.format((Math.floor(item.row.current_price * 100) / 100))} USD`}
                </Typography>
            }
        },
        {
            field: 'total_volume',
            headerName: '24h Volume',
            width: 150,
            headerAlign: 'left',
            renderHeader: () => {
                return <Box display={'flex'} alignItems={'center'}>
                    <span>{'24h Volume'}</span>
                    <div style={{ display: 'inline-grid' }}>
                        {sortModel[0]?.field == 'total_volume' ? (
                            <>
                                {sortModel[0]?.field == 'total_volume' && sortModel[0]?.sort == 'asc' && <ArrowDropUpIcon />}
                                {sortModel[0]?.field == 'total_volume' && sortModel[0]?.sort == 'desc' && <ArrowDropDownIcon />}
                            </>
                        ) :
                            (
                                <>
                                    <ArrowDropUpIcon style={{ marginBottom: '-17px' }} />
                                    <ArrowDropDownIcon />
                                </>
                            )}
                    </div>
                </Box>
            },
            renderCell: (item: any) => {
                return <Typography fontSize={'12px'} fontWeight={400} color={'white'} display={'flex'} flexDirection={'row'} lineHeight={'130%'} alignItems={'center'}>
                    {`${usdFormatter.format(item.row.total_volume)}`}
                </Typography>
            }
        },
        {
            field: 'market_cap_change_percentage_24h',
            headerName: 'Market cap',
            width: 150,
            headerAlign: 'center',
            align: 'center',
            renderHeader: () => {
                return <Box display={'flex'} alignItems={'center'}>
                    <span>{'Market cap'}</span>
                    <div style={{ display: 'inline-grid' }}>
                        {sortModel[0]?.field == 'market_cap_change_percentage_24h' ? (
                            <>
                                {sortModel[0]?.field == 'market_cap_change_percentage_24h' && sortModel[0]?.sort == 'asc' && <ArrowDropUpIcon />}
                                {sortModel[0]?.field == 'market_cap_change_percentage_24h' && sortModel[0]?.sort == 'desc' && <ArrowDropDownIcon />}
                            </>
                        ) :
                            (
                                <>
                                    <ArrowDropUpIcon style={{ marginBottom: '-17px' }} />
                                    <ArrowDropDownIcon />
                                </>
                            )}
                    </div>
                </Box>
            },
            renderCell: (item: any) => {
                return (<Typography color={'white'} fontSize={'12px'} display={'flex'} flexDirection={'row'} lineHeight={'130%'} alignItems={'center'}>
                    {percentageFormat(item.row.market_cap_change_percentage_24h)}
                </Typography>)
            }
        },
        {
            field: 'price_change_percentage_7d_in_currency',
            headerName: 'Last 7 days chnage',
            width: 200,
            headerAlign: 'center',
            align: 'center',
            renderHeader: () => {
                return <Box display={'flex'} alignItems={'center'}>
                    <span>{'Last 7 days chnage'}</span>
                    <div style={{ display: 'inline-grid' }}>
                        {sortModel[0]?.field == 'price_change_percentage_7d_in_currency' ? (
                            <>
                                {sortModel[0]?.field == 'price_change_percentage_7d_in_currency' && sortModel[0]?.sort == 'asc' && <ArrowDropUpIcon />}
                                {sortModel[0]?.field == 'price_change_percentage_7d_in_currency' && sortModel[0]?.sort == 'desc' && <ArrowDropDownIcon />}
                            </>
                        ) :
                            (
                                <>
                                    <ArrowDropUpIcon style={{ marginBottom: '-17px' }} />
                                    <ArrowDropDownIcon />
                                </>
                            )}
                    </div>
                </Box>
            },
            renderCell: (item: any) => {
                return (<Typography color={'white'} fontSize={'12px'} display={'flex'} flexDirection={'row'} lineHeight={'130%'} alignItems={'center'}>
                    {percentageFormat(item.row.price_change_percentage_7d_in_currency)}
                </Typography>)
            }
        },
    ];

    return (
        <div style={{ marginTop: 10, height: 520 }}>
            <DataGrid
                loading={isLoading}
                rows={coinList}
                columns={columns}
                disableColumnMenu={true}
                disableColumnSelector={true}
                disableColumnResize={true}
                disableRowSelectionOnClick={true}
                showColumnVerticalBorder={false}
                hideFooter={true}
                onSortModelChange={setSortModel}
                sx={{
                    border: '1px solid #313130',
                    backgroundColor: 'transperent',
                    color: 'white',
                    '& .MuiDataGrid-sortIcon': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-columnHeaders div': {
                        background: 'black',
                        color: '#A7A5A3',
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '130%'
                    },
                    '& .MuiDataGrid-topContainer::after': {
                        backgroundColor: 'transparent'
                    },
                    '& .MuiDataGrid-root .MuiDataGrid-container--top': {
                        backgroundColor: '#000'
                    },
                    '& .MuiDataGrid-topContainer': {
                        borderRadius: "12px",
                    },
                    '& .MuiDataGrid-cell': {
                        textAlign: 'center',
                        display: 'flex',
                    },
                    '& .MuiDataGrid-row': {
                        '--rowBorderColor': '#313130',
                    },
                    '& .MuiDataGrid-row.MuiDataGrid-row--firstVisible': {
                        '--rowBorderColor': '#313130',
                    },
                    '.MuiDataGrid-iconButtonContainer': {
                        visibility: 'visible',
                    },
                    '.MuiDataGrid-sortIcon': {
                        opacity: 'inherit !important',
                    },
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none'
                    },
                    '& .MuiDataGrid-columnHeader:focus-within': {
                        outline: 'none'
                    },
                    '& .MuiDataGrid-columnHeaders:hover .MuiDataGrid-columnSeparator': {
                        visibility: 'hidden'
                    },
                    "& .MuiDataGrid-overlay": {
                        backgroundColor: 'black'
                    },
                }}
            />
        </div>
    );
}
export default ListTable;