import Cookies from "js-cookie";
import Filter from './Filter';


export const OrgData = () => {
  return (
    <div className='row'>
      <Filter orgId={Cookies.get("X-OrgId")} orgName={Cookies.get("X-OrgName")}></Filter>
    </div>
  );
};
