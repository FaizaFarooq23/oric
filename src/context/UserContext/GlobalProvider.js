import React, { createContext, useEffect, useReducer, useState } from 'react';
import UserReducer from './AppReducer';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const initialState = {
  user: null,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!session || !session.user) return; // Ensure session and session.user exist
      
      try {
        setLoading(true);
        let userData;
        if (session.user.username === "admin") {
          userData = await fetchAdminData(session.user.username);
        } else {
          userData = await fetchFacultyData(session.user.username);
        }
        updateUser(userData);
      } catch (error) {
        console.error("Error fetching personal information:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log("Error is here")
    fetchData();
  }, [session]);

  async function fetchAdminData(username) {
    const res = await axios.get(`/api/admin/get_admin`, {
      params: { username }
    });
    return res.data.admin;
  }

  async function fetchFacultyData(username) {
    const res = await axios.get(`/api/faculty/get_faculty`, {
      params: { username }
    });
    return res.data.faculty;
  }

  function updateUser(user) {
    dispatch({
      type: 'UPDATE_USER',
      payload: user,
    });
  }

  function logoutUser() {
    dispatch({
      type: 'LOGOUT_USER',
    });
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        updateUser,
        logoutUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
