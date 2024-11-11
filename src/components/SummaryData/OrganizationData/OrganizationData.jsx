import style from './OrganizationData.module.css';
import up from './up2.png';
import down from './down2.png';
import { Link } from 'react-router-dom';
import { useGetSummaryDataQuery } from '../../../services/getData';

export const OrganizationData = ({ startYear, startPeriod, endYear, endPeriod }) => {
  const { data: reportData } = useGetSummaryDataQuery({ startYear: +startYear, endYear: +endYear, startPeriod: +startPeriod, endPeriod: +endPeriod });

  return (
    <div className='row' style={{ paddingLeft: '5vh', paddingTop: '5vh' }}>

      <div className='row'>
        <table className='table table-hover' id="my-table">
          <thead>
            <tr>
              <th rowSpan={2}>№ п/п</th>
              <th rowSpan={2}>Наименование</th>
              <th rowSpan={2}>Электроэнергия</th>
              <th rowSpan={2}>Вода</th>
              <th rowSpan={2}>Теплоэнергия</th>
              <th rowSpan={2}>Жидкое топливо</th>
              <th rowSpan={2}>Газ</th>
              {/* <th rowSpan={2}>Примечание</th> */}
            </tr>
          </thead>
          <tbody>
            {reportData && reportData.map((company, index1) => {
              let num = 1;
              return <>
                <tr key={`data-123-${index1}`}>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan={8}>{company.name}</td>
                </tr>
                {company.orgView.map((item, index2) => {
                  return <>
                    <tr key={`data-3-${index2}`}>
                      <td>{num++}</td>
                      <td style={{ textAlign: 'left' }} id='link'>
                        <Link to="/CurReportData" state={{ orgId: item.id, orgName: item.name, startYear: startYear, startPeriod: startPeriod }}>{item.name}</Link>
                      </td>
                      {item.electroPercent != 0 ? item.electroPercent > 0 ? <td><span>{item.electroPercent}<img src={up}></img></span></td> : <td>{item.electroPercent} <img src={down}></img></td> : <td>{item.electroPercent}</td>}
                      {item.waterPercent != 0 ? item.waterPercent > 0 ? <td><span>{item.waterPercent}<img src={up}></img></span></td> : <td>{item.waterPercent} <img src={down}></img></td> : <td>{item.waterPercent}</td>}
                      {item.heatPercent != 0 ? item.heatPercent > 0 ? <td><span>{item.heatPercent}<img src={up}></img></span></td> : <td>{item.heatPercent} <img src={down}></img></td> : <td>{item.heatPercent}</td>}
                      {item.oilFuelPercent != 0 ? item.oilFuelPercent > 0 ? <td><span>{item.oilFuelPercent}<img src={up}></img></span></td> : <td>{item.oilFuelPercent} <img src={down}></img></td> : <td>{item.oilFuelPercent}</td>}
                      {item.gazPercent != 0 ? item.gazPercent > 0 ? <td><span>{item.gazPercent}<img src={up}></img></span></td> : <td>{item.gazPercent} <img src={down}></img></td> : <td>{item.gazPercent}</td>}
                      {/* <td>{item.description}</td> */}
                    </tr>
                  </>
                })}
                <tr className={style["tr-total"]}>
                  <td colSpan={2} style={{ textAlign: 'left', fontWeight: 'bold' }}>Итого:</td>
                  {company.objectTotal.electroPercent != 0 ? company.objectTotal.electroPercent > 0 ? <td><span>{company.objectTotal.electroPercent}<img src={up}></img></span></td> : <td>{company.objectTotal.electroPercent} <img src={down}></img></td> : <td>{company.objectTotal.electroPercent}</td>}
                  {company.objectTotal.waterPercent != 0 ? company.objectTotal.waterPercent > 0 ? <td><span>{company.objectTotal.waterPercent}<img src={up}></img></span></td> : <td>{company.objectTotal.waterPercent} <img src={down}></img></td> : <td>{company.objectTotal.waterPercent}</td>}
                  {company.objectTotal.heatPercent != 0 ? company.objectTotal.heatPercent > 0 ? <td><span>{company.objectTotal.heatPercent}<img src={up}></img></span></td> : <td>{company.objectTotal.heatPercent} <img src={down}></img></td> : <td>{company.objectTotal.heatPercent}</td>}
                  {company.objectTotal.oilFuelPercent != 0 ? company.objectTotal.oilFuelPercent > 0 ? <td><span>{company.objectTotal.oilFuelPercent}<img src={up}></img></span></td> : <td>{company.objectTotal.oilFuelPercent} <img src={down}></img></td> : <td>{company.objectTotal.oilFuelPercent}</td>}
                  {company.objectTotal.gazPercent != 0 ? company.objectTotal.gazPercent > 0 ? <td><span>{company.objectTotal.gazPercent}<img src={up}></img></span></td> : <td>{company.objectTotal.gazPercent} <img src={down}></img></td> : <td>{company.objectTotal.gazPercent}</td>}
                  {/* <td></td> */}
                </tr>

              </>
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};
