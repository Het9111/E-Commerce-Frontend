import React, { useState } from 'react';
import LoginContext from './loginStatus-Context';

export default function ContextProvider(props) {
  const [isLogin, setLogin] = useState(false);
  const login = () => {
    setLogin(true);
  };
  const logout = () => {
    setLogin(false);
  };
  return <LoginContext.Provider value={{ isLogin: isLogin, login, logout }}>{props.children}</LoginContext.Provider>;
}
