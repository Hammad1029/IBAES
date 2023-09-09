import { DashboardLayout } from "../components/dashboard-layout";
import GenericModulePage from "../components/genericModulePage";
import constants from "../constants";

const IdeaDen = () => <GenericModulePage moduleName={constants.ideaDen} />

IdeaDen.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default IdeaDen;