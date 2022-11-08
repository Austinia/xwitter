import React, { useEffect, useState } from "react";
import Routers from "components/Router";
import { authService } from "Myfirebase";
import { updateProfile } from "firebase/auth";

function App() {
  const [Init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setuserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        if (user.displayName === null) {
          updateProfile(user, {
            displayName: "익명",
          });
        }
        setuserObj(user, {
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setuserObj(null);
      }
      // } else {
      //   setIsLoggedIn(false);
      // }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setuserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {Init ? (
        <Routers
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "로딩 및 초기화중입니다..."
      )}
    </>
  );
}

export default App;
