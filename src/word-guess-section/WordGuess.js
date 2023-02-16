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
  //
  const [trys, setTrys] = useState(0);
  const [score, setScore] = useState(0);
  const LifeRef = useRef(0);
  const IndexRef = useRef(false);
  const Context = useContext(AppContext);
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
  useEffect(() => {
    LifeRef.current = 0;
  }, [fullArray]);
  useEffect(() => {
    FilterLetters(title);
  }, [title]);
  useEffect(() => {
    CheckFilteredLetters(letter);
    changeHighScore();
  }, [letter]);
  useEffect(() => {
    NewDisplay();
  }, [trys]);
  useEffect(() => {
    if (IndexRef.current === true) {
      CheckLives();
    }
    return () => {
      IndexRef.current = false;
    };
  }, [letter]);

  const FilterLetters = function (title = "test") {
    let titleArray = [];
    let blankTitle = [];
    let arg = title.toLowerCase();
    titleArray = Array.from(arg);
    blankTitle = titleArray.map((el) => (el === " " ? (el = " ") : (el = "_")));

    setBlankArray(blankTitle);
    setFullArray(titleArray);
  };

  const CheckFilteredLetters = function (letter) {
    const indexes = fullArray.reduce((accumulator, current, index) => {
      if (current === letter) {
        accumulator.push(index);
      }
      return accumulator;
    }, []);
    if (indexes.length === 0) {
      IndexRef.current = true;
    }
    indexes.map((el) => {
      blankArray.splice(el, 1, letter);
    });
    setFinalArray(blankArray);
    return finalArray;
  };
  const NewDisplay = function () {
    setScore(11 - LifeRef.current);
    return (
      <div>
        <h2>{finalArray.join(" ")}</h2>
      </div>
    );
  };

  const CheckLives = function () {
    LifeRef.current = LifeRef.current + 1;
  };
  function changeHighScore() {
    if (finalArray.join("") === fullArray.join("")) {
      if (Context.highScore < 11 - LifeRef.current) {
        Context.setHighScore(11 - LifeRef.current);
      }
    }
  }

  return (
    <div>
      {finalArray.join("") === fullArray.join("") ? (
        <div>
          <Navigate to="./won" score={score} />
        </div>
      ) : (
        <div>
          <div className="letter-array-container" key={id}>
            {letterArray.map((el) => {
              return (
                <div key={el}>
                  <h4
                    className={`letter-array-letter`}
                    key={el}
                    name={el}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setLetter(e.target.innerHTML);
                    }}
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
          <LifeLeft key={score} score={score} life={LifeRef.current} />
          <div>
            <NewDisplay />
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
