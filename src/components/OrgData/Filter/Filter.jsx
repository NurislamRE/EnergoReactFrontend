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

export const Filter = ({ orgId, orgName }) => {
  const {
    data: periods,
    error,
    isLoading,
  } = useGetPeriodsQuery({ name: "OrgData" });
  const { data: organizations } = useGetOrganizationsQuery({ orgId: orgId });
  const [state, setState] = useState({
    selectStartYear: 2023,
    selectStartYearText: 2023 + " год",
    selectStartPeriod: 8,
    selectStartPeriodText: "январь",
    selectOrganization: orgId,
    selectOrganizationText: orgName,
    valid: false,
  });

  const handleSelectStartYear = (e) => {
    let updatedValue = {
      selectStartYear: e.target.value,
      selectStartYearText: e.target.options[e.target.selectedIndex].text,
    };

    setState((state) => ({
      ...state,
      ...updatedValue,
    }));
  };

  const handleSelectStartPeriod = (e) => {
    let updatedValue = {
      selectStartPeriod: e.target.value,
      selectStartPeriodText: e.target.options[e.target.selectedIndex].text,
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
            <strong>{state.selectOrganizationText}</strong>
            <br></br>
            <label>Редактирование данных за период:</label>
            <br></br>
            <strong>
              {" "}
              {state.selectStartPeriodText} {state.selectStartYearText}
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
                    onChange={handleSelectStartYear}
                    value={state.selectStartYear}
                  >
                    {yearList.map((year) =>
                      state.selectStartYear == year.id ? (
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
                    onChange={handleSelectStartPeriod}
                    value={state.selectStartPeriod}
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
        </>
      ) : null}
      <ElectroEnergy
        year={state.selectStartYear}
        period={state.selectStartPeriod}
        organizationId={state.selectOrganization}
      />

      <Water
        year={state.selectStartYear}
        period={state.selectStartPeriod}
        organizationId={state.selectOrganization}
      />

      <Heat
        year={state.selectStartYear}
        period={state.selectStartPeriod}
        organizationId={state.selectOrganization}
      />

      <OilFuel
        year={state.selectStartYear}
        period={state.selectStartPeriod}
        organizationId={state.selectOrganization}
      />

      <Gaz
        year={state.selectStartYear}
        period={state.selectStartPeriod}
        organizationId={state.selectOrganization}
      />
    </>
  );
};
