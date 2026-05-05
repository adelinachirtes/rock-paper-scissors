import { useState, type JSX } from "react";
import {
  FaRegHandRock,
  FaRegHandPaper,
  FaRegHandScissors,
} from "react-icons/fa";

import type { Choice, Result } from "./types";

const choices: Choice[] = ["rock", "paper", "scissors"];

const icons: Record<Choice, JSX.Element> = {
  rock: <FaRegHandRock />,
  paper: <FaRegHandPaper />,
  scissors: <FaRegHandScissors />,
};

const rules: Record<Choice, Choice[]> = {
  rock: ["scissors"],
  paper: ["rock"],
  scissors: ["paper"],
};

export default function App() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>("");

  const play = (player: Choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];
    
    setPlayerChoice(player);
    setComputerChoice(computer);

    if (player === computer) {
      setResult("It's a draw!");
    } else if (rules[player].includes(computer)) {
      setResult(`You win! ${player} beats ${computer}.`);
    } else {
      setResult(`You lose! ${computer} beats ${player}.`);
    }
  };

  return (
    <div className="container">
      <h1>Rock Paper Scissors</h1>

      <div className="buttons">
        {choices.map((choice) => (
          <button key={choice} onClick={() => play(choice)}>
            {icons[choice]} <span>{choice}</span>
          </button>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <div className="results">
          <p>You: {playerChoice} vs Computer: {computerChoice}</p>
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
}