export default function ClueGenerator({ clue1, clue2, clue3, trys }) {
  // `https://image.tmdb.org/t/p/w500/`;

  console.log(clue2);
  const ClueCount = function (prop) {
    prop = [{ clue1, clue2, clue3, trys }];
    console.log(prop);
    console.log(clue1);
    if (trys >= 3 && trys <= 5) {
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
    } else if (trys >= 6 && trys <= 8) {
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
    } else if (trys >= 9) {
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
    } else {
      return (
        <div>
          <h3>?</h3>
          <h3>?</h3>
          <h3>?</h3>
        </div>
      );
    }
  };

  return (
    <div>
      <ClueCount clue1={clue1} clue2={clue2} clue3={clue3} trys={trys} />{" "}
    </div>
  );
}
