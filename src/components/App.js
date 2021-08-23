import React, { useEffect, useState } from "react";
import Routers from "components/Router";
import { authService } from "Myfirebase";

function App() {
  const [Init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])
  return (
    <>
      {Init ? <Routers isLoggedIn={isLoggedIn} /> : "초기화중입니다..."}
      <footer>&copy; Xwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
