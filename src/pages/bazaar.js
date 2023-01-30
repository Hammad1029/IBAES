import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import ModuleCard from '../components/dashboard/ModuleCard';
import YouTube from 'react-youtube';
import { useState } from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StockTable from '../components/StockTable';
import { formatCurrency } from '../utils';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StockModal from '../components/StockModal';
import { useSelector } from 'react-redux';

const Page = () => {
    const [modal, setModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState({});
    const toggleModal = () => setModal(!modal);
    const { headlines, stocks, userBalance } = useSelector(state => state.app);
    const balances = getBalances(userBalance || {})

    return (
        <>
            <Head>
                <title>
                    Bazaar | IDEAS
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <Box>
                        <Grid container spacing={1} sx={{ mb: 2 }}>
                            <Grid item lg={6} xl={8}
                                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <YouTube
                                    videoId="sUKwTVAc0Vo"
                                    opts={{
                                        height: "510",
                                        width: "900",
                                        playerVars: {
                                            modestbranding: 1,
                                            rel: 0
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item lg={12} xl={4}>
                                <Grid container spacing={1}>
                                    {balances.map(balance => (
                                        <Grid item xs={12}>
                                            <ModuleCard cardDetails={{
                                                name: formatCurrency(balance.balance),
                                                status: balance.name,
                                                icon: balance.icon,
                                                textColor: balance.balance < 0 ? "red" : "green"
                                            }} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                        </Grid>
                        <StockTable select={setSelectedStock} toggleModal={toggleModal} />
                        <StockModal state={modal} toggle={toggleModal} details={selectedStock} balances={balances} />
                    </Box>
                </Container>
            </Box>
        </>
    )
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;

const getBalances = (balances) => [
    { name: "Given", icon: <MonetizationOnIcon />, balance: balances.initial || 0 },
    { name: "Portfolio", icon: <AccountBalanceIcon />, balance: balances.portfolio || 0 },
    { name: "Remaining", icon: <SavingsIcon />, balance: balances.remaining || 0 },
    {
        name: "Profit / Loss", icon: <CurrencyExchangeIcon />,
        balance: (Number(balances.portfolio) + Number(balances.remaining) - Number(balances.initial)) || 0
    }
]