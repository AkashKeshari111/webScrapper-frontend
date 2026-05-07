import {
  createContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchCurrentUser = async () => {

      try {

        const response = await axios.get(
          "http://localhost:8080/api/auth/me",
          {
            withCredentials: true,
          }
        );

        setUser(response.data.data);

      } catch (error) {

        setUser(null);

      } finally {

        setLoading(false);
      }
    };

    fetchCurrentUser();

  }, []);


  const login = (userData) => {
    setUser(userData);
  };


  
  const logout = async () => {

    try {

      await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

    } catch (error) {

      console.log(error);
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};