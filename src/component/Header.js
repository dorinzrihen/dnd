import React, { Component } from "react";
import {Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <ul>
        <li>
            <Link to="/maps">Maps</Link>
          </li>
          <li>
            <Link to="/recap">Recap</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
