import style from './Heat.module.css';
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';
import * as XLSX from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useGetDataQuery } from '../../../services/getData';

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

export const Heat = ({ startYear, startPeriod, startPeriodText, endYear, endPeriod, endPeriodText, organization }) => {

  const classes = useStyles();

  const { data: reportData } = useGetDataQuery({ startYear: +startYear, endYear: +endYear, startPeriod: +startPeriod, endPeriod: +endPeriod, organization: +organization });

  const handleExportClick = () => {
    const table = document.getElementById('my-table');
    const workbook = tableToWorkbook(table);
    downloadWorkbook(workbook, 'По потреблению теплоэнергии' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '.xlsx');
  };

  return (
    <div className='row' style={{ paddingLeft: '5vh', paddingTop: '5vh' }}>

      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <h4>По потреблению теплоэнергии</h4>
        </div>
        <div className='col-md-4'>
        <Button color='primary' variant="contained" endIcon={<DownloadIcon />} sx={{ float: 'right', width:'25%' }} title="Скачать" onClick={handleExportClick}></Button>
        </div>
      </div>

      <div className='row'>
        <table className='table table-hover table-bordered'>
          <thead>
            <tr>
              <th rowSpan={2}>Объекты</th>
              <th rowSpan={2}>Площадь</th>
              <th colSpan={2}>{startPeriodText} {startYear}</th>
              <th colSpan={2}>{endPeriodText} {endYear}</th>
              <th colSpan={3}>Отклонение</th>
              <th rowSpan={2}>Потребление <br></br> на 1м2</th>
            </tr>
            <tr>
              <th>квт*час</th>
              <th>сумма (тыс. тенге)</th>
              <th>квт*час</th>
              <th>сумма (тыс. тенге)</th>
              <th>квт*час</th>
              <th>%</th>
              <th>Результат</th>
            </tr>
          </thead>
          <tbody>
            {reportData && reportData.dataView.map((item, index) => (
              <tr key={`data-123-${index}`}>
                <td>{item.objectName}</td>
                <td className={style["bold"]}>{item.square}</td>
                <td className={style["bold"]}>{item.heat.startData.value}</td>
                <td className={style["bold"]}>{item.heat.startData.sum}</td>
                <td className={style["bold"]}>{item.heat.endData.value}</td>
                <td className={style["bold"]}>{item.heat.endData.sum}</td>
                <td className={style["bold"]}>{item.heat.deviation.value}</td>
                <td className={style["bold"]}>{item.heat.deviation.percent}</td>
                {item.heat.deviation.result ? <td className={style["up"]}></td> : <td className={style["down"]}></td>}
                <td className={style["bold"]}>{item.heat.consumption1M2}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            {reportData &&
              <tr>
                <td>{reportData.totalData.objectName}</td>
                <td>{reportData.totalData.square}</td>
                <td>{reportData.totalData.heat.startData.value}</td>
                <td>{reportData.totalData.heat.startData.sum}</td>
                <td>{reportData.totalData.heat.endData.value}</td>
                <td>{reportData.totalData.heat.endData.sum}</td>
                <td>{reportData.totalData.heat.deviation.value}</td>
                <td>{reportData.totalData.heat.endData.value != 0 ? reportData.totalData.heat.startData.value != 0 ? Math.round(100 * reportData.totalData.heat.endData.value / reportData.totalData.heat.startData.value - 100) : 0 : 0}</td>
                {reportData.totalData.heat.deviation.result ? <td className={style["up"]}></td> : <td className={style["down"]}></td>}
                <td>{reportData.totalData.heat.consumption1M2}</td>
              </tr>
            }
          </tfoot>
        </table>
      </div>
    </div>
  );
};
