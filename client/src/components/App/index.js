import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import MyPage from '../MyPage';
import Login from '../Login';
import SignUp from '../SignUp';

const App = () => {
  const [userActive, setUserActive] = React.useState({});

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing userActive={userActive} setUserActive={setUserActive} />} />
          <Route path="/Search" element={<Search userActive={userActive} />} />
          <Route path="/Review" element={<Review userActive={userActive} />} />
          <Route path="/MyPage" element={<MyPage userActive={userActive} setUserActive={setUserActive}/>} />
          <Route path="/Login" element={<Login userActive={userActive} setUserActive={setUserActive} />} />
          <Route path="/SignUp" element={<SignUp userActive={userActive} setUserActive={setUserActive} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
