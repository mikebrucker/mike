import React from "react";
import "./App.scss";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

/** Nested routes here. Language logic is handled within the `Layout` */
const App = () => {
  return (
    <div className="App">
      {useRoutes(routes)}
    </div>
  );
};

export default App;
