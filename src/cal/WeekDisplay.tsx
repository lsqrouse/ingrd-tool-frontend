import {useState } from "react";
import {
  format,
  subWeeks,
  addWeeks,
  startOfWeek,
  addDays,
  getWeek,
} from "date-fns";
import DayCell from "./DayCell";
import CalHeader from "./CalHeader";
import { ScheduledRecipe } from "../types";
import { useSelector } from "react-redux";

export interface Props {
  weekdays: Array<ScheduledRecipe>
}
const WeekDisplay = ({weekdays}: Props) => {
  const currentWeekStart = useSelector((state: any) => state.currentWeekStart.value);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));


  const changeWeekHandler = (btnType: string) => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
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
        <div>{currentWeek}</div>
        <div className="col col-end" onClick={() => changeWeekHandler("next")}>
          <div className="icon">next week</div>
        </div>
      </div>
    );
  };

  // Format all my strings
  const headerFormat = "MMM yyyy";
  let formattedHeader = format(currentMonth, headerFormat);     



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