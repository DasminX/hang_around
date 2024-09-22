import DashboardNavigation from "../../src/navigation/DashboardNavigation";
import { withAuth } from "../../src/shared/hoc/withAuth";

function DasboardLayout() {
  return <DashboardNavigation />;
}

export default withAuth(DasboardLayout);
