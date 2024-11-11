import style from "./RatingData.module.css";
import React from "react";
import { useGetRatingDataQuery } from "../../../services/getData";
import _Data from "../_Data";

export const RatingData = ({ year, period }) => {
  const { data: reportData } = useGetRatingDataQuery({
    year: +year,
    period: +period,
  }); 

  return (
    <div className="row" style={{ paddingLeft: "5vh", paddingTop: "5vh" }}>
      <div className="row">
        <table className="table table-hover" id="my-table">
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Энергосбережение</th>
              <th>Пожарная безопасность</th>
              <th>Охрана труда</th>
              <th>Общая оценка</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {reportData &&
              reportData.map((item, index) => (
                <_Data
                  key={index}
                  index={index}
                  item={item}
                  year={year}
                  period={period}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
