import React from "react";
import "./css/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import CodeIcon from "@mui/icons-material/Code";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
function Header() {
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
            <Avatar sizes={"1px"} />
            <InboxIcon />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
