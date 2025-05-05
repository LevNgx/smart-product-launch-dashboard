// src/context/AppContext.jsx

import { createContext, useContext, useState, useMemo } from "react";
import { users as dummyUsers, ideas as dummyIdeas } from "../data/dummyData";
import api from "../api/api";

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
  const login = async (email, password) => {

    try{
      const response = await api.post('/auth/login', {
        email,
        password
      })

      // response return both token and the user data on successul login
      var token = response.data.token
      var user = response.data.user

      setLoggedInUser(user);
      localStorage.setItem("token", token)
      
      return true;
    }
    catch(err){
      console.log(err)
      if(err && err.response && err.data){
        return false;
      }
    }
   
   
  };

  //fetch ideas bases on user id api 
  const fetchUserIdeas = async (userId) => {
    try{
      const resp = await api.get(`/ideas/user/${userId}`);
      console.log("setting ideas here", resp.data)
      setAllIdeas(resp.data);
    }
    catch(err){
      console.error("Error fetching user ideas", err);
    }
  }

  // Logout
  const logout = () => {
    setLoggedInUser(null);
  };

  // Add a new idea
  const addIdea = async (newIdea) => {
    const {title,description,status, user} = newIdea;
    await api.post('/ideas',{
      title,
      description,
      status,
      userId:user.id
    })
    await fetchUserIdeas(loggedInUser.id);
  };

  const addUser = (newUser) => {
    addNewUser((prevUsers)=>[... prevUsers, newUser])
    console.log("user added", allUsers)
  }

  // Filter ideas based on the current user and filter status
  const filteredIdeas = useMemo(() => {
    if (!loggedInUser) return [];
    const userIdeas = allIdeas.filter(
      (idea) => idea.user?.id === loggedInUser.id
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
        addUser,
        fetchUserIdeas
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
