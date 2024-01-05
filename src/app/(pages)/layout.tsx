"use client";
import appwriteService from "@/appwrite/config";
import Blog from "@/components/Blog";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/authContext";
import React,{useEffect,useState} from "react";

const ProtectedLayout = ({children,}: { children: React.ReactNode }) =>{
    const [authStatus,setAuthStatus] = useState(false);
    const[loader,setLoader] = useState(true); 

    useEffect(()=>{
        appwriteService.isLoggedIn() // returns a boolean promise Promise<boolean>
        .then(setAuthStatus) // The `then(setAuthStatus)` line is part of a promise chain in JavaScript. The `then` method is called when a Promise resolves successfully, and it takes a callback function as an argument. The callback function is invoked with the resolved value of the Promise.In this case, `setAuthStatus` is likely a function that updates the state of an authentication status in a React component. It's being used as the callback function for `then`, which means it will be called with the resolved value of the preceding Promise.
        .finally(()=>setLoader(false)); //whatever value is returned by isLoggedIn functionis passed in the .ten callback setAuthStatus(true) is true value is returned
    },[]);

    return(
        <AuthProvider value={{authStatus,setAuthStatus}}>
            {!loader && (
                <>
                <div className="text-primary">
                        <div className="fixed -z-[1] left-1/3 w-12 top-2/3 blur-2xl">
                            <Blog blur />
                        </div>
                        <div className="fixed -z-[1] left-2/3 w-12 top-1/3 blur-2xl">
                            <Blog blur />
                        </div>
                        <div className="fixed -z-[1] left-1/4 w-40 top-1/4 blur-2xl opacity-50">
                            <Blog blur />
                        </div>
                        <div className="fixed -z-[1] left-1/2 w-32 top-1/2 blur-2xl opacity-60">
                            <Blog blur />
                        </div>
                        <div className="fixed -z-[1] left-[45%] w-12 top-1/3 blur-2xl">
                            <Blog blur />
                        </div>
                        <div className="fixed -z-[1] left-3/4 w-60 top-1/3 opacity-20 blur-2xl">
                            <Blog blur />
                        </div>
                    </div>
                    <Header />
                    <main className="px-2 py-4">
                        {children}
                    </main>
                </>
            )}
        </AuthProvider>
    )
}

export default ProtectedLayout;