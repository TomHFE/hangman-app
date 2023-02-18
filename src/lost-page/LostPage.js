import { Link } from "react-router-dom";
import "./lost-page.css";

export default function LostPage() {
  return (
    <div className="lost-page">
      <div>you lost</div>
      {/* link to home */}
      <Link to="/">Try Again</Link>
    </div>
  );
}
