import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouteCustom } from "./components/loginPage/RouteCustom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <RouteCustom />
      </Router>
    </>
  );
}

export default App;
