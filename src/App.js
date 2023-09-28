import React from 'react';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import EditServices from './pages/EditServices';
import EditAvailability from './pages/EditAvailability';
import EditPhotos from './pages/EditPhotos';
import Search from './pages/Search';
import Appointments from './pages/Appointments';
import NavBar from './components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/editservices" element={<EditServices />} />
          <Route path="/editAvailability" element={<EditAvailability />} />
          <Route path="/editPhotos" element={<EditPhotos />} />
          <Route path="/search" element={<Search />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
