import Filter from "./Filter";
import Cookies from "js-cookie";

export const Dictionary = () => {
  return (
    <div className="row">
      <Filter
        orgId={Cookies.get("X-OrgId")}
        orgName={Cookies.get("X-OrgName")}
      ></Filter>
    </div>
  );
};
