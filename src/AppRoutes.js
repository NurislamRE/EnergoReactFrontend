import SummaryData  from './components/SummaryData';
import  ChartsData  from './components/ChartsData';
import  RatingOrg  from './components/RatingOrg';
import  Dictionary  from './components/Dictionary';
import  OrgData  from './components/OrgData';
import  ReportData  from './components/ReportData';
import  CurReportData  from './components/CurReportData';
import Login from "./components/Account/Login";

const AppRoutes = [
  {
    index: true,
    path:  '/',
    element: <ReportData /> 
  },
  {
    path: '/summaryData',
    element: <SummaryData />
  },
  {
    path: '/chartsData',
    element: <ChartsData />
  },
  {
    path: '/ratingOrg',
    element: <RatingOrg />
  },
  {
    path: '/dictionary',
    element: <Dictionary />
  },
  {
    path: '/orgData',
    element: <OrgData />
  },
  {
    path: '/reportData',
    element: <ReportData />
  },
  {
    path: '/curReportData',
    element: <CurReportData />
  },
];

export default AppRoutes;
