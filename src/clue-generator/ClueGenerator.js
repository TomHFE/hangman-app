import { useState } from "react";
import { Navigate } from "react-router";

export default function ClueGenerator({ clue1, clue2, clue3, lives }) {
  const [clueOne, setClueOne] = useState("?");
  const [clueTwo, setClueTwo] = useState("?");
  const [clueThree, setClueThree] = useState("?");

  // `https://image.tmdb.org/t/p/w500/`;

  const ClueCount = function (prop) {
    prop = [{ clue1, clue2, clue3, lives }];
    // console.log(lives);
    console.log(lives);

    if (lives >= 3 && lives <= 5) {
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
    } else if (lives >= 6 && lives <= 8) {
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
    } else if (lives >= 9 && lives <= 11) {
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
    } else if (lives < 3) {
      return (
        <div>
          <h3>?</h3>
          <h3>?</h3>
          <h3>?</h3>
        </div>
      );
    } else {
      return (
        <div>
          <Navigate to="/lost" />
          {/* <LosePage/> */}
        </div>
      );
    }
  };

  return (
    <div>
      {/* {lives >= 10 ? (
        <div>
          <div>you lost</div>
        </div>
      ) : (
        <div>
          <div>{clueOne}</div>
          <div>{clueOne}</div>
          <div>{clueOne}</div>
        </div>
      )} */}
      <ClueCount clue1={clue1} clue2={clue2} clue3={clue3} lives={lives} />{" "}
    </div>
  );
}
