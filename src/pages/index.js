import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import ModuleCard from '../components/dashboard/ModuleCard';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import Countdown from '../components/dashboard/Countdown';
import { DashboardLayout } from '../components/dashboard-layout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import jwt from "jsonwebtoken";
import { logoutUser } from '../redux/auth.slice';
import { logout } from '../utils';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import VideocamIcon from '@mui/icons-material/Videocam';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Leaderboard from '../components/dashboard/Leaderboard';

const Page = ({ isAuthenticated }) => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);

  useEffect(() => {
    if (!isAuthenticated || !isLoggedIn) logout();
  }, [isAuthenticated, isLoggedIn]);

  return (
    <>
      <Head>
        <title>
          Dashboard | IDEAS
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
          <Grid
            container
            spacing={3}
          >
            {modules.map(i => (
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <ModuleCard cardDetails={i} />
              </Grid>
            ))}
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <Leaderboard />
            </Grid>
            {/* <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <Countdown settings={{ timestamp: "1672548747" }} />
            </Grid> */}
          </Grid>
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

export const getServerSideProps = async ({ req, res }) => {
  const cookie = getCookie("token", { req, res });
  if (!cookie) return { props: { isAuthenticated: false } };

  try {
    const isAuthenticated = await jwt.verify(
      cookie,
      process.env.JWT_KEY,
    );
    return { props: { isAuthenticated: isAuthenticated } };
  } catch (err) {
    return { props: { isAuthenticated: false } };
  }
};

const modules = [
  {
    name: "Bazaar",
    status: "Pending",
    icon: <ShowChartIcon />
  },
  {
    name: "Idea Den",
    status: "Ongoing",
    icon: <LightbulbIcon />
  },
  {
    name: "SBPI",
    status: "Finished",
    icon: <SportsEsportsIcon />
  },
  {
    name: "Media Madness",
    status: "Finished",
    icon: <VideocamIcon />
  },
]