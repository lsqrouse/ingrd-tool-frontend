import {
    format,
    isSameDay,
    addDays
} from "date-fns";
import { Key } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateSelectedDate } from '../slicers/selectedDate';
import { ScheduledRecipe } from "../types";

export interface Props {
    scheduledRecipe: ScheduledRecipe,
    key: number
}


const DayCell = ({scheduledRecipe}: Props) => {
    const selectedDate = useSelector((state: any) => state.selectedDate.value)
    const currentDate = scheduledRecipe.scheduledDate;
    const dispatch = useDispatch();

    const dateFormat = "d";
    let formattedDate = format(addDays(currentDate, 1), dateFormat);

    return <div
        //add selected class when current and selected dates match
        className={`col cell ${
        isSameDay(currentDate, new Date())
            ? "today"
            : isSameDay(currentDate, selectedDate)
            ? "selected"
            : ""
        }`}
        key={currentDate as unknown as Key}

        onClick={() => {
            dispatch(updateSelectedDate(currentDate))
        }}>
        <span className="number">{formattedDate}</span>
        <span className="bg">{formattedDate}</span>
        
        <span className="recipe">{scheduledRecipe.recipeDef == undefined ? "No Recipe" : scheduledRecipe.recipeDef.recipeName} </span>
        <p></p>
    </div>;
  };


export default DayCell;
