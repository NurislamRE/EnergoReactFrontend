import style from './Gaz.module.css';
import { makeStyles } from "@material-ui/core/styles";
import React from 'react';
import * as XLSX from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';

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

export const Gaz = ({ reportData, endYear, endPeriodText, type }) => {
  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
  }
  var _orgs = reportData.organizations;
  for (var i = 0; i < reportData.organizations.length; i++) {
    var _data = [];
    for (var j = 0; j < reportData.chartData.length; j++) {
      if (reportData.organizations[i].id == reportData.chartData[j].orgId) {
        _data.push(reportData.chartData[j].value);
      }
    }
    _orgs[i].data = _data;
  }
  const options = {
    chart: {
      marginTop: 100,
      type: 'spline'
    },
    title: {
      text: null
    },
    xAxis: {
      // categories: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
      categories: reportData.periods,
      tickWidth: 0,
      gridLineWidth: 1,
      labels: {
        align: 'left',
        x: 3,
        y: 15
      }
    },
    yAxis: [{
      title: {
        text: null
      },
      labels: {
        align: 'left',
        x: 3,
        y: 16,
        format: '{value:.,0f}'
      },
      showFirstLabel: false
    },
    {
      linkedTo: 0,
      gridLineWidth: 0,
      opposite: true,
      title: {
        text: null
      },
      labels: {
        align: 'right',
        x: -3,
        y: 16,
        format: '{value:.,0f}'
      },
      showFirstLabel: false
    }],
    legend: {
      align: 'left',
      verticalAlign: 'top',
      y: 20,
      floating: true,
      borderWidth: 0
    },
    tooltip: {
      shared: true,
      crosshairs: true
    },
    plotOptions: {
      series: {
        cursor: 'pointer',
        marker: {
          lineWidth: 1
        }
      }
    },
    series: _orgs,
    exporting: {
      enabled: true,
      chartOptions: {
        title: {
          text: 'export'
        },
      }
    }
  };
  const classes = useStyles();
  const startYear = endYear - 1;

  const handleExportClick = () => {
    const table = document.getElementById('my-table');
    const workbook = tableToWorkbook(table);
    downloadWorkbook(workbook, 'По потреблению газа' + dayjs().format('YYYY-MM-DD HH:mm:ss') + '.xlsx');
  };

  return (
    <div className='row' style={{ paddingLeft: '5vh', paddingTop: '5vh' }}>

      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <h4>По потреблению газа (куб.метр)</h4>
        </div>
      </div>

      <div className='row' id='Chart'>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};
