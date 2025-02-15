import { Key, useEffect, useState } from "react";
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
import DayCell from "./DayCell";
import CalHeader from "./CalHeader";
import { current } from "@reduxjs/toolkit";

type WeekyPlannerProps = {
  showDetailsHandle: (dayStr: string) => void,
  setDayIndex: (idx: number) => void,
}


const WeekPlanner = ({showDetailsHandle, setDayIndex}: WeekyPlannerProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
    const [selectedDate, setSelectedDate] = useState(new Date());

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

    const onDateClickHandle = (day: Date, dayStr: string, idx: number) => {
      setSelectedDate(day);
      showDetailsHandle(dayStr);
      setDayIndex(idx)
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

    let dates = [];

    let currentDay = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      dates[i] = currentDay;
      currentDay = addDays(currentDay, 1);
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
      <CalHeader data={formattedHeader} ></CalHeader>
      {renderDays()}
      <div className="row">
        {dates.map((date, index) => {
          console.log("day is", date)
          return (<DayCell currentDate={date} selectedDate={selectedDate} displayIndex={index} onDateClickHandle={onDateClickHandle}></DayCell>)
        })}
      </div>


      {renderFooter()}
    </div>
  );
}

export default WeekPlanner;