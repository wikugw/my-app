import { GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import { Button } from "../../micro/Button";
import { Input } from "../../micro/Input";
import { actionCodeSettings, auth } from "../../../firebase";
import { useState } from "react";

function LoginView() {

  const [email, setEmail] = useState("");

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email); // save email for later
      alert("Email link sent! Check your inbox or spam.");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <>
      <h2>Login</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <Button onClick={handleLogin}>Login with Email</Button>
      <Button onClick={handleGoogleLogin}>Login with Google</Button>
    </>
  )
}

export default LoginView