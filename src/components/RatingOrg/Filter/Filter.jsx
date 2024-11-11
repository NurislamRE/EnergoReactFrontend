import style from "./Filter.module.css";
import { useState } from "react";
import {
  useGetOrganizationsQuery,
  useGetPeriodsQuery,
} from "../../../services/dictionary";
import PostPreloader from "../../../UI/PostPreloader";
import ErrorMessage from "../../ErrorMessage";
import RatingData from "../RatingData";

const yearList = [];
var curYear = new Date().getFullYear();
let i = 0;
var yearCount = parseInt(curYear) - parseInt(2012);
while (i < yearCount) {
  yearList.push({ id: 2013 + i, name: 2013 + i + " год" });
  i++;
}

export const Filter = () => {
  const {
    data: periods,
    error,
    isLoading,
  } = useGetPeriodsQuery({ name: "RatingOrg" });
  const { data: organizations } = useGetOrganizationsQuery();
  const [state, setState] = useState({
    selectSecondYear: new Date().getFullYear(),
    selectSecondPeriod: 5,
    selectSecondPeriodText: "1 полугодие",
    valid: false,
  });

  const handleSelectSecondYear = (e) => {
    let updatedValue = {
      selectSecondYear: e.target.value,
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
            <label>Оценка показателей энергосбережения за:</label>
            <br></br>
            <strong>
              {state.selectSecondPeriod == 5
                ? state.selectSecondYear +
                  " год " +
                  state.selectSecondPeriodText
                : state.selectSecondYear + " " + state.selectSecondPeriodText}
              {/* {state.selectSecondYear} {state.selectSecondPeriodText} */}
            </strong>
          </div>
          <div className="col-md-8">
            <fieldset
              style={{ float: "left", marginRight: "1vh", width: "40%" }}
            >
              <legend>Период:</legend>
              <>
                <div
                  style={{ float: "left", marginRight: "1vh", width: "40%" }}
                >
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
                <div style={{ float: "left", width: "40%" }}>
                  <select
                    className="form-select"
                    style={{ marginBottom: "1vh" }}
                    onChange={handleSelectSecondPeriod}
                    value={state.selectSecondPeriod}
                  >
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
      <RatingData
        year={state.selectSecondYear}
        period={state.selectSecondPeriod}
      />      
    </>
  );
};
