import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import "./css/AllQuestions.css";
function AllQuestions() {
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-top">
          <div className="all-options">
            <span className="question-option">0 Votes</span>

            <span className="question-option">0 Answers</span>

            <span className="question-option">0 Views</span>
          </div>
        </div>
        <div className="all-questions-bottom">
          <Link>Is GitHub's dependency graph user customizable?</Link>
          <div className="question-desc">
            I use degit to pull data partially from a monorepo. As the repo is
            not described in package.json it doesn't show up in dependency
            graph. Is there any technique to show it up, like customizing graph
            manually? I need it for managing my repos.
          </div>
          <div className="question-tags">
            <span className="question-tag">GitHub</span>
            <span className="question-tag">Git Repository</span>
          </div>
          <div className="question-author-info">
            <Link className="question-author">
              <Avatar /> Takuya HARA
            </Link>
            <small className="question-time">10/20/2023 04:00 PM</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;
