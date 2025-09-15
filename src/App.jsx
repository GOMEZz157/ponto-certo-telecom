import Home from "./pages/Home";
import Contato from "./pages/Contato";
import Planos from "./pages/Planos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="font-recursive">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/planos" element={<Planos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;