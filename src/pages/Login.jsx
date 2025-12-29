import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailAuth = async (isSignup) => {
    setError(null);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={() => handleEmailAuth(false)}
        style={{ width: "100%", marginBottom: 8 }}
      >
        Log In
      </button>

      <button
        onClick={() => handleEmailAuth(true)}
        style={{ width: "100%", marginBottom: 12 }}
      >
        Sign Up
      </button>

      <hr />

      <button onClick={handleGoogleAuth} style={{ width: "100%" }}>
        Continue with Google
      </button>
    </div>
  );
}

export default Login;