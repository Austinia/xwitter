import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
// <> </> 프래그먼트 부모 요소가 없을때 많은 요소를 랜더 하고 싶을때 사용
const Routers = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      {isLoggedIn ? (
        <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Routes>
            <Route exact path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              exact
              path="/Profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            ></Route>
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route exact path="/" element={<Auth />}></Route>
        </Routes>
      )}
    </Router>
  );
};
export default Routers;
