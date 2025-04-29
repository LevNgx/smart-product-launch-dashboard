import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loggedInUser,login,logout, } = useAppContext();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation checks
    if (!email || !password) {
      setErrorMessage("Please fill out both email and password fields!");
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address format!");
      return;
    }

    // Clear error if everything is fine
    setErrorMessage("");
    if(login(email, password)){
      navigate('/dashboard');
    }
    else {
      setErrorMessage('User is not registered yet!')
    }
    
    // console.log("Login attempted with:", email, password);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1 style={styles.projectTitle}>Launch Pad</h1>
      <h2 style={styles.heading}>Login</h2>

      {/* Error Message */}
      {errorMessage && (
        <div style={styles.errorBox}>{errorMessage}</div>
      )}

      {/* Email Input */}
      <input 
        type="text" 
        placeholder="Email" 
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setErrorMessage('');
        }}
        style={styles.input}
        
      />

      {/* Password Input */}
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setErrorMessage('');
        }}
        style={styles.input}
        
      />

      {/* Submit Button */}
      <button type="submit" style={styles.button}>Login</button>

      <div style={styles.separator}>or</div>

      <Link to="/register" style={styles.registerButton}>
            Not a User ? <u>Register Here!</u>
      </Link>
    </form>
  );
}

const styles = {
  form: {
    margin:'80px',
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    width: "320px",
  },
  projectTitle: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: "5px",
  },
  heading: {
    marginBottom: "15px",
    textAlign: "center",
    color: "#333",
    fontSize: "20px",
  },
  errorBox: {
    backgroundColor: "#ffe0e0",
    color: "#d8000c",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
    textAlign: "center",
    fontSize: "14px",
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
    transition: "background-color 0.3s ease",
  },

  separator: {
    textAlign: "center",
    margin: "10px 0",
    color: "#999",
  },
  
  registerButton: {
    backgroundColor: "white",
    color: "black",
    padding: "10px",
    borderRadius: "4px",
    textDecoration: "none",
    display: "block",
    textAlign: "center",
    fontSize: "14px",
    marginTop: "10px",
    cursor: "pointer",
  },
  
};

export default LoginPage;
