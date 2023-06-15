import React, { useState } from "react";
import ReactQuill from "react-quill";
import { TagsInput } from "react-tag-input-component";
import "react-quill/dist/quill.snow.css";
import "./css/AddQuestion.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
function AddQuestion() {
  const [queTitle, setQueTitle] = useState("");
  const [queDesc, setQueDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [queType, setQueType] = useState("");
  const { user, getMongoIdFromStorage } = UserAuth();
  const navigate = useNavigate();
  const handleQuill = (value) => {
    setQueDesc(value);
  };
  const updateTags = (value) => {
    setTags(value);
  };

  const handlePostQue = () => {
    const queBody = {
      title: queTitle,
      question: queDesc,
      tags: tags.toString(),
      user: getMongoIdFromStorage(),
      status: "OPEN",
      question_type: queType,
    };
    const postQuestion = async () => {
      await axios
        .post("http://localhost:80/api/question", queBody)
        .then((res) => {
          console.log(res);
          alert("Question Added!");
          navigate("/");
        })
        .catch((err) => {
          alert(err);
        });
    };
    postQuestion();
  };
  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="add-question-head">
          <h2>Ask a question</h2>
        </div>
        <div className="add-question-content">
          <div className="question-option">
            <h5 className="question-option-label">Question Title</h5>
            <input
              type="text"
              value={queTitle}
              onChange={(ev) => setQueTitle(ev.target.value)}
            />
          </div>
          <div className="question-option">
            <h5 className="question-option-label">Question Type</h5>
            <input
              type="text"
              value={queType}
              onChange={(ev) => setQueType(ev.target.value)}
            />
          </div>
          <div className="question-option">
            <h5 className="question-option-label">Question Description</h5>
            <ReactQuill
              className="react-quill"
              theme="snow"
              value={queDesc}
              onChange={handleQuill}
            />
          </div>
          <div className="question-option">
            <h5 className="question-option-label">Question tags</h5>
            <TagsInput
              value={tags}
              onChange={updateTags}
              name="tags"
              placeHolder="Press enter to add a new tag"
            />
          </div>
        </div>
        <div className="add-question-bottom">
          {/* <Link> */}
          <button className="add-question-button" onClick={handlePostQue}>
            Add Question
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
