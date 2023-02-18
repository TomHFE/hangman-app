import "./App.css";
import LostPage from "./lost-page/LostPage";
import WonPage from "./won-page/WonPage";
import WordGenerator from "./word-generator/WordGenerator";
import AppContext from "./app-context/AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import backgroundVideo from "./backgroundVideo.mov";
function App() {
  // high score state
  const [highScore, setHighScore] = useState(0);
  // components
  return (
    <div>
      <video
        className="background-video"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />
      <div className="App">
        <div className="AppInternal">
          <AppContext.Provider value={{ highScore, setHighScore }}>
            <Router>
              <Routes>
                <Route path="/*" element={<WordGenerator />} />
                <Route path="/won" element={<WonPage />} />
                <Route path="/lost" element={<LostPage />} />
              </Routes>
            </Router>
          </AppContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
