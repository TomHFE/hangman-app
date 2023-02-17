import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import ClueGenerator from "../clue-generator/ClueGenerator";
import "./WordGuess.css";
import AppContext from "../app-context/AppContext";
import LifeLeft from "../lives-section/LifeLeft";
import "../App.css";

export default function WordGuess({
  // api props
  title,
  tagline,
  overview,
  backdrop_path,
  id,
}) {
  // letter hook
  const [letter, setLetter] = useState("");
  // blank array hook
  const [blankArray, setBlankArray] = useState([
    "_",
    "press a button",
    "to initialise",
    "_",
  ]);
  // full word hook
  const [fullArray, setFullArray] = useState([
    "_",
    "press a button",
    "to initialise",
    "_",
  ]);
  // final array/display hook
  const [finalArray, setFinalArray] = useState(["_"]);
  // attempt hook
  const [trys, setTrys] = useState(0);
  //  score hook
  const [score, setScore] = useState(0);
  // completed hook
  const [completed, setCompleted] = useState(0);
  // lives reference
  const LifeRef = useRef(0);
  // update display reference
  const IndexRef = useRef(false);
  // use context variable
  const Context = useContext(AppContext);
  // navigate hook
  const Navigate = useNavigate();
  // alphabet array
  const letterArray = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  // useEffect hooks

  // life ref update on full array change
  useEffect(() => {
    LifeRef.current = 0;
  }, [fullArray]);
  // filtereLetters function update on title change
  useEffect(() => {
    FilterLetters(title);
  }, [title]);
  // letter checking function update on letter change
  useEffect(() => {
    CheckFilteredLetters(letter);
  }, [letter]);
  // new display update on try change
  useEffect(() => {
    NewDisplay();
  }, [trys]);
  // index reference setter and update on check lives array on letter change
  useEffect(() => {
    if (IndexRef.current === true) {
      CheckLives();
    }
    return () => {
      IndexRef.current = false;
    };
  }, [letter]);
  // highscore and won navigation on completed hook change
  useEffect(() => {
    changeHighScore();
    youWon(finalArray);
  }, [completed]);

  // filtered letter function
  const FilterLetters = function (title = "test") {
    // title array
    let titleArray = [];
    // blank array
    let blankTitle = [];
    // variable to lower case
    let arg = title.toLowerCase();
    // convert title to array
    titleArray = Array.from(arg);
    // map title array to blank
    blankTitle = titleArray.map((el) =>
      el === " " ? (el = `\u00A0 \u00A0`) : (el = "_")
    );
    // set blank array
    setBlankArray(blankTitle);
    // set full array
    setFullArray(titleArray);
  };

  // check filtered letter function
  const CheckFilteredLetters = function (letter) {
    // check position of letter in full array
    const indexes = fullArray.reduce((accumulator, current, index) => {
      if (current === letter) {
        accumulator.push(index);
      }
      return accumulator;
    }, []);
    // set index reference to true
    if (indexes.length === 0) {
      IndexRef.current = true;
    }
    // input letters into blank array at indexes position
    indexes.map((el) => {
      blankArray.splice(el, 1, letter);
    });
    // set final array to blank array
    setFinalArray(blankArray);

    return finalArray;
  };

  // new display function
  const NewDisplay = function () {
    // set score hook
    setScore(11 - LifeRef.current);
    // final array dom render
    console.log(fullArray);
    console.log(finalArray);
  };

  // update lives function
  const CheckLives = function () {
    LifeRef.current = LifeRef.current + 1;
  };

  // update highscore function
  function changeHighScore() {
    // conditional update of highscore
    const filteredHS = finalArray.filter((el) => el === "_");
    if (filteredHS.length === 0) {
      if (Context.highScore < 11 - LifeRef.current) {
        console.log("test change highscore");
        Context.setHighScore(11 - LifeRef.current);
      }
    }
  }
  // update win status
  const youWon = function (finalArray) {
    // conditional render of win component
    const filtered = finalArray.filter((el) => el === "_");
    if (filtered.length === 0) {
      console.log("test you won");
      Navigate("/won");
    }
  };

  return (
    <div>
      <div className="wordguess-container">
        <div className="guess1">
          <div className="letter-array-container " key={id}>
            {/* letter array map */}
            {letterArray.map((el) => {
              return (
                <div key={el}>
                  <h4
                    className={`letter-array-letter`}
                    key={el}
                    name={el}
                    // set letter
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setLetter(e.target.innerHTML);
                      setCompleted(completed + 1);
                    }}
                    // set trys and run check filtered function
                    onMouseUp={(e) => {
                      e.preventDefault();
                      setTrys(trys + 1);
                      CheckFilteredLetters(letter);
                    }}
                  >
                    {el}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
        {/* display component */}
        <div className="guess2">
          <h2>{finalArray.join(" ")}</h2>
        </div>
      </div>

      <div>
        {/* life left component */}
        <LifeLeft key={score} score={score} life={LifeRef.current} />

        {/* clue generate component */}
        <ClueGenerator
          key={trys}
          clue1={backdrop_path}
          clue2={tagline}
          clue3={overview}
          lives={LifeRef.current}
        />
      </div>
    </div>
  );
}
