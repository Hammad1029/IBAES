import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { DashboardLayout } from "./dashboard-layout";
import Leaderboard from "./dashboard/Leaderboard";
import ModuleCard from "./dashboard/ModuleCard";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import constants from "../constants";
import { getLeaderboardData, updateDashboard } from "../utils";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Page = ({ moduleName }) => {
  const { modules } = useSelector((state) => state.app);
  const myModule = modules.filter((i) => i.name.toLowerCase() === moduleName.toLowerCase())[0];
  const finished = myModule.status.toLowerCase() === constants.finished.toLowerCase();

  useEffect(() => {
    updateDashboard();
  }, []);

  return (
    <>
      <Head>
        <title>{moduleName} | IDEAS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item lg={4} sm={6} xl={3} xs={12} sx={{ mb: 5 }}>
                <ModuleCard
                  cardDetails={{
                    name: moduleName,
                    status: myModule.status,
                    icon: <SportsEsportsIcon />,
                  }}
                />
              </Grid>
            </Grid>
            <Leaderboard
              settings={{
                name: `${moduleName} Leaderboard`,
                blur: !finished,
                data: finished ? getLeaderboardData(module) : undefined,
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
