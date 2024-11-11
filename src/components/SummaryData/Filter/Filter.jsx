import style from './Filter.module.css';
import { useEffect, useState } from 'react';
import { useGetOrganizationsQuery, useGetPeriodsQuery } from '../../../services/dictionary';
import PostPreloader from '../../../UI/PostPreloader';
import ErrorMessage from '../../ErrorMessage';
import SearchIcon from '@mui/icons-material/Search';
import OrganizationData from '../OrganizationData'

const yearList = [];
var curYear = new Date().getFullYear();
let i = 0;
var yearCount = parseInt(curYear) - parseInt(2012);
while (i < yearCount) {
  yearList.push({ id: 2013 + i, name: 2013 + i + " год" });
  i++;
}

export const Filter = () => {
  const { data: periods, error, isLoading } = useGetPeriodsQuery();

  const [state, setState] = useState({
    selectFirstYear: new Date().getFullYear() - 1,
    selectFirstYearText: new Date().getFullYear() - 1 + ' год',
    selectSecondYear: new Date().getFullYear(),
    selectSecondYearText: new Date().getFullYear() + ' год',
    selectFirstPeriod: 8,
    selectFirstPeriodText: 'январь',
    selectSecondPeriod: 8,
    selectSecondPeriodText: 'январь',
    valid: false,
  });


  const handleSelectFirstYear = (e) => {
    let updatedValue = { selectFirstYear: e.target.value, selectFirstYearText: e.target.options[e.target.selectedIndex].text }

    setState(state => ({
      ...state,
      ...updatedValue
    }));
  }

  const handleSelectSecondYear = (e) => {
    let updatedValue = { selectSecondYear: e.target.value, selectSecondYearText: e.target.options[e.target.selectedIndex].text }

    setState(state => ({
      ...state,
      ...updatedValue
    }));
  }

  const handleSelectFirstPeriod = (e) => {
    let updatedValue = { selectFirstPeriod: e.target.value, selectFirstPeriodText: e.target.options[e.target.selectedIndex].text }

    setState(state => ({
      ...state,
      ...updatedValue
    }));
  }

  const handleSelectSecondPeriod = (e) => {
    let updatedValue = { selectSecondPeriod: e.target.value, selectSecondPeriodText: e.target.options[e.target.selectedIndex].text }

    setState(state => ({
      ...state,
      ...updatedValue
    }));
  }

  return (
    <>
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <center>
          <PostPreloader />
        </center>
      ) : <>
        <div className='col-md-4' style={{ float: 'left' }}>
          <strong>Общий свод за периоды:</strong>
          <br></br>
          <p>{state.selectFirstYearText} {state.selectFirstPeriodText} - {state.selectSecondYearText} {state.selectSecondPeriodText}</p>
        </div>
        <div className='col-md-4'>
          <fieldset>
            <legend>Период:</legend>
            <>
              <div style={{ float: 'left', marginRight: '1vh', width: '40%' }}>
                <select className='form-select select-year' style={{ marginBottom: '1vh' }} onChange={handleSelectFirstYear}>
                  {yearList.map(year => (
                    state.selectFirstYear == year.id ?
                      <option selected value={year.id}>{year.name}</option> :
                      <option value={year.id}>{year.name}</option>
                  ))}
                </select>
                <select className='form-select select-year' onChange={handleSelectSecondYear}>
                  {yearList.map(year => (
                    state.selectSecondYear == year.id ?
                      <option selected value={year.id}>{year.name}</option> :
                      <option value={year.id}>{year.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ float: 'left', width: '40%' }}>
                <select className='form-select' style={{ marginBottom: '1vh' }} onChange={handleSelectFirstPeriod}>
                  {periods.map(period => (
                    state.selectFirstPeriod == period.id ?
                      <option selected value={period.id}>{period.name}</option> :
                      <option value={period.id}>{period.name}</option>
                  ))}
                </select>
                <select className='form-select' onChange={handleSelectSecondPeriod}>
                  {periods.map(period => (
                    state.selectFirstPeriod == period.id ?
                      <option selected value={period.id}>{period.name}</option> :
                      <option value={period.id}>{period.name}</option>
                  ))}
                </select>
              </div>
            </>
          </fieldset>
        </div>
      </>}
      <OrganizationData
        startYear={state.selectFirstYear}
        startPeriod={state.selectFirstPeriod}
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondPeriod}
      />
    </>

  );
};
