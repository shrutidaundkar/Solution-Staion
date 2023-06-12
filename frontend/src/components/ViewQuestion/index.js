import React from "react";

import "./css/MainQuestion.css";
import MainQuestion from "./MainQuestion";
import Sidebar from "../SolutionStation/Sidebar";
function index() {
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <MainQuestion />
      </div>
    </div>
  );
}

export default index;
