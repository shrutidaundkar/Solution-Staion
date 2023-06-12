import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
} from "react-router-dom";
import SolutionStation from "./components/SolutionStation";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<SolutionStation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
