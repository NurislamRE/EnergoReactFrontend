import Filter from "./Filter";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export const CurReportData = () => {
  const location = useLocation();
  if (location.state == null)
    location.state = {
      orgId: Cookies.get("X-OrgId"),
      orgName:Cookies.get("X-OrgName"),
      startYear: new Date().getFullYear(),
      startPeriod: 8,
    };

  const { orgId, orgName, startYear, startPeriod } = location.state;

  console.log(location.state);

  return (
    <div className="row">
      <Filter
        orgId={orgId}
        orgName={orgName}
        startYear={startYear}
        startPeriod={startPeriod}
      ></Filter>
    </div>
  );
};
