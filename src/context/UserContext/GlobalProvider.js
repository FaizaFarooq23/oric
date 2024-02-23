import React, { createContext, useEffect, useReducer } from 'react'
import UserReducer from './AppReducer'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const initialState = {
  user: null,
}

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState)
  const {data: session} = useSession();
  
  
  function updateUser(user) {
    dispatch({
      type: 'UPDATE_USER',
      payload: user,
    })
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/faculty/get_faculty` , {
          params: {
            username: session.user.username,
          }
        });
        console.log(res)
        updateUser(res.data.faculty);
      } catch (error) {
        console.error("Error fetching personal information:", error);
      }
    };
    if(session){
      console.log(session)
      fetchData();
    }
  }, [session]);


  

  function logoutUser() {
    dispatch({
      type: 'LOGOUT_USER',
    })
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        updateUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}