import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CryptoConverter from "./components/CryptoConverter";

function App() {
  return (
    <>
      <CryptoConverter />
      <ToastContainer />
    </>
  );
}

export default App;
