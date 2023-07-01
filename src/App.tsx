import { useRoutes } from "react-router-dom";
import "./App.scss";
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
