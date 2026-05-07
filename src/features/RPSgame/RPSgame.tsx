import { useState, type JSX } from "react";
import {
  FaRegHandRock,
  FaRegHandPaper,
  FaRegHandScissors,
  FaRegHandLizard,
  FaRegHandSpock,
} from "react-icons/fa";

import type { Choice, Result } from "./types";

const choices: Choice[] = ["rock", "paper", "scissors", "lizard", "spock"];

const icons: Record<Choice, JSX.Element> = {
  rock: <FaRegHandRock />,
  paper: <FaRegHandPaper />,
  scissors: <FaRegHandScissors />,
  lizard: <FaRegHandLizard />,
  spock: <FaRegHandSpock />,
};

const rules: Record<Choice, Choice[]> = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["spock", "paper"],
  spock: ["scissors", "rock"],
};

export default function App() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result | "">("");

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const determineWinner = (player: Choice, computer: Choice): Result => {
    if (player === computer) {
      return `It's a draw! You both chose ${player}.`;
    }

    if (rules[player].includes(computer)) {
      return `Congratulations, you won! ${capitalize(player)} beats ${computer}!`;
    }

    return `Sorry, the computer won! ${capitalize(computer)} beats ${player}!`;
  };

  const handleClick = (choice: Choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)];

    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(determineWinner(choice, computer));
  };

  return (
    <div className="container">
      <h1>Rock Paper Scissors Lizard Spock</h1>

      <div className="buttons">
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleClick(choice)}>
            {icons[choice]}
            <span>{capitalize(choice)}</span>
          </button>
        ))}
      </div>

      <div className="results">
        {playerChoice && computerChoice && (
          <>
            <h2>{result}</h2>
          </>
        )}
      </div>
    </div>
  );
}