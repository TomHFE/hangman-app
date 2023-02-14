import { useState, useEffect } from "react";
import ClueGenerator from "../clue-generator/ClueGenerator";
import "./WordGuess.css";

export default function WordGuess({
  title,
  tagline,
  overview,
  genres,
  release_date,
  backdrop_path,
  id,
}) {
  const [letter, setLetter] = useState("");
  const [blankArray, setBlankArray] = useState(["t", "e"]);
  const [fullArray, setFullArray] = useState(["t", "e"]);
  const [finalArray, setFinalArray] = useState([]);
  const [trys, setTrys] = useState(0);

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
    FilterLetters(title);
  }, [title]);
  useEffect(() => {
    CheckFilteredLetters(letter);
  }, [letter]);
  useEffect(() => {
    NewDisplay();
  }, [trys]);

  const FilterLetters = function (title = "test") {
    let titleArray = [];
    let blankTitle = [];
    // convert to try catch
    let arg = title.toLowerCase();
    titleArray = Array.from(arg);
    console.log(titleArray);
    blankTitle = titleArray.map((el) => (el === " " ? (el = " ") : (el = "_")));

    setBlankArray(blankTitle);
    setFullArray(titleArray);
  };

  const CheckFilteredLetters = function (letter) {
    console.log(trys);
    const indexes = fullArray.reduce((accumulator, current, index) => {
      if (current === letter) {
        accumulator.push(index);
      }
      return accumulator;
    }, []);
    console.log(indexes);
    indexes.map((el) => {
      blankArray.splice(el, 1, letter);
    });
    setFinalArray(blankArray);
    console.log(finalArray);
    return finalArray;
  };
  const NewDisplay = function () {
    return (
      <div>
        <h2>{finalArray}</h2>
      </div>
    );
  };

  return (
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
                  setTrys(trys + 1);
                  console.log(trys);
                }}
                onMouseUp={() => {
                  CheckFilteredLetters(letter);
                }}
              >
                {el}
              </h4>
            </div>
          );
        })}
      </div>

      <div>
        <NewDisplay />{" "}
        <ClueGenerator
          key={trys}
          clue1={backdrop_path}
          clue2={tagline}
          clue3={overview}
          trys={trys}
        />
      </div>
    </div>
  );
}
