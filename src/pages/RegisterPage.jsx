import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const {addUser} = useAppContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }
    if(!emailRegex.test(email)){
        setError("Email is not valid one!")
        return;
    }

    console.log("New user registered:", { name, email, password });
    // Later we'll save the user in context/database
    addUser({
      id: Math.random()*10,
      email,
      password,
      name
    });
    navigate("/");
  };

  return (
    <div style={styles.pageWrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>LaunchPad</h2>
        <h3 style={styles.heading}>Create an Account</h3>

        {error && <div style={styles.error}>{error}</div>}

        <input
          type="text"
          placeholder="Full Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Register</button>

        <div style={styles.loginLink}>
          Already have an account? <a href="/" style={styles.link}>Login</a>
        </div>
      </form>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#bfc3c7",
  },
  form: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    width: "400px",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
    color: "#2C3E50",
    marginBottom: "10px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2C3E50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    backgroundColor: "#ffdddd",
    color: "#a94442",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
    fontSize: "14px",
  },
  loginLink: {
    marginTop: "15px",
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default RegisterPage;
