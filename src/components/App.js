import React, { useState } from "react";
import Routers from "components/Router";
import { authService } from "Myfirebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <Routers isLoggedIn={isLoggedIn} />
      <footer>&copy; Xwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
