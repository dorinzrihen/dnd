import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li>
        <Link to="/maps">Maps</Link>
      </li>
      <li>
        <Link to="/recap">Recap</Link>
      </li>
    </Ul>
  );
};

export default RightNav;
