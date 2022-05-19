import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div className="header-title d-flex justify-content-between">
    <Link className="header-link" to="/">
      Test Generator app
    </Link>
    <Link className="header-link" to="/create">
      Create new test
    </Link>
  </div>
);

export default Header;
