import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterList from "@mui/icons-material/FilterList";
import AllQuestions from "./AllQuestions";
import "./css/Main.css";
import axios from "axios";
function Main() {
  const [allQuestions, setAllQUestions] = useState([]);
  useEffect(() => {
    const check = async () => {
      const res = await axios.get("http://localhost:80/api/question");
      // console.log(res.json());
      setAllQUestions(res.data);
      console.log(allQuestions);
    };
    check();
  }, []);
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2> All Questions</h2>
          <Link to={"/add-question"}>
            <button>Ask a Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <h3>Questions: {allQuestions?.length || 0}</h3>
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
            {allQuestions?.length > 0 ? (
              allQuestions?.map((que) => {
                return (
                  <>
                    <AllQuestions question={que} />
                    {/* <p>{que.title}</p> */}
                  </>
                );
              })
            ) : (
              <div>No Questions found!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
