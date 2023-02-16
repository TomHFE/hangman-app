import { Link } from "react-router-dom";

export default function LostPage() {
  return (
    <div>
      <div>you lost</div>
      {/* link to home */}
      <Link to="/">Try Again</Link>
    </div>
  );
}
