import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SolutionStation from "./components/SolutionStation";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import ViewQuestion from "./components/ViewQuestion";
import Authentication from "./components/Auth/Authentication";

import { AuthContextProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/context/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/auth" element={<Authentication />} />
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute>
                  <SolutionStation />
                </ProtectedRoute>
              }
            />

            <Route
              exact
              path="/add-question"
              element={
                <ProtectedRoute>
                  <AddQuestion />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/view-question"
              element={
                <ProtectedRoute>
                  <ViewQuestion />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
