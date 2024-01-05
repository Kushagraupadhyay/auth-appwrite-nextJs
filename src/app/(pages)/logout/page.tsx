"use client"
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"
import React ,{useEffect} from "react"
import appwriteService from "@/appwrite/config"

const LogoutPage = () => {
    const router = useRouter();
    const {setAuthStatus} = useAuth();

    useEffect(()=>{
        appwriteService.logout() // logout is also returning a promise
        .then(()=>{
            setAuthStatus(false);
            router.replace("/") // pushing to home page - router.replace("/") navigates to the root path ("/") of your application. This means that if the user clicks the browser's back button after this navigation, they won't go back to the previous page, but to the page they were on before the previous page. This is because replace replaces the current history entry instead of adding a new one.
        })

    },[]);

    return (
        <></>
    )

}

export default LogoutPage;
