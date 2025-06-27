import { useState, useEffect } from 'react'
import "./styles.css";
import WeekDisplay from './cal/WeekDisplay.tsx'
import DayDetails from "./cal/DayDetails.tsx";
import RecipeCardList from './recipes/RecipeCardList.tsx';
import { useSelector } from 'react-redux'
import { ScheduledRecipe } from './types.tsx';



function App() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [weekdays, setWeekdays] = useState<Array<ScheduledRecipe>>([]);
  const currentWeekStart = useSelector((state: any) => state.currentWeekStart.value);


  // responsible for updating all data that flows downstream
  useEffect(() => {
    setLoading(true);

    // first get recipeDefinitions
    fetch("http://localhost:8080/api/recipeDef", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Needed if using cookies/authentication
    })
    .then((response) => response.json())
    .then((data) => {
      setRecipes(data)
      setLoading(false)
    })

    // Gets scheduled recipes for the week
    fetch(`http://localhost:8080/api/weekRecipes?startDate=${currentWeekStart.toISOString()}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      
      credentials: "include", // Needed if using cookies/authentication
      })
      .then((response) => {
        console.log("week recipe resoponse is ", response)
          // when response is not found, stil make sure to update scheduledRecipe to null so that we display "No Recipe"
          if (response.status == 404) {
              return null
          }
          return response.json();
      })
      .then((data) => {
          //update this somehow
          setWeekdays(data);
      })

  }, []);


  
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <div className='body'>
        <h1>Week View Calendar with react</h1>
        <br />
        <h2>Example</h2>
        <WeekDisplay weekdays={weekdays}/>
        <br />
        <DayDetails/>
        <RecipeCardList recipes={recipes}></RecipeCardList>
      </div>

    </div>
  )
}

export default App
