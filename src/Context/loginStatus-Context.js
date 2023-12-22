import { createContext } from 'react';

const LoginContext = createContext({ isLogin: false, login: () => {}, logout: () => {} });

export default LoginContext;
