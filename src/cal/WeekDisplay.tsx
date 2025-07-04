import {useState } from "react";
import {
  format,
  subWeeks,
  addWeeks,
  getMonth,
  addDays,
  getWeek,
} from "date-fns";
import DayCell from "./DayCell";
import CalHeader from "./CalHeader";
import { ScheduledRecipe } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentWeekStart } from "../slicers/currentWeekStart";

export interface Props {
  weekdays: Array<ScheduledRecipe>
}
const WeekDisplay = ({weekdays}: Props) => {
  const currentWeekStart = useSelector((state: any) => state.currentWeekStart.value);
  const dispatch = useDispatch();

  const changeWeekHandler = (btnType: string) => {
    if (btnType === "prev") {
      dispatch(updateCurrentWeekStart(addDays(currentWeekStart, -7)))
    }
    if (btnType === "next") {
      dispatch(updateCurrentWeekStart(addDays(currentWeekStart, 7)))
    }
  }

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];

    // builds the list of days for this week
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(currentWeekStart, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }


  const renderFooter = () => {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={() => changeWeekHandler("prev")}>
            prev week
          </div>
        </div>
        <div className="col col-end" onClick={() => changeWeekHandler("next")}>
          <div className="icon">next week</div>
        </div>
      </div>
    );
  };

  // Format all my strings
  const headerFormat = "MMM yyyy";
  let formattedHeader = format(currentWeekStart, headerFormat);     
  return (
    <div className="calendar">
      <CalHeader header={formattedHeader} ></CalHeader>
      {renderDays()}
      <div className="row">
        {weekdays.map((date, index) => {
          return (<DayCell scheduledRecipe={date} key={index}></DayCell>)
        })}
      </div>


      {renderFooter()}
    </div>
  );
}

export default WeekDisplay;