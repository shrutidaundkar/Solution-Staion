import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThumbUp, ThumbDown, Comment } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import parse from "html-react-parser";
import Answer from "./Answer";
import { UserAuth } from "../context/AuthContext";

// import "../AddQuestion/css/AddQuestion.css";
function MainQuestion() {
  const [showAddQueComments, setShowAddQueComments] = useState(false);
  const [ansDesc, setAnsDesc] = useState("");
  const [curQuestion, setCurQuestion] = useState();
  const [userEmail, setUserEmail] = useState("");
  let search = window.location.search;
  const queParam = new URLSearchParams(search);
  const qid = queParam.get("qid");
  const { user, getMongoIdFromStorage } = UserAuth();
  const [showAnswers, setShowAnswers] = useState(true);
  const [owner, setOwner] = useState("");
  const [questionStat, setQuestionStat] = useState("");
  const handleQuill = (value) => {
    setAnsDesc(value);
  };
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
  const getQuestion = async () => {
    await axios
      .get(`http://localhost:80/api/question/${qid}`)
      .then((res) => {
        console.log(res.data[0]);
        setCurQuestion(res.data[0]);
        getUserEmail(res.data[0].user_id);
        setOwner(res.data[0].user_id);
        setQuestionStat(res.data[0].status);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const postAnswer = () => {
    const answerBody = {
      question_id: qid,
      answer: ansDesc,
      status: "ANSWERED",
      user: getMongoIdFromStorage(),
    };
    const postAnswerToApi = async () => {
      await axios
        .post("http://localhost:80/api/answer", answerBody)
        .then((res) => {
          console.log(res.result);
          alert("Answer Added!");
          setAnsDesc("");
          getQuestion();
        })
        .catch((err) => {
          alert(err);
        });
    };
    postAnswerToApi();
  };
  const checkIfOwner = () => {
    if (owner === getMongoIdFromStorage()) {
      // setShowAnswers(true);
      return true;
    } else if (questionStat === "CLOSED") {
      // setShowAnswers(true);
      return true;
    } else {
      // setShowAnswers(false);
      return false;
    }
  };
  const checkCanClose = () => {
    if (owner === getMongoIdFromStorage()) {
      return true;
    }
    return false;
  };
  const closeQuestion = () => {};
  useEffect(() => {
    getQuestion();
    checkIfOwner();
  }, []);
  useEffect(() => {}, [curQuestion]);
  return (
    <>
      {curQuestion !== undefined && (
        <div className="view-main">
          <div className="view-main-container">
            <div className="view-main-top">
              <div className="view-question-top">
                <h2>{curQuestion.title}</h2>
                <Link to={"/add-question"}>
                  <button>Ask a Question</button>
                </Link>
              </div>
              <div className="view-question-info">
                <span className="question-info"> 0 Votes</span>
                <span className="question-info">
                  {" "}
                  {curQuestion.answerDetails.length || 0} Answers{" "}
                </span>
                <span className="question-info"> 0 Views</span>
                {checkCanClose() === true ? (
                  <span className="question-info">
                    <button
                      onClick={closeQuestion}
                      style={{
                        backgroundColor: "red",
                        padding: "5px",
                      }}
                    >
                      Close Open Forum!
                    </button>
                  </span>
                ) : null}
              </div>
              <div className="question-details">
                <div className="question-left">
                  <ThumbUp />
                  0
                  <ThumbDown />
                </div>
                <div className="question-right">
                  <div className="view-question-description">
                    {parse(curQuestion.question)}
                  </div>
                  <div className="question-author-info">
                    <Link className="question-author">
                      <Avatar /> {userEmail}
                    </Link>
                    <small className="question-time">
                      {new Date(curQuestion.created_at).toDateString()}
                    </small>
                  </div>
                  <div className="question-comments-container">
                    <div className="comments-title">
                      <Comment />
                      <h4>
                        {curQuestion.questioncomments.length || 0} Comments
                      </h4>
                    </div>
                    <div className="question-old-comments">
                      {curQuestion.questioncomments.length > 0 &&
                        curQuestion.questioncomments.map((com) => {
                          return (
                            <div className="question-comment">
                              <p>{com.comment}</p>
                              <div className="question-comment-details">
                                <Link className="question-comment-author">
                                  <Avatar />{" "}
                                  {/* {com.user_id !== undefined ? (
                                    <p>
                                      {com.user_id !== undefined &&
                                        getUserEmail(com.user_id)}
                                    </p>
                                  ) : (
                                    " User "
                                  )} */}
                                  User
                                </Link>
                                <small className="question-comment-time">
                                  {new Date(com.created_at).toDateString()}
                                </small>
                              </div>
                            </div>
                          );
                        })}
                      <div className="add-question-comment">
                        <h5
                          onClick={() =>
                            setShowAddQueComments(!showAddQueComments)
                          }
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
              <h2
                style={{
                  margin: "20px 5px",
                }}
              >
                {curQuestion.answerDetails.length || 0} Answers
              </h2>
              <div>
                {curQuestion.answerDetails.length > 0 && (
                  <>
                    {checkIfOwner() === true ? (
                      curQuestion.answerDetails.map((ans) => {
                        return <Answer answerDet={ans} />;
                      })
                    ) : (
                      <>Answer has not been closed yet!</>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="main-bottom">
              <h3
                style={{
                  margin: "20px 5px",
                }}
              >
                Add your answer
              </h3>
              <div
                className="add-answer"
                style={{
                  margin: "20px 45px",
                  width: "70%",
                }}
              >
                <ReactQuill
                  className="react-quill"
                  theme="snow"
                  value={ansDesc}
                  onChange={handleQuill}
                />
                <div>
                  <button className="add-answer-button" onClick={postAnswer}>
                    Post your answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MainQuestion;
