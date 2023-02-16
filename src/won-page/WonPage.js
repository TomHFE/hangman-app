import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../app-context/AppContext";

export default function WonPage() {
  const Context = useContext(AppContext);
  return (
    <div>
      <div>you won!</div>
      <div>HighScore: {Context.highScore}</div>
      <Link to="/">Try Again</Link>
    </div>
  );
}
