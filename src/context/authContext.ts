import { createContext } from "react";

export const AuthContext = createContext<{
    authStatus : boolean;
    setAuthStatus : (status:boolean) => void;// this is a function that takes a boolean as an argument and returns nothing
}>({
    authStatus:false,
    setAuthStatus:()=>{},
});

export const AuthProvider =  AuthContext.Provider;

export default AuthContext;