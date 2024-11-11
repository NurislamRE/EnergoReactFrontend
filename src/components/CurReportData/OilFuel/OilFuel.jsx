import style from './OilFuel.module.css';
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';
import * as XLSX from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useGetCurDataQuery } from '../../../services/getData';

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "whitesmoke" }
  }
}));

const tableToWorkbook = (table) => {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
  return workbook;
};

const downloadWorkbook = (workbook, filename) => {
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  if (typeof window !== 'undefined') {
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
  }
};

export const OilFuel = ({ endYear, endPeriod, endPeriodText, organization }) => {

  const classes = useStyles();
  const startYear = endYear - 1;

  const { data: reportData } = useGetCurDataQuery({ endYear: +endYear, endPeriod: +endPeriod, orgId: +organization });

  const handleExportClick = () => {
    const table = document.getElementById('my-table');
    const workbook = tableToWorkbook(table);
    downloadWorkbook(workbook, 'По потреблению жидкого топливо для автономного отопления' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '.xlsx');
  };

  return (
    <div className='row' style={{ paddingLeft: '5vh', paddingTop: '5vh' }}>

      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <h4>По потреблению жидкого топливо для автономного отопления</h4>
        </div>
        <div className='col-md-4'>
        <Button color='primary' variant="contained" endIcon={<DownloadIcon />} sx={{ float: 'right', width:'25%' }} title="Скачать" onClick={handleExportClick}></Button>
        </div>
      </div>

      <div className='row'>
        <table className='table table-hover' id="my-table">
          <thead>
            <tr>
              <th rowSpan={3}>Объекты</th>
              <th colSpan={2} rowSpan={2}>факт {endPeriodText} {startYear} года</th>
              <th colSpan={12}>{endPeriodText} {endYear} года</th>
            </tr>
            <tr>
              <th colSpan={2}>план</th>
              <th colSpan={2}>факт</th>
              <th colSpan={4}>отклонение +/- от плана</th>
              <th colSpan={4}>отклонение {endYear} года от {startYear} года</th>
            </tr>
            <tr>
              <th>кВт*час</th>
              <th>тыс.тенге</th>

              <th>кВт*час</th>
              <th>тыс.тенге</th>

              <th>кВт*час</th>
              <th>тыс.тенге</th>

              <th>кВт*час</th>
              <th>%</th>
              <th>тыс.тенге</th>
              <th>%</th>

              <th>кВт*час</th>
              <th>%</th>
              <th>тыс.тенге</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {reportData && reportData.dataView.map((item, index) => (
              <tr key={`report-data-${index}`}>
                <td>{item.objectName}</td>
                <td className={style["bold"]}>{item.oilFuel.startData.value}</td>
                <td className={style["bold"]}>{item.oilFuel.startData.sum}</td>
                <td className={style["bold"]}>{item.oilFuel.endData.planValue}</td>
                <td className={style["bold"]}>{item.oilFuel.endData.planSum}</td>
                <td className={style["bold"]}>{item.oilFuel.endData.value}</td>
                <td className={style["bold"]}>{item.oilFuel.endData.sum}</td>
                <td className={style["bold"]}>{item.oilFuel.deviation.value}</td>
                <td className={style["bold"]}>{item.oilFuel.deviation.percent}</td>
                <td className={style["bold"]}>{item.oilFuel.deviation.sum}</td>
                <td className={style["bold"]}>{item.oilFuel.deviation.percentSum}</td>
                <td className={style["bold"]}>{item.oilFuel.deviationYear.value}</td>
                <td className={style["bold"]}>{item.oilFuel.deviationYear.percent}</td>
                <td className={style["bold"]}>{item.oilFuel.deviationYear.sum}</td>
                <td className={style["bold"]}>{item.oilFuel.deviationYear.percentSum}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {reportData &&
              <tr>
                <td>{reportData.totalData.objectName}</td>
                <td>{reportData.totalData.oilFuel.startData.value}</td>
                <td>{reportData.totalData.oilFuel.startData.sum}</td>
                <td>{reportData.totalData.oilFuel.endData.planValue}</td>
                <td>{reportData.totalData.oilFuel.endData.planSum}</td>
                <td>{reportData.totalData.oilFuel.endData.value}</td>
                <td>{reportData.totalData.oilFuel.endData.sum}</td>
                <td>{reportData.totalData.oilFuel.deviation.value}</td>
                <td>{reportData.totalData.oilFuel.endData.value != 0 ? reportData.totalData.oilFuel.endData.planValue != 0 ? Math.round(100 * reportData.totalData.oilFuel.endData.value / reportData.totalData.oilFuel.endData.planValue - 100) : 0 : 0}</td>
                <td>{reportData.totalData.oilFuel.deviation.sum}</td>
                <td>{reportData.totalData.oilFuel.endData.sum != 0 ? reportData.totalData.oilFuel.endData.planSum != 0 ? Math.round(100 * reportData.totalData.oilFuel.endData.sum / reportData.totalData.oilFuel.endData.planSum - 100) : 0 : 0}</td>
                <td>{reportData.totalData.oilFuel.deviationYear && reportData.totalData.oilFuel.deviationYear.value}</td>
                <td>{reportData.totalData.oilFuel.endData.value != 0 ? reportData.totalData.oilFuel.startData.value != 0 ? Math.round(100 * reportData.totalData.oilFuel.endData.value / reportData.totalData.oilFuel.startData.value - 100) : 0 : 0}</td>
                <td>{reportData.totalData.oilFuel.deviationYear && reportData.totalData.oilFuel.deviationYear.sum}</td>
                <td>{reportData.totalData.oilFuel.endData.sum != 0 ? reportData.totalData.oilFuel.startData.sum != 0 ? Math.round(100 * reportData.totalData.oilFuel.endData.sum / reportData.totalData.oilFuel.startData.sum - 100) : 0 : 0}</td>
              </tr>
            }
          </tfoot>
        </table>
      </div>
    </div>
  );
};
