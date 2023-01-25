import { async } from '@firebase/util'
import React , { useState } from 'react'
import { 
    createUserWithEmailAndPassword ,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../authentication/firebaseAuth';

const SignIn = () => {

const [resgisterEmail, setRegisterEmail] = useState("");
const [resgisterPassword, setRegisterPassword] = useState("");

const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");


const register = async () => {
 try {
    const user =  await createUserWithEmailAndPassword(
        auth,
        resgisterEmail,
        resgisterPassword
        );
 } catch (error) {
     
 }
  
};
const login = async () => {
    try {
        const user =  await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
            );
     } catch (error) {
         
     }
};
const logout = async () => {
    await signOut(auth);
};

  return (
    <div>
    <h1>SignIn</h1>
        <div>
        <h3>Register User</h3>
        <input placeholder='Email...'
        onChange={(event) => {
            setRegisterEmail(event.target.value);
        }}></input>
        <input placeholder='Password...'
         onChange={(event) => {
            setRegisterPassword(event.target.value);
        }}></input>

        <button onClick={register}>Create User</button>
        </div>

        <div>
            <h3>Login</h3>
            <input placeholder='Email...'
             onChange={(event) => {
                setLoginEmail(event.target.value);
            }}/>
            <input placeholder='Password...'
             onChange={(event) => {
                setLoginPassword(event.target.value);
            }}/>

            <button onClick={login}>login</button>
        </div>

        <div>
            <h4>User logged In: {auth.currentUser?.email}</h4>
            <button onClick={logout}>Sign out</button>
        </div>
    </div>
    
  )
}

export default SignIn