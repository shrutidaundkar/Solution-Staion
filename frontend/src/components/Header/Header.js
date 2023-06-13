import React from "react";
import "./css/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import CodeIcon from "@mui/icons-material/Code";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function Header() {
  const { user, googleSignOut } = UserAuth();
  const handleSignout = () => {
    try {
      googleSignOut();
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header>
      <div className="header-container">
        <div className="header-left">
          <Link to={"/"}>
            <CodeIcon /> <span>Solution Station</span>
          </Link>
        </div>
        <div className="header-middle">
          <div className="header-search-container">
            <SearchIcon />
            <input type="text" placeholder="Search.." />
          </div>
        </div>
        <div className="header-right">
          <div className="header-right-container">
            <Avatar src={user?.photoURL} />
            {user?.email || ""}
            {user ? (
              <button onClick={handleSignout}> Sign Out</button>
            ) : (
              <Link to={"/auth"}>Signin</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
