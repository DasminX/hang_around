import { DashboardNavigation } from "../../src/navigation/DashboardNavigation";
import { withAuth } from "../../src/shared/hoc/withAuth";

/* export default */ function DasboardLayout() {
  return <DashboardNavigation />;
}

export default withAuth(DasboardLayout);
