import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import RecapPage from "./RecapPage";
import MapPage from "./MapPage";
import LandingPage from "./LandingPage";
import Header from './component/Header'

const DndApp = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/maps" component={MapPage}></Route>
        <Route exact path="/recap" component={RecapPage}></Route>
      </BrowserRouter>
    </div>
  );
};

export default DndApp;
