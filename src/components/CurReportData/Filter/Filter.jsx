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

const yearList = [];
var curYear = new Date().getFullYear();
let i = 0;
var yearCount = parseInt(curYear) - parseInt(2012);
while (i < yearCount) {
  yearList.push({ id: 2013 + i, name: 2013 + i + " год" });
  i++;
}

export const Filter = ({ orgId, orgName, startYear, startPeriod }) => {
  const { data: periods, error, isLoading } = useGetPeriodsQuery();
  const { data: organizations } = useGetOrganizationsQuery({ orgId: orgId });
  const [state, setState] = useState({
    selectSecondYear: startYear,
    selectSecondYearText: startYear + " год",
    selectSecondPeriod: startPeriod,
    selectSecondPeriodText: "январь",
    selectOrganization: orgId,
    selectOrganizationText: orgName,
    valid: false,
  });

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

  const handleSelectSecondPeriod = (e) => {
    let updatedValue = {
      selectSecondPeriod: e.target.value,
      selectSecondPeriodText: e.target.options[e.target.selectedIndex].text,
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
          <div className="col-md-4" style={{ float: "left" }}>
            <strong>{orgName}</strong>
            <br></br>
            <label>Общая информация за период:</label>
            <br></br>
            <strong>
              {" "}
              {state.selectSecondPeriodText} {state.selectSecondYearText}
            </strong>
          </div>
          <div className="col-md-3">
            <fieldset
              style={{ float: "left", marginRight: "1vh", width: "20vw" }}
            >
              <legend>Организация:</legend>
              <select
                className="form-select"
                style={{ marginBottom: "1vh" }}
                onChange={handleSelectOrganization}
                value={state.selectOrganization}
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
            <fieldset style={{ float: "left", marginRight: "1vh" }}>
              <legend>Период:</legend>
              <>
                <div style={{ float: "left", marginRight: "1vh" }}>
                  <select
                    className="form-select select-year"
                    style={{ marginBottom: "1vh" }}
                    onChange={handleSelectSecondYear}
                    value={state.selectSecondYear}
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
                <div style={{ float: "left" }}>
                  <select
                    className="form-select"
                    style={{ marginBottom: "1vh" }}
                    onChange={handleSelectSecondPeriod}
                    value={state.selectSecondPeriod}
                  >
                    <option value={0}>Выберите...</option>
                    {periods.map((period) => (
                      <option value={period.id}>{period.name}</option>
                    ))}
                  </select>
                </div>
              </>
            </fieldset>
          </div>
          {/* <div className='col-md-2'>
            <button className='btn btn-primary' style={{ marginTop: '5vh' }} onClick={handleClick}>
              <SearchIcon></SearchIcon>
              Показать</button>
          </div> */}
        </>
      ) : null}
      <ElectroEnergy
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondPeriod}
        endPeriodText={state.selectSecondPeriodText}
        organization={state.selectOrganization}
      />

      <Water
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondPeriod}
        endPeriodText={state.selectSecondPeriodText}
        organization={state.selectOrganization}
      />

      <Heat
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondPeriod}
        endPeriodText={state.selectSecondPeriodText}
        organization={state.selectOrganization}
      />

      <OilFuel
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondPeriod}
        endPeriodText={state.selectSecondPeriodText}
        organization={state.selectOrganization}
      />

      <Gaz
        endYear={state.selectSecondYear}
        endPeriod={state.selectSecondPeriod}
        endPeriodText={state.selectSecondPeriodText}
        organization={state.selectOrganization}
      />
    </>
  );
};
