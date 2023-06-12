import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ThumbUp, ThumbDown, Comment } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "./css/AddQuestion.css";
function MainQuestion() {
  const [showAddQueComments, setShowAddQueComments] = useState(false);
  const [showAddAnsComments, setShowAddAnsComments] = useState(false);
  return (
    <div className="view-main">
      <div className="view-main-container">
        <div className="view-main-top">
          <div className="view-question-top">
            <h2>
              Is GitHub's dependency graph user customizable?Is GitHub's
              dependency graph user customizable?Is GitHub's dependency graph
              user customizable?Is GitHub's dependency graph user
              customizable?Is GitHub's dependency graph user customizable?Is
              GitHub's dependency graph user customizable?
            </h2>
            <Link to={"/add-question"}>
              <button>Ask a Question</button>
            </Link>
          </div>
          <div className="view-question-info">
            <span className="question-info"> 0 Votes</span>
            <span className="question-info"> 0 Answers </span>
            <span className="question-info"> 0 Views</span>
          </div>
          <div className="question-details">
            <div className="question-left">
              <ThumbUp />
              0
              <ThumbDown />
            </div>
            <div className="question-right">
              <div className="view-question-description">
                I use degit to pull data partially from a monorepo. As the repo
                is not described in package.json it doesn't show up in
                dependency graph. Is there any technique to show it up, like
                customizing graph manually? I need it for managing my repos.
              </div>
              <div className="question-author-info">
                <Link className="question-author">
                  <Avatar /> Takuya HARA
                </Link>
                <small className="question-time">10/20/2023 04:00 PM</small>
              </div>
              <div className="question-comments-container">
                <div className="comments-title">
                  <Comment />
                  <h4>Comments</h4>
                </div>
                <div className="question-old-comments">
                  <div className="question-comment">
                    <p>This is a Sample comment</p>
                    <div className="question-comment-details">
                      <Link className="question-comment-author">
                        <Avatar /> Nate
                      </Link>
                      <small className="question-comment-time">
                        10/20/2023 04:00 PM
                      </small>
                    </div>
                  </div>
                  <div className="add-question-comment">
                    <h5
                      onClick={() => setShowAddQueComments(!showAddQueComments)}
                      className="add-que-comment-title"
                    >
                      Add a comment
                    </h5>
                    {showAddQueComments && (
                      <div className="add-que-comment-body">
                        <textarea rows={2} className="comment-textarea" />
                        <button className="comment-add-button">
                          Add comment
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-middle">
          <h3>Answers</h3>
          <div className="question-answers">
            <div className="answer-details">
              <div className="answer-left">
                <ThumbUp />
                0
                <ThumbDown />
              </div>
              <div className="answer-right">
                <div className="view-answer-description">
                  I use degit to pull data partially from a monorepo. As the
                  repo is not described in package.json it doesn't show up in
                  dependency graph. Is there any technique to show it up, like
                  customizing graph manually? I need it for managing my repos.
                </div>
                <div className="answer-author-info">
                  <Link className="answer-author">
                    <Avatar /> Takuya HARA
                  </Link>
                  <small className="answer-time">10/20/2023 04:00 PM</small>
                </div>
                <div className="answer-comments-container">
                  <div className="comments-title">
                    <Comment />
                    <h4>Comments</h4>
                  </div>
                  <div className="answer-old-comments">
                    <div className="answer-comment">
                      <p>This is a Sample comment</p>
                      <div className="answer-comment-details">
                        <Link className="answer-comment-author">
                          <Avatar /> Nate
                        </Link>
                        <small className="answer-comment-time">
                          10/20/2023 04:00 PM
                        </small>
                      </div>
                    </div>
                    <div className="add-answer-comment">
                      <h5
                        onClick={() =>
                          setShowAddAnsComments(!showAddAnsComments)
                        }
                        className="add-answer-comment-title"
                      >
                        Add a comment
                      </h5>
                      {showAddAnsComments && (
                        <div className="add-answer-comment-body">
                          <textarea rows={2} className="comment-textarea" />
                          <button className="comment-add-button">
                            Add comment
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-bottom">
          <h3>Add your answer</h3>
          <div className="add-answer">
            <ReactQuill className="react-quill" theme="snow" />
            <div>
              <button className="add-answer-button">Post your answer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainQuestion;
