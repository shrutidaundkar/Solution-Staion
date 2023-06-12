import React from "react";
import { Link } from "react-router-dom";
import FilterList from "@mui/icons-material/FilterList";
import AllQuestions from "./AllQuestions";
import "./css/Main.css";
function Main() {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2> All Questions</h2>
          <Link>
            <button>Ask a Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <h3>Questions: 10</h3>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                <Link>Newest</Link>
              </div>
              <div className="main-tab">
                <Link>Active</Link>
              </div>
              <div className="main-tab">
                <Link>More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <FilterList />
              Filter
            </div>
          </div>
        </div>
        <div className="questions">
          <div className="question">
            <AllQuestions />
            <AllQuestions />
            <AllQuestions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
