import React, {
    createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
  } from 'react';
  
import { SignInUser, SignUpUser } from '../services/userService';
  
  const AuthContext = createContext({});
  
  const AuthProvider = ({children}) => {
    const [data, setData] = useState({});

    useEffect(() => {
      async function loadStoragedData() {

        const token = localStorage.getItem('@App:token');
        const email = localStorage.getItem('@App:email');
  
        if (token && email) {
          setData({
            token: token,
            email: email,
          });
        }
        
        return {};
      }
  
      loadStoragedData();
    }, []);
  
    const signIn = useCallback(async ({email, password}) => {
      const response = await SignInUser(email, password);

      if(response !== null)
      {
        if(response.success)
        {
          localStorage.setItem('@App:token', response.token);
          localStorage.setItem('@App:email', email);

          setData({
            token: response.token,
            email: email,
          });
        }else{
          console.log('incorreto');
        }
      }else{
        console.log('incorreto');
      }
      
    }, []);

    const signUp = useCallback(async ({email, password}) => {
      const response = await SignUpUser(email, password)
      if(response !== null)
      {
        if(response.response)
        {
          localStorage.setItem('@App:token', response.token);
          localStorage.setItem('@App:email', email);

          setData({
            token: response.token,
            email: email,
          });
        }else{
          console.log('incorreto');
        }
      }else{
        console.log('incorreto');
      }
    }, []);
  
    const signOut = useCallback(async () => {
      localStorage.removeItem('@App:token');
      localStorage.removeItem('@App:email');
  
      setData({});
    }, []);
  
  
    return (
      <AuthContext.Provider
        value={{
          token: data.token,
          email: data.email,
          signUp,
          signIn,
          signOut,
        }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  function useAuth() {
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  }
  
  export {AuthProvider, useAuth};
  
