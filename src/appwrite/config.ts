import conf from "../conf/conf";
import { Client , Account , ID  } from "appwrite";

type CreateUserAccount = { // This is a type definition/alias for the object 
    email:string,
    password:string,
    name:string
}

 type LoginUserAccount = {
    email:string,
    password:string
 }

const appwriteClient = new Client() // Create a new Appwrite client

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId); // Set the Appwrite endpoint and project ID

export const account = new Account(appwriteClient) // Create a new Appwrite account instance using the Appwrite client we created above 

 export class AppwriteService{
    // create a new record of user inside appwrite
    async createUserAccount( {email,password,name} : CreateUserAccount){
        try{
            const userAccount = await account.create(ID.unique(),email,password,name)
            if(userAccount){
                return this.login({email,password})
            }else{
                return userAccount
            }
        }catch(error:any)
        {
            throw error
        }
    }

    async login( { email, password }:LoginUserAccount ) {
        try{
            return await account.createEmailSession(email,password)

        }catch(error:any){
            throw error
        }
    }

    async isLoggedIn():Promise<boolean>{ 
        try{
           const data = await this.getCurrentUser();
           return Boolean(data)
        }catch(error){}
        return false
    }

    async getCurrentUser(){
        try{
            return account.get() // this.getCurrentUSer() also does the same this as account.get()
        }catch(error:any){
            console.log("getcurrentuser",error);
        }
        return null
    }
    async logout(){
        try{
            return await account.deleteSession("current")
        }catch(error:any){
            console.log("logout error :",error);
        }
    }
 }

 const appwriteService = new AppwriteService()// Create a new instance/object of the AppwriteService class and export it so that it can be used in other files and we dont have to repeat the same process of creating a new instance of the class
 export default appwriteService;