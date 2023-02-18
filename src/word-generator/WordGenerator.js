import { useState, useEffect, useRef, useContext } from "react";
import React from "react";
import WordGuess from "../word-guess-section/WordGuess";
import AppContext from "../app-context/AppContext";
import "../App.css";
import "./word-generator.css";

export default function WordGenerator() {
  // id hook
  const [id, setId] = useState(3);
  // data store hook
  const [movie, setMovie] = useState([]);
  // help hook
  const [click, setClick] = useState(false);
  // highscore provider
  const Context = useContext(AppContext);

  // movie api called and rerendered depending on id
  useEffect(() => {
    RequestMovies(id);
  }, [id]);
  // random number useeffect
  useEffect(() => {
    RandomNumber();
  }, []);

  // request movie api
  const RequestMovies = async (id) => {
    // initialise first api call
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=31e151673465169ef0660ef71a3c6afc&language=en-US&include_adult=false&with_genres=28&page=${id}&sort_by=popularity.desc`
    );
    // collect data from api convert to json
    const data = await res.json();
    // store id from api call for second api
    const newID = data.results[0].id;
    // initialise second api call
    const resSecond = await fetch(
      `https://api.themoviedb.org/3/movie/${newID}?api_key=31e151673465169ef0660ef71a3c6afc`
    );
    // convert this data to json
    const dataSecond = await resSecond.json();
    // set movie hook to data
    setMovie(dataSecond);
  };
  // random number converter
  const RandomNumber = () => {
    // variable which creates random number
    let number = Math.floor(Math.random() * 100 - 1);
    // set id to this random number
    setId(number);
  };

  // help display conditional statement
  let HelpDisplay = click && (
    <p className="help">
      Press the buttons to try and guess the name of the movie, as you lose
      lives you will be given clues to help you guess. If its to hard press
      Refresh to fetch a new film
    </p>
  );

  return (
    <div>
      <div className="wordgenerator-container">
        {/* random number */}
        <h1 className="gen1" onClick={RandomNumber}>
          Refresh
        </h1>
        {/* high score */}
        <h1 className="gen2">High Score: {Context.highScore}</h1>
        <div className="gen3">
          <div>
            {/* help display */}
            <h1
              onClick={() => {
                setClick(!click);
              }}
            >
              ?
            </h1>
            <div>{HelpDisplay}</div>
          </div>
        </div>
      </div>

      <div>
        <div>
          {/* word guess component */}
          <WordGuess
            key={movie.id}
            title={movie.title}
            tagline={movie.tagline}
            overview={movie.overview}
            backdrop_path={movie.backdrop_path}
            id={movie.id}
          />
        </div>
      </div>
    </div>
  );
}
