import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import ModuleCard from '../components/dashboard/ModuleCard';
import { DashboardLayout } from '../components/dashboard-layout';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import jwt from "jsonwebtoken";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import VideocamIcon from '@mui/icons-material/Videocam';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Leaderboard from '../components/dashboard/Leaderboard';
import { logout } from '../utils';
import { updateDashboard } from '../utils';

const Page = ({ isAuthenticated }) => {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const { modules, teamScores } = useSelector((state) => state.app);

  useEffect(() => {
    if (!isAuthenticated || !isLoggedIn) logout();
    updateDashboard();
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
            {modules.map((i, idx) => (
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <ModuleCard cardDetails={{ ...i, icon: moduleIcons[idx] }} />
              </Grid>
            ))}
            <Grid
              item
              lg={8}
              md={12}
              xl={9}
              xs={12}
            >
              <Leaderboard settings={{
                blur: modules.filter(i => i.status === "Finished").length === 0,
                data: teamScores.map(i => ({ ...i, name: i.username }))
              }} />
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
    const isAuthenticated = jwt.verify(
      cookie,
      process.env.JWT_KEY,
    );
    return { props: { isAuthenticated } };
  } catch (err) {
    return { props: { isAuthenticated: false } };
  }
};

const moduleIcons = [<ShowChartIcon />, <LightbulbIcon />, <SportsEsportsIcon />, <VideocamIcon />]