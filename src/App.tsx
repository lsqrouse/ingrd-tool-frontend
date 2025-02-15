import { useState, useEffect } from 'react'
import "./styles.css";
import WeekPlanner from './cal/WeekPlanner'
import DayDetails from "./cal/DayDetails.tsx";
import RecipeCardList from './RecipeCardList.tsx';
import { useSelector, useDispatch } from 'react-redux'


function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDateIdx, setSelectedDateIdx] = useState(-1);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const weeklyRecipeList = useSelector((state: any) => state.weekRecipeList.value)

  const showDetailsHandle = (dayStr: string) => {
    setData(dayStr);
    setShowDetails(true);
  };

  useEffect(() => {
    setLoading(true);

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
        <WeekPlanner showDetailsHandle={showDetailsHandle} recipeList={weeklyRecipeList} setDayIndex={setSelectedDateIdx} />
        <br />
        {showDetails && <DayDetails data={data} />}
        <RecipeCardList recipes={recipes} selectedDateIdx={selectedDateIdx}></RecipeCardList>
      </div>

    </div>
  )
}

export default App
