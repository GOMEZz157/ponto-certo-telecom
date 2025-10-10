import Home from "./pages/Home";
import Tv from "./pages/Tv";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="font-recursive">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv" element={<Tv/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;