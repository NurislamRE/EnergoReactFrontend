import style from './OilFuel.module.css';
import { makeStyles } from "@material-ui/core/styles";
import { useState, React} from 'react';
import * as XLSX from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';
import { useGetOrgDataQuery } from '../../../services/getData';
import _Data from '../Data';

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

export const OilFuel = ({ year, period, organizationId }) => {
  const classes = useStyles();
  const { data: reportData } = useGetOrgDataQuery({ year: +year, period: +period, orgId: +organizationId });

  const handleExportClick = () => {
    const table = document.getElementById('my-table');
    const workbook = tableToWorkbook(table);
    downloadWorkbook(workbook, 'По потреблению жидкого топливо для автономного отопления_' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '.xlsx');
  };

  const [showEdit, setEditShow] = useState(false);
  const edit = (item) => setEditShow(true);
  const handleEditClose = () => setEditShow(false);

  return (
    <div className='row' style={{ paddingLeft: '5vh', paddingTop: '5vh' }}>

      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <h4>По потреблению жидкого топливо для автономного отопления</h4>
        </div>
        <div className='col-md-4'>
          <IconButton className={classes.customHoverFocus} aria-label="downloadWord" sx={{ float: 'right', width: "auto" }} title='Скачать' onClick={handleExportClick}>
            <DownloadIcon />
          </IconButton>
        </div>
      </div>

      <div className='row'>
        <table className='table table-hover' id="my-table">
          <thead>
            <tr>
              <th rowSpan={2}>Объекты</th>
              <th colSpan={2}>план</th>
              <th colSpan={2}>факт</th>
              <th rowSpan={2}></th>
            </tr>
            <tr>
              <th className='btmTh'>литр</th>
              <th className='btmTh'>сумма (тыс. тенге)</th>
              <th className='btmTh'>литр</th>
              <th className='btmTh'>сумма (тыс. тенге)</th>
            </tr>
          </thead>
          <tbody>
            {reportData && reportData.oilFuel.map((item, index) => (
             <_Data key={`data-1263-${index}`}
             item={item}
           />
            ))}
          </tbody>
          <tfoot>
            {reportData &&
              <tr>
                <td>{reportData.oilFuelTotalData.objectName}</td>
                <td>{reportData.oilFuelTotalData.planValue}</td>
                <td>{reportData.oilFuelTotalData.planSum}</td>
                <td>{reportData.oilFuelTotalData.value}</td>
                <td>{reportData.oilFuelTotalData.sum}</td>
                <td></td>
              </tr>
            }
          </tfoot>
        </table>
      </div>
    </div>
  );
};
