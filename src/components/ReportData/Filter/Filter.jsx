import style from "./Filter.module.css";
import { useEffect, useState } from "react";
import {
  useGetOrganizationsQuery,
  useGetPeriodsQuery,
} from "../../../services/dictionary";
import PostPreloader from "../../../UI/PostPreloader";
import ErrorMessage from "../../ErrorMessage";
import ElectroEnergy from "../ElectroEnergy/";
import Water from "../Water/";
import Heat from "../Heat";
import OilFuel from "../OilFuel";
import Gaz from "../Gaz";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";

const yearList = [];
var curYear = new Date().getFullYear();
let i = 0;
var yearCount = parseInt(curYear) - parseInt(2012);
while (i < yearCount) {
  yearList.push({ id: 2013 + i, name: 2013 + i + "год" });
  i++;
}

export const Filter = ({ orgId, orgName }) => {
  const { data: periods, error, isLoading } = useGetPeriodsQuery();
  const { data: organizations } = useGetOrganizationsQuery({ orgId: orgId });

  const [state, setState] = useState({
    selectFirstYear: new Date().getFullYear() - 1,
    selectFirstYearText: new Date().getFullYear() - 1 + " год",
    selectSecondYear: new Date().getFullYear(),
    selectSecondYearText: new Date().getFullYear() + " год",
    selectFirstQuartal: 8,
    selectFirstQuartalText: "январь",
    selectSecondQuartal: 8,
    selectSecondQuartalText: "январь",
    selectOrganization: orgId,
    selectOrganizationText: orgName,
    valid: false,
  });

  const handleSelectFirstYear = (e) => {
    let updatedValue = {
      selectFirstYear: e.target.value,
      selectFirstYearText: e.target.options[e.target.selectedIndex].text,
    };

    setState((state) => ({
      ...state,
      ...updatedValue,
    }));
  };

  const handleSelectSecondYear = (e) => {
    let updatedValue = {
      selectSecondYear: e.target.value,
      selectSecondYearText: e.target.options[e.target.selectedIndex].text,
    };

    setState((state) => ({
      ...state,
      ...updatedValue,
    }));
  };

  const handleSelectFirstPeriod = (e) => {
    let updatedValue = {
      selectFirstQuartal: e.target.value,
      selectFirstQuartalText: e.target.options[e.target.selectedIndex].text,
    };

    setState((state) => ({
      ...state,
      ...updatedValue,
    }));
  };

  const handleSelectSecondPeriod = (e) => {
    let updatedValue = {
      selectSecondQuartal: e.target.value,
      selectSecondQuartalText: e.target.options[e.target.selectedIndex].text,
    };

    setState((state) => ({
      ...state,
      ...updatedValue,
    }));
  };

  const handleSelectOrganization = (e) => {
    let updatedValue = {
      selectOrganization: e.target.value,
      selectOrganizationText: e.target.options[e.target.selectedIndex].text,
    };

    setState((state) => ({
      ...state,
      ...updatedValue,
    }));
  };

  return (
    <>
      {error ? (
        <ErrorMessage />
      ) : isLoading ? (
        <center>
          <PostPreloader />
        </center>
      ) : organizations ? (
        <>
          <div className="col-md-4">
            <strong>{orgName}</strong>
            <br></br>
            <label>Сравнительная информация за периоды:</label>
            <br></br>
            <strong>
              {state.selectFirstYearText} {state.selectFirstQuartalText} -{" "}
              {state.selectSecondYearText} {state.selectSecondQuartalText}
            </strong>
          </div>
          <div className="col-md-3">
            <fieldset
              style={{ float: "left", paddingRight: "10%", width: "20vw" }}
            >
              <legend>Организация:</legend>
              <select
                className="form-select"
                style={{ marginBottom: "1vh" }}
                onChange={handleSelectOrganization}
              >
                {organizations.map((organization) =>
                  organization.id == 1 ? (
                    <option selected value={organization.id}>
                      {organization.name}
                    </option>
                  ) : (
                    <option value={organization.id}>{organization.name}</option>
                  )
                )}
              </select>
            </fieldset>
          </div>
          <div className="col-md-3">
            <fieldset>
              <legend>Период:</legend>
              <>
                <div
                  style={{ float: "left", marginRight: "1vh", width: "40%" }}
                >
                  <select
                    className="form-select select-year"
                    style={{ marginBottom: "1vh" }}
                    onChange={handleSelectFirstYear}
                  >
                    {yearList.map((year) =>
                      state.selectFirstYear == year.id ? (
                        <option selected value={year.id}>
                          {year.name}
                        </option>
                      ) : (
                        <option value={year.id}>{year.name}</option>
                      )
                    )}
                  </select>
                  <select
                    className="form-select select-year"
                    onChange={handleSelectSecondYear}
                  >
                    {yearList.map((year) =>
                      state.selectSecondYear == year.id ? (
                        <option selected value={year.id}>
                          {year.name}
                        </option>
                      ) : (
                        <option value={year.id}>{year.name}</option>
                      )
                    )}
                  </select>
                </div>
                <div style={{ float: "left", width: "40%" }}>
                  <select
                    className="form-select"
                    style={{ marginBottom: "1vh" }}
                    onChange={handleSelectFirstPeriod}
                  >
                    {periods.map((period) =>
                      state.selectFirstQuartal == period.id ? (
                        <option selected value={period.id}>
                          {period.name}
                        </option>
                      ) : (
                        <option value={period.id}>{period.name}</option>
                      )
                    )}
                  </select>
                  <select
                    className="form-select"
                    onChange={handleSelectSecondPeriod}
                  >
                    {periods.map((period) =>
                      state.selectSecondQuartal == period.id ? (
                        <option selected value={period.id}>
                          {period.name}
                        </option>
                      ) : (
                        <option value={period.id}>{period.name}</option>
                      )
                    )}
                  </select>
                </div>
              </>
            </fieldset>
          </div>

          {/* <fieldset style={{ float: 'left', marginRight: '1vh' }}>
              <legend>Вид:</legend>
              <select className='form-select' style={{ marginBottom: '1vh' }} onChange={handleSelectType}>
                <option>Выберите...</option>
                <option value={1}>Отклонение</option>
                <option value={2}>План</option>
              </select>
            </fieldset> */}

          {/* <div className='col-md-2'>
            <button className='btn btn-primary' style={{ marginTop: '10vh' }} onClick={handleClick}>
              <SearchIcon></SearchIcon>
              Показать</button>
          </div> */}
        </>
      ) : null}
      <ElectroEnergy
        startYear={state.selectFirstYear}
        startPeriod={state.selectFirstQuartal}
        startPeriodText={state.selectFirstQuartalText}
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondQuartal}
        endPeriodText={state.selectSecondQuartalText}
        organization={state.selectOrganization}
      />

      <Water
        startYear={state.selectFirstYear}
        startPeriod={state.selectFirstQuartal}
        startPeriodText={state.selectFirstQuartalText}
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondQuartal}
        endPeriodText={state.selectSecondQuartalText}
        organization={state.selectOrganization}
      />

      <Heat
        startYear={state.selectFirstYear}
        startPeriod={state.selectFirstQuartal}
        startPeriodText={state.selectFirstQuartalText}
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondQuartal}
        endPeriodText={state.selectSecondQuartalText}
        organization={state.selectOrganization}
      />

      <OilFuel
        startYear={state.selectFirstYear}
        startPeriod={state.selectFirstQuartal}
        startPeriodText={state.selectFirstQuartalText}
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondQuartal}
        endPeriodText={state.selectSecondQuartalText}
        organization={state.selectOrganization}
      />

      <Gaz
        startYear={state.selectFirstYear}
        startPeriod={state.selectFirstQuartal}
        startPeriodText={state.selectFirstQuartalText}
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondQuartal}
        endPeriodText={state.selectSecondQuartalText}
        organization={state.selectOrganization}
      />
    </>
  );
};
