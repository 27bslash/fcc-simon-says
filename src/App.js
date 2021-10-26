import logo from "./logo.svg";
import "./App.css";
import Container from "./components/container";
import ScoreBoard from "./components/score";
import { useState } from "react";
function App() {
  const [score, setScore] = useState(0);
  const updateScore = (score) => {
    setScore(score);
  };
  return (
    <div className="App">
      <Container updateScore={updateScore} />
      <ScoreBoard score={score} />
    </div>
  );
}

export default App;
