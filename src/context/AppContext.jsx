// src/context/AppContext.jsx

import { createContext, useContext, useState, useMemo } from "react";
import { users as dummyUsers, ideas as dummyIdeas } from "../data/dummyData";

// 1. Create context
const AppContext = createContext();

// 2. Custom hook for easy context access
export function useAppContext() {
  return useContext(AppContext);
}

// 3. Context Provider
export function AppProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allIdeas, setAllIdeas] = useState(dummyIdeas);
  const [allUsers, addNewUser] = useState(dummyUsers)
  // Track filter status (e.g., "Submitted", "In Progress", "Completed")
  const [filterStatus, setFilterStatus] = useState("");

  // Login logic
  const login = (email, password) => {
    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setLoggedInUser(user);
      return true;
    } else {
      return false;
    }
  };

  // Logout
  const logout = () => {
    setLoggedInUser(null);
  };

  // Add a new idea
  const addIdea = (newIdea) => {
    setAllIdeas((prevIdeas) => [...prevIdeas, newIdea]);
  };

  const addUser = (newUser) => {
    addNewUser((prevUsers)=>[... prevUsers, newUser])
    console.log("user added", allUsers)
  }

  // Filter ideas based on the current user and filter status
  const filteredIdeas = useMemo(() => {
    if (!loggedInUser) return [];
    const userIdeas = allIdeas.filter(
      (idea) => idea.userId === loggedInUser.id
    );
    if (!filterStatus) return userIdeas;
    return userIdeas.filter((idea) => idea.status === filterStatus);
  }, [allIdeas, loggedInUser, filterStatus]);

  
  return (
    <AppContext.Provider
      value={{
        loggedInUser,
        login,
        logout,
        allIdeas,
        addIdea,
        filterStatus,
        setFilterStatus,
        filteredIdeas,
        addUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
