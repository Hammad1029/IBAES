import { DashboardLayout } from "../components/dashboard-layout";
import GenericModulePage from "../components/genericModulePage";
import constants from "../constants";

const MediaMadness = () => <GenericModulePage moduleName={constants.mediaMadness} />

MediaMadness.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default MediaMadness;