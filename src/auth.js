import {auth,googleProvider} from "./firebase"
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
import React, { useState } from 'react'
import { async } from "@firebase/util"
export const Auth = ()=>{
   const [email,setEmail] = useState("")
   const [Password,setPassword] = useState("") 
    
   const signIn = async ()=>{
        try{await createUserWithEmailAndPassword(auth,email,Password);
        }catch(e){
            console.log(e)
        }
    }
    const signWithGoogle = async()=>{
        try{
            await signInWithPopup(auth,googleProvider)
        }catch(e){
            console.log(e)
        }
    }
    const logout = async ()=>{
        try{
            await signOut(auth)
        }catch(e){
            console.log(e)
        }
    }
    console.log(email)
    return(
    <div>
        <input placeholder = "Email...." onChange={(e)=>setEmail(e.target.value)}/>
        <input placeholder="Password..." type = "password" onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={signIn}>SignIn</button>
        <button onClick={signWithGoogle}>Sign With Google</button>
        <button onClick={logout}>LogOut</button>
    </div>
    )
}
