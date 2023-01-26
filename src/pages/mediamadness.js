import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { CustomerListResults } from '../components/customer/customer-list-results';
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import Leaderboard from '../components/dashboard/Leaderboard';
import ModuleCard from '../components/dashboard/ModuleCard';
import VideocamIcon from '@mui/icons-material/Videocam';

const Page = () => (
    <>
        <Head>
            <title>
                Idea Den | IDEAS
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
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item lg={3} sm={6} xl={3} xs={12} sx={{ mb: 5 }}>
                            <ModuleCard cardDetails={{
                                name: "Media Madness",
                                status: "Finished",
                                icon: <VideocamIcon />
                            }} />
                        </Grid>
                    </Grid>
                    <Leaderboard settings={{ name: "Media Madness Leaderboard" }} />
                </Box>
            </Container>
        </Box>
    </>
);

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
