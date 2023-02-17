import { state1 as state1 } from "./hangmandrawings/state1.GIF";
import { state2 as state2 } from "./hangmandrawings/state2.GIF";
import { state3 as state3 } from "./hangmandrawings/state3.GIF";
import { state4 as state4 } from "./hangmandrawings/state4.GIF";
import { state5 as state5 } from "./hangmandrawings/state5.GIF";
import { state6 as state6 } from "./hangmandrawings/state6.GIF";
import { state7 as state7 } from "./hangmandrawings/state7.GIF";
import { state8 as state8 } from "./hangmandrawings/state8.GIF";
import { state9 as state9 } from "./hangmandrawings/state9.GIF";
import { state10 as state10 } from "./hangmandrawings/state10.GIF";
import { state11 as state11 } from "./hangmandrawings/state11.GIF";
import "../App.css";

export default function LifeLeft({ score, life }) {
  // conditional hangman image render
  let HangeMan = life > 0 && life <= 11 && (
    <div>
      {/* lives left */}
      <div>
        <div>Lives Left: {score} / 11</div>
      </div>
      <img
        src={require(`./hangmandrawings/state${life}.GIF`)}
        key={life}
        alt="hangman"
      />
    </div>
  );

  return (
    <div>
      {/* hangman gif */}
      <div>{HangeMan}</div>
    </div>
  );
}
