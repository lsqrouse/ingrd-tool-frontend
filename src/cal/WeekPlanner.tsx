import { Key, useState } from "react";
import {
  format,
  subMonths,
  subWeeks,
  addWeeks,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
} from "date-fns";

type WeekyPlannerProps = {
  showDetailsHandle: (dayStr: string) => void,
  setRecipes: string[]
}


const WeekPlanner = ({showDetailsHandle, setRecipes}: WeekyPlannerProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    const [selectedDate, setSelectedDate] = useState(new Date());

    const changeMonthHandler = (btnType: string) => {
      if (btnType === "prev") {
        setCurrentMonth(subMonths(currentMonth, 1));
      }
      if (btnType === "next") {
        setCurrentMonth(addMonths(currentMonth, 1));
      }
    };

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

    const onDateClickHandle = (day: Date, dayStr: string) => {
      setSelectedDate(day);
      showDetailsHandle(dayStr);
    };

    const renderHeader = () => {
      const dateFormat = "MMM yyyy";
      // console.log("selected day", selectedDate);
      return (
        <div className="header row flex-middle">
            <div className="col col-start">
              {/* <div className="icon" onClick={() => changeMonthHandler("next")}>next month</div> */}

            <div className="col col-center">
              <span>{format(currentMonth, dateFormat)}</span>
            </div>
            <div className="col col-end">
              {/* <div className="icon" onClick={() => changeMonthHandler("next")}>next month</div> */}
            </div>
        </div>
        </div>
        
      );
    };

    const renderDays = () => {
      const dateFormat = "EEE";
      const days = [];
      let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
      for (let i = 0; i < 7; i++) {
        days.push(
          <div className="col col-center" key={i}>
            {format(addDays(startDate, i), dateFormat)}
            
          </div>
        );
      }
      return <div className="days row">{days}</div>;
    }

    const renderCells = () => {
      const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
      const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
      const dateFormat = "d";
      const rows = [];
      let days = [];
      let day = startDate;
      let formattedDate = "";

      while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
          formattedDate = format(day, dateFormat);
          const cloneDay = day;
          days.push(
            <div
              className={`col cell ${
                isSameDay(day, new Date())
                  ? "today"
                  : isSameDay(day, selectedDate)
                  ? "selected"
                  : ""
              }`}
              key={day as unknown as Key}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}>
              <span className="number">{formattedDate}</span>
              <span className="bg">{formattedDate}</span>
              
              <span className="recipe">{
                setRecipes[i] != ""
                  ? setRecipes[i]
                  : "No Recipe"
              } </span>
              <p></p>
            </div>
          );
        day = addDays(day, 1);
        }

        rows.push(
          <div className="row" key={day as unknown as Key}>
            {days}
          </div>
        );
        days = [];
      }
      return <div className="body">{rows}</div>;
    };

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


  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
    </div>
  );
}

export default WeekPlanner;