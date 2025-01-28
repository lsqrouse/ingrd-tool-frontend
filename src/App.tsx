import { useState } from 'react'
import "./styles.css";
import WeekPlanner from './cal/WeekPlanner'
import DayDetails from "./cal/DayDetails.tsx";
import RecipeCardList from './RecipeCardList.tsx';


function App() {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState("");

  const showDetailsHandle = (dayStr: string) => {
    setData(dayStr);
    setShowDetails(true);
  };

  const testRecipes = ["Test Title", "Hello There", "Recipe 3"]
  const setRecipes = ["", "", "", "", "Test Recipe!", "", ""]

  return (
    <div className="App">
      <h1>Week View Calendar with react</h1>
      <br />
      <h2>Example</h2>
      <WeekPlanner showDetailsHandle={showDetailsHandle} setRecipes={setRecipes} />
      <br />
      {showDetails && <DayDetails data={data} />}
      <RecipeCardList recipes={testRecipes}></RecipeCardList>
    </div>
  )
}

export default App
