import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThumbUp, ThumbDown, Comment } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import parse from "html-react-parser";
import "./css/MainQuestion.css";
function Answer(props) {
  const [userEmail, setUserEmail] = useState("");
  const [showAddAnsComments, setShowAddAnsComments] = useState(false);

  const { answer, created_at, user_id, answercomments = [] } = props.answerDet;
  useEffect(() => {
    const getUserEmail = async (curId) => {
      await axios
        .get(`http://localhost:80/api/user/id/${curId}`)
        .then((res) => {
          console.log(res.data.user.email);
          setUserEmail(res.data.user.email);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getEmail = async () => {
      getUserEmail(user_id);
    };
    getEmail();
  }, [user_id]);
  if (!props.answerDet) {
    return null;
  }
  return (
    <div>
      {props?.answerDet !== undefined ? (
        <>
          <div className="question-answers">
            <div className="answer-details">
              <div className="answer-left">
                <ThumbUp />
                0
                <ThumbDown />
              </div>
              <div className="answer-right">
                <div className="view-answer-description">{parse(answer)}</div>
                <div className="answer-author-info">
                  <Link className="answer-author">
                    <Avatar /> {userEmail}
                  </Link>
                  <small className="answer-time">
                    {new Date(created_at).toDateString()}
                  </small>
                </div>
                <div className="answer-comments-container">
                  <div className="comments-title">
                    <Comment />
                    <h4>{answercomments.length || 0} Comments</h4>
                  </div>
                  <div className="answer-old-comments">
                    {answercomments.map((com) => {
                      return (
                        <div className="answer-comment">
                          <p>{com.comment}</p>
                          <div className="answer-comment-details">
                            <Link className="answer-comment-author">
                              <Avatar /> Commentor
                            </Link>
                            <small className="answer-comment-time">
                              {new Date(com.created_at).toDateString()}
                            </small>
                          </div>
                        </div>
                      );
                    })}

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
        </>
      ) : null}
    </div>
  );
}

export default Answer;
