import React from 'react';
import { BrowserRouter as BrowerRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Project from './Pages/Project.jsx';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';
import Header from './Components/Header.jsx';
const App = () => {
  return (
    <BrowerRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<Project />} />
              <Route path="/signin" element={<Signin/> }/>
        <Route path="/signup" element={<Signup/>} />

      </Routes>
    </BrowerRouter>
  );
};

export default App;