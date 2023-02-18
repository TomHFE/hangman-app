import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../app-context/AppContext";
import "./won-page.css";

export default function WonPage() {
  // highscore context hook
  const Context = useContext(AppContext);
  return (
    <div className="won-page">
      <div>you won!</div>
      {/* high score */}
      <div>HighScore: {Context.highScore}</div>
      {/* link to home */}
      <Link to="/">Try Again</Link>
    </div>
  );
}
