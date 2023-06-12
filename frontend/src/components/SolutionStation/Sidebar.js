import React from "react";
import QuestionMark from "@mui/icons-material/QuestionMark";
import Home from "@mui/icons-material/Home";
import Grade from "@mui/icons-material/Grade";
import { Link } from "react-router-dom";
import "./css/Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <Link>
              <Home /> <h3 className="sidebar-option-text">Home</h3>
            </Link>
          </div>
          <div className="sidebar-option">
            <Link>
              <QuestionMark />{" "}
              <h3 className="sidebar-option-text">Questions</h3>
            </Link>
          </div>
          <div className="sidebar-option">
            <Link>
              <Grade /> <h3 className="sidebar-option-text">Bonus</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
