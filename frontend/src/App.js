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
import AddQuestion from "./components/AddQuestion/AddQuestion";
import ViewQuestion from "./components/ViewQuestion";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<SolutionStation />} />
          <Route exact path="/add-question" element={<AddQuestion />} />
          <Route exact path="/view-question" element={<ViewQuestion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
