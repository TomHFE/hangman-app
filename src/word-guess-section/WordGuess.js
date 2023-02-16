import { useState, useEffect, useRef, useContext } from "react";
import { Navigate } from "react-router";
import ClueGenerator from "../clue-generator/ClueGenerator";
import "./WordGuess.css";
import AppContext from "../app-context/AppContext";
import LifeLeft from "../lives-section/LifeLeft";

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
    "press a button ",
    "to initialise",
  ]);
  // full word hook
  const [fullArray, setFullArray] = useState([
    "press a button ",
    "to initialise",
  ]);
  // final array/display hook
  const [finalArray, setFinalArray] = useState([]);
  // attempt hook
  const [trys, setTrys] = useState(0);
  //  score hook
  const [score, setScore] = useState(0);
  // lives reference
  const LifeRef = useRef(0);
  // update display reference
  const IndexRef = useRef(false);
  // use context variable
  const Context = useContext(AppContext);
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
    changeHighScore();
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
      el === " " ? (el = `     `) : (el = "_")
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
    return (
      <div>
        <h2>{finalArray.join(" ")}</h2>
      </div>
    );
  };
  // update lives function
  const CheckLives = function () {
    LifeRef.current = LifeRef.current + 1;
  };
  // update highscore function
  function changeHighScore() {
    // conditional update of highscore
    if (finalArray.join("") === fullArray.join("")) {
      if (Context.highScore < 11 - LifeRef.current) {
        Context.setHighScore(11 - LifeRef.current);
      }
    }
  }

  return (
    <div>
      {/* winning conditional render */}
      {finalArray.join("") === fullArray.join("") ? (
        <div>
          <Navigate to="./won" score={score} />
        </div>
      ) : (
        <div>
          <div className="letter-array-container" key={id}>
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
          {/* life left component */}
          <LifeLeft key={score} score={score} life={LifeRef.current} />
          <div>
            {/* display component */}
            <NewDisplay />
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
      )}
    </div>
  );
}
