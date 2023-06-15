import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import "./css/AllQuestions.css";
import axios from "axios";
import parse from "html-react-parser";
function AllQuestions(props) {
  const {
    _id,
    title,
    question,
    status,
    tags,
    created_at,
    answerDetails,
    user_id,
  } = props.question;
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    const getUserEmail = async () => {
      await axios
        .get(`http://localhost:80/api/user/id/${user_id}`)
        .then((res) => {
          console.log(res.data.user.email);
          setUserEmail(res.data.user.email);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUserEmail();
  });
  return (
    <>
      {props && (
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-top">
              <div className="all-options">
                <span className="question-option">0 Votes</span>

                <span className="question-option">
                  {answerDetails.length || 0} Answers
                </span>

                <span className="question-option">0 Views</span>
                <span className="question-option question-tag">{status}</span>
              </div>
            </div>
            <div className="all-questions-bottom">
              <Link to={`/view-question?qid=${_id}`}>{title}</Link>
              <div className="question-desc">{parse(question)}</div>
              <div className="question-tags">
                <div className="question-tags">
                  {tags?.length > 0 ? (
                    tags.map((tag) => {
                      return <span className="question-tag">{tag}</span>;
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="question-author-info">
                <Link className="question-author">
                  <Avatar /> {userEmail}
                </Link>
                <small className="question-time">
                  {new Date(created_at).toDateString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllQuestions;
