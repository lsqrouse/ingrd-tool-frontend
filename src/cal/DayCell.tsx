import {
    format,
    isSameDay
} from "date-fns";
import { RecipeDay } from "../types";
import { Key, useEffect, useState } from "react";
import { current } from "@reduxjs/toolkit";

export interface Props {
    currentDate: Date,
    selectedDate: Date,
    displayIndex: number,
    onDateClickHandle: (d: Date, s: string, n: number) => void
}


const DayCell = (props: Props) => {
    const currentDate = props.currentDate;
    const selectedDate = props.selectedDate;
    const displayIndex = props.displayIndex;

    const [scheduledRecipe, setScheduledRecipe] = useState(null);

      const dateFormat = "d";
      let formattedDate = format(currentDate, dateFormat);


    useEffect(() => {
        console.log("querying for ", currentDate.toLocaleDateString())
            fetch(`http://localhost:8080/api/scheduledRecipe?date=${currentDate.toLocaleDateString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            
            credentials: "include", // Needed if using cookies/authentication
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("got back", data)
                setScheduledRecipe(data)
            })
        }, []);

    return <div
            className={`col cell ${
            isSameDay(currentDate, new Date())
                ? "today"
                : isSameDay(currentDate, selectedDate)
                ? "selected"
                : ""
            }`}
            key={currentDate as unknown as Key}
        onClick={() => {
            const dayStr = currentDate.toDateString();
            props.onDateClickHandle(currentDate, dayStr, displayIndex);
        }}>
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
            
            <span className="recipe">{

            scheduledRecipe == undefined ?
            "No Recipe" : scheduledRecipe.recipeName
            } </span>
            <p></p>
    </div>;
  };


export default DayCell;



        //   days.push(
        //     <div
        //       className={`col cell ${
        //         isSameDay(day, new Date())
        //           ? "today"
        //           : isSameDay(day, selectedDate)
        //           ? "selected"
        //           : ""
        //       }`}
        //       key={day as unknown as Key}
        //     onClick={() => {
        //       const dayStr = cloneDay.toDateString();
        //       onDateClickHandle(cloneDay, dayStr, i);
        //     }}>
        //       <span className="number">{formattedDate}</span>
        //       <span className="bg">{formattedDate}</span>
              
        //       <span className="recipe">{

        //         recipeList[i] != undefined
        //           ? recipeList[i]
        //           : "No Recipe"
        //       } </span>
        //       <p></p>
        //     </div>
        //   );