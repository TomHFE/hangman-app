import { useState, useEffect } from "react";
import React from "react";

export default function WordGenerator() {
  // id hook
  const [id, setId] = useState(0);
  // data store hook
  const [movie, setMovie] = useState([]);

  // movie api called and rerendered depending on id
  useEffect(() => {
    RequestMovies(id);
  }, [id]);

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

  return (
    <div>
      <h1 onClick={RandomNumber}>click</h1>
      <div>
        <h2>{movie.title}</h2>
        <h2>{movie.tagline}</h2>
        <p>{movie.overview}</p>

        <div>
          {/* {movie.genres.map((genre) => {
            return <div>{genre.name}</div>;
          })} */}
        </div>
      </div>
    </div>
  );
}
// change api
