import { DashboardLayout } from "../components/dashboard-layout";
import GenericModulePage from "../components/genericModulePage";
import constants from "../constants";

const SBPI = () => <GenericModulePage moduleName={constants.sbpi} />

SBPI.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default SBPI;