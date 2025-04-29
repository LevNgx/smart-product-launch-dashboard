import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function SubmitIdeaPage() {
  const { addIdea, loggedInUser } = useAppContext();
  const navigate = useNavigate();

  // State for each input field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Submitted");
  const [launchDate, setLaunchDate] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !category || !priority) {
      setError("Please fill out all required fields.");
      return;
    }

    const newIdea = {
      id: Math.random()*10,
      title: title,
      description,
      category,
      status,
      launchDate,
      priority,
      userEmail: loggedInUser.email,
      userId: loggedInUser.id
    };

    addIdea(newIdea);
    navigate("/dashboard");
  };

  return (
    <div style={styles.pageWrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>LaunchPad</h2>
        <h3 style={styles.heading}>Submit New Idea</h3>

        {error && <div style={styles.error}>{error}</div>}

        <input
          type="text"
          placeholder="Idea Title*"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Description*"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.textarea}
          rows={4}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Category*</option>
          <option value="Product">Product</option>
          <option value="Feature">Feature</option>
          <option value="Innovation">Innovation</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={styles.input}
        >
          <option value="Submitted">Submitted</option>
          <option value="In Progress">In Progress</option>
          <option value="Launch Ready">Launch Ready</option>
        </select>

        <input
          type="date"
          placeholder="Target Launch Date"
          value={launchDate}
          onChange={(e) => setLaunchDate(e.target.value)}
          style={styles.input}
        />

        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>Priority:</label>
          <label>
            <input
              type="radio"
              value="Low"
              checked={priority === "Low"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Low
          </label>
          <label>
            <input
              type="radio"
              value="Medium"
              checked={priority === "Medium"}
              onChange={(e) => setPriority(e.target.value)}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              value="High"
              checked={priority === "High"}
              onChange={(e) => setPriority(e.target.value)}
            />
            High
          </label>
        </div>

        <button type="submit" style={styles.button}>Submit Idea</button>
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
  textarea: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    resize: "vertical",
  },
  radioGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    fontSize: "14px",
  },
  radioLabel: {
    marginRight: "10px",
    fontWeight: "bold",
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
};

export default SubmitIdeaPage;
