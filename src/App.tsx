import { useState, useEffect, useCallback } from 'react'
import "./styles.css";
import WeekDisplay from './cal/WeekDisplay.tsx'
import RecipeCardList from './recipes/RecipeCardList.tsx';
import { useSelector } from 'react-redux'
import { Ingredient, ScheduledRecipe } from './types.tsx';
import IngredientList from './ingredients/IngredientList.tsx';



function App() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [weekdays, setWeekdays] = useState<Array<ScheduledRecipe>>([]);
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([]);
  const currentWeekStart = useSelector((state: any) => state.currentWeekStart.value);

  const fetchDataFromBackend = useCallback(async () => {
    console.log("Getting updated data from backend!")
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
          // when response is not found, stil make sure to update scheduledRecipe to null so that we display "No Recipe"
          if (response.status == 404) {
              return null
          }
          return response.json();
      })
      .then((data) => {
          setWeekdays(data);
      })


      // Gets scheduled recipes for the week
    fetch(`http://localhost:8080/api/storedIngredients`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      
      credentials: "include", // Needed if using cookies/authentication
      })
      .then((response) => {
          // when response is not found, stil make sure to update scheduledRecipe to null so that we display "No Recipe"
          if (response.status == 404) {
              return null
          }
          return response.json();
      })
      .then((data) => {
          //update this somehow
          setIngredients(data);
      })

  }, [currentWeekStart])

  // responsible for updating all data that flows downstream
  useEffect(() => {
    fetchDataFromBackend()
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
        <div className='row'>
          <div className = 'col'> 
            <RecipeCardList recipes={recipes} updateDataFunc={fetchDataFromBackend}></RecipeCardList>
            <button> Add New Recipe </button>
          </div>
          <div className='col'>
             <IngredientList ingredients={ingredients} updateDataFunc={fetchDataFromBackend}></IngredientList>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
