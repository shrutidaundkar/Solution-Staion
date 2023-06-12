import React, { useState } from "react";
import ReactQuill from "react-quill";
import { TagsInput } from "react-tag-input-component";
import "react-quill/dist/quill.snow.css";
import "./css/AddQuestion.css";
import { Link } from "react-router-dom";
function AddQuestion() {
  const [tags, setTags] = useState([]);
  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="add-question-head">
          <h2>Ask a question</h2>
        </div>
        <div className="add-question-content">
          <div className="question-option">
            <h5 className="question-option-label">Question Title</h5>
            <input type="text" />
          </div>
          <div className="question-option">
            <h5 className="question-option-label">Question Description</h5>
            <ReactQuill className="react-quill" theme="snow" />
          </div>
          <div className="question-option">
            <h5 className="question-option-label">Question tags</h5>
            <TagsInput
              value={tags}
              onChange={setTags}
              name="tags"
              placeHolder="Press enter to add a new tag"
            />
          </div>
        </div>
        <div className="add-question-bottom">
          <Link>
            <button className="add-question-button">Add Question</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
