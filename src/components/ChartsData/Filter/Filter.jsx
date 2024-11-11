import { useContext, useState } from "react";
import {
  useGetMainOrganizationsQuery,
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
import { backdropContext } from "../../../context/backdropContext";
import Cookies from "js-cookie";

export const Filter = () => {
  const { data: periods, error, isLoading } = useGetPeriodsQuery();
  const [selectSecondYear, setSelectSecondYear] = useState();
  const [selectSecondYearText, setSelectSecondYearText] = useState();
  const [selectSecondPeriod, setSelectSecondPeriod] = useState();
  const [selectSecondPeriodText, setSelectSecondPeriodText] = useState();
  const { data: organizations } = useGetMainOrganizationsQuery();
  const [selectOrganization, setSelectOrganization] = useState();

  const [selectOrganizationText, setSelectOrganizationText] = useState();

  const [reportData, setChartsData] = useState();

  const handleSelectSecondYear = (e) => {
    setSelectSecondYearText(e.target.options[e.target.selectedIndex].text);
    setSelectSecondYear(e.target.value);
  };

  const handleSelectSecondPeriod = (e) => {
    setSelectSecondPeriodText(e.target.options[e.target.selectedIndex].text);
    setSelectSecondPeriod(e.target.value);
  };

  const handleSelectOrganization = (e) => {
    setSelectOrganizationText(e.target.options[e.target.selectedIndex].text);
    setSelectOrganization(e.target.value);
  };

  const { openBackdrop, closeBackdrop } = useContext(backdropContext);

  const handleClick = async () => {
    openBackdrop();

    const headers = new Headers();
    headers.set("Authorization", `Bearer ${Cookies.get("X-Jwt-Token")}`);
    const options = {
      method: "GET",
      headers: headers,
    };

    const result = await fetch(
      `/getChartsData?endYear=${selectSecondYear}&companyId=${selectOrganization}`,
      options
    );
    console.log(result);
    if (result.ok) {
      const presidentOrders = await result.json();
      setChartsData(presidentOrders);
      closeBackdrop();
      return presidentOrders;
    }
    return [];

    // fetch(
    //   `/getChartsData?endYear=${selectSecondYear}&companyId=${selectOrganization}`
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setChartsData(data);
    //     closeBackdrop();
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
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
            <strong>
              <h4>{selectOrganizationText}</h4>
            </strong>
            <p>Диаграмма за {selectSecondYearText}</p>
          </div>
          <div className="col-md-5">
            <fieldset style={{ float: "left", marginRight: "1vh" }}>
              <legend>Организация:</legend>

              <select
                className="form-select"
                style={{ marginBottom: "1vh" }}
                onChange={handleSelectOrganization}
                value={selectOrganization}
              >
                <option value={0}>Выберите...</option>
                {organizations.map((organization) => (
                  <option value={organization.id}>
                    {organization.companyName}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset style={{ float: "left", marginRight: "1vh" }}>
              <legend>Период:</legend>
              <>
                <div style={{ float: "left", marginRight: "1vh" }}>
                  <select
                    className="form-select select-year"
                    style={{ marginBottom: "1vh" }}
                    onChange={handleSelectSecondYear}
                    value={selectSecondYear}
                  >
                    <option value={0}>Выберите...</option>
                    <option value={2019}>2019 год</option>
                    <option value={2020}>2020 год</option>
                    <option value={2021}>2021 год</option>
                    <option value={2022}>2022 год</option>
                    <option value={2023}>2023 год</option>
                  </select>
                </div>
                {/* <div style={{ float: 'left' }}>
                  <select className='form-select' style={{ marginBottom: '1vh' }} onChange={handleSelectSecondPeriod} value={selectSecondPeriod}>
                    <option value={0}>Выберите...</option>
                    {periods.map(period => (
                      <option value={period.id}>
                        {period.name}
                      </option>
                    ))}
                  </select>
                </div> */}
              </>
            </fieldset>
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary"
              style={{ marginTop: "5vh" }}
              onClick={handleClick}
            >
              <SearchIcon></SearchIcon>
              Показать
            </button>
          </div>
        </>
      ) : null}

      <>
        {reportData ? (
          <ElectroEnergy
            reportData={reportData[3]}
            endYear={selectSecondYear}
            endPeriodText={selectSecondPeriodText}
          />
        ) : null}

        {reportData ? (
          <Water
            reportData={reportData[0]}
            endYear={selectSecondYear}
            endPeriodText={selectSecondPeriodText}
          />
        ) : null}

        {reportData ? (
          <Heat
            reportData={reportData[2]}
            endYear={selectSecondYear}
            endPeriodText={selectSecondPeriodText}
          />
        ) : null}

        {reportData ? (
          <OilFuel
            reportData={reportData[1]}
            endYear={selectSecondYear}
            endPeriodText={selectSecondPeriodText}
          />
        ) : null}

        {reportData ? (
          <Gaz
            reportData={reportData[4]}
            endYear={selectSecondYear}
            endPeriodText={selectSecondPeriodText}
          />
        ) : null}
      </>
    </>
  );
};
