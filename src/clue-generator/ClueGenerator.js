import { Navigate } from "react-router";
import "../App.css";

export default function ClueGenerator({ clue1, clue2, clue3, lives }) {
  // clue function
  const ClueCount = function (prop) {
    // defractored props
    prop = [{ clue1, clue2, clue3, lives }];

    // 1st clue conditional
    if (lives >= 3 && lives <= 5) {
      // 1st clue render
      return (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${clue1}`}
            alt="poster"
            key={clue1}
          />
          <h3>?</h3>
          <h3>?</h3>
        </div>
      );
    }
    //  2nd clue conditional
    else if (lives >= 6 && lives <= 8) {
      // 2nd clue render
      return (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${clue1}`}
            alt="poster"
            key={clue1}
          />
          <h3>{clue2}</h3>
          <h3>?</h3>
        </div>
      );
    }
    // 3rd clue conditional
    else if (lives >= 9 && lives <= 11) {
      // 3rd clue render
      return (
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${clue1}`}
            alt="poster"
            key={clue1}
          />
          <h3>{clue2}</h3>
          <h3>{clue3}</h3>
        </div>
      );
    }
    // default conditional
    else if (lives < 3) {
      // default render
      return (
        <div>
          <h3>?</h3>
          <h3>?</h3>
          <h3>?</h3>
        </div>
      );
    }
    // lost conditional
    else {
      // lost render
      return (
        <div>
          <Navigate to="/lost" />
        </div>
      );
    }
  };

  return (
    <div className="clue-container">
      {/* clue count conditional */}
      <ClueCount clue1={clue1} clue2={clue2} clue3={clue3} lives={lives} />{" "}
    </div>
  );
}
