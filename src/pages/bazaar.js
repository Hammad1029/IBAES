import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import ModuleCard from "../components/dashboard/ModuleCard";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import StockTable from "../components/StockTable";
import { formatCurrency, getBaseURL } from "../utils";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StockModal from "../components/StockModal";
import { useDispatch, useSelector } from "react-redux";
import constants from "../constants";
import Countdown from "../components/dashboard/Countdown";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axiosInstance from "../utils/interceptor";

const moduleName = constants.bazaar;

const Page = (props) => {
  const [headlines, setHeadlines] = useState({
    currentHeadline: "Z8vDU6vUTj4",
    nextHeadline: moment().unix(),
  });
  const [stocks, setStocks] = useState([]);
  const [userBalance, setUserBalance] = useState({});

  const [timer, setTimer] = useState([0, 0, 0]);
  const [modal, setModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState({});
  const toggleModal = () => setModal(!modal);
  const { modules } = useSelector((state) => state.app);
  const { id: userId } = useSelector((state) => state.auth.user);
  const balances = getBalances(userBalance || {});

  const dispatch = useDispatch();

  const module = modules.filter((i) => i.name.toLowerCase() === moduleName.toLowerCase())[0];
  const ongoing = module.status.toLowerCase() === constants.ongoing.toLocaleLowerCase();

  useEffect(() => {
    getHeadlines();
  }, []);

  const getHeadlines = async () => {
    const {
      data: { responseCode, data },
    } = await axiosInstance.post(`${props.baseApiUrl}/getHeadlines`, { userId });
    if (responseCode === "00") {
      const nextHeadlineUnix = moment(data.nextHeadline, constants.dateFormat).unix();
      setHeadlines({
        currentHeadline: data.currentHeadline.split("=")[1],
        nextHeadline: nextHeadlineUnix,
      });
      setStocks(data.stocks);
      setUserBalance(data.userBalance);
      if (data.nextHeadline) {
        var interval = setInterval(() => {
          const timeLeft = moment.utc((nextHeadlineUnix - moment().unix()) * 1000);
          if (Number(timeLeft.unix().toString()) === 0) {
            clearInterval(interval);
            getHeadlines();
          } else setTimer(timeLeft.format("HH:mm:ss").split(":"));
        }, 1000);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Bazaar | IDEAS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <Grid container spacing={1} sx={{ mb: 2 }}>
              <Grid
                item
                lg={8}
                xl={8}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sx={{ display: "flex", alignItems:"center", justifyContent:"space-between" }}>
                    <Typography variant="h4" fontWeight="300" sx={{ pb: 2 }}>
                      {headlines.nextHeadline
                        ? `Next headline in ${timer[0]} hours ${timer[1]} minutes ${timer[2]} seconds`
                        : "No more headlines"}
                    </Typography>
                    <Button variant="contained" onClick={getHeadlines} sx={{ mr: 2 }}>
                      Refresh
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <YouTube
                      videoId={headlines.currentHeadline}
                      opts={{
                        height: "510",
                        width: "900",
                        playerVars: {
                          modestbranding: 1,
                          rel: 0,
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={4} xl={4}>
                <Grid container spacing={1}>
                  {balances.map((balance) => (
                    <Grid item xs={12}>
                      <ModuleCard
                        cardDetails={{
                          name: formatCurrency(balance.balance),
                          status: balance.name,
                          icon: balance.icon,
                          textColor: balance.balance < 0 ? "red" : "green",
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <StockTable
              select={setSelectedStock}
              toggleModal={toggleModal}
              settings={{
                name: `Stock Market${
                  headlines.nextHeadline
                    ? ` (Updating in ${timer[0]} hours ${timer[1]} minutes ${timer[2]} seconds)`
                    : ""
                }`,
                blur: !ongoing,
                data: ongoing
                  ? stocks.map((i) => ({
                      ...i,
                      owned: Number(
                        (userBalance[i.companyName.toLowerCase()].replace("%", "") / 100) *
                          i.quantity
                      ),
                    }))
                  : undefined,
              }}
            />
            <StockModal
              state={modal}
              toggle={toggleModal}
              details={selectedStock}
              balances={balances}
              getHeadlines={getHeadlines}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

const getBalances = (balances) => [
  { name: "Given", icon: <MonetizationOnIcon />, balance: balances.initial || 0 },
  { name: "Portfolio", icon: <AccountBalanceIcon />, balance: balances.portfolio || 0 },
  { name: "Remaining", icon: <SavingsIcon />, balance: balances.remaining || 0 },
  {
    name: "Profit / Loss",
    icon: <CurrencyExchangeIcon />,
    balance:
      Number(balances.portfolio || 0) +
        Number(balances.remaining || 0) -
        Number(balances.initial || 0) || 0,
  },
];

export async function getServerSideProps(context) {
  return {
    props: {
      baseApiUrl: getBaseURL(context.req),
    },
  };
}
