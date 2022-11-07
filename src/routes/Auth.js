import AuthForm from "components/AuthForm";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { getAuth, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider } from "firebase/auth";

const Auth = () => {
  const onSocialClick = async (event) => {
    const auth = getAuth();
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "twitter") {
      provider = new TwitterAuthProvider();
    }
    await signInWithPopup(auth, provider);
  };
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="twitter" className="authBtn">
          Continue with Twiiter <FontAwesomeIcon icon={faTwitter} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
