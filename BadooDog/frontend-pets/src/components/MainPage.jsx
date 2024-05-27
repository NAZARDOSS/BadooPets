import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./Create";
import Header from './Header'
import Feed from "./Feed";

function App() {
  return (

    <div>
      <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post" element={<Create />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
