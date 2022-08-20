import './app.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from './components/Wiki/main';
import FishPanels from './components/Wiki/fishpanels';
import Header from './components/header';
import FishGame from './components/Game/fishgame';
import RoomPanels from './components/Wiki/roompanels';
import OtherPanels from './components/Wiki/otherpanels';
import About from './components/Wiki/about';

function App() {
  return (
    <div className="app">
      <Header/>
      <Router>
        <Routes>
          <Route path="/wiki/main" element={<Main/>}/>
          <Route path="/wiki/fish" element={<FishPanels/>}/>
          <Route path="/wiki/rooms" element={<RoomPanels/>}/>
          <Route path="/wiki/other" element={<OtherPanels/>}/>
          <Route path="/game" element={<FishGame/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
