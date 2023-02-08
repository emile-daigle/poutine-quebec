
import { async } from "@firebase/util";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, database } from "@/lib/firebase"
import FormAjoutRestaurant from '@/components/layout/FormAjoutRestaurant';
import { getUserById } from "@/lib/api/users";
import Formlogin from "@/components/layout/FormLogin";
import FormRegister from "@/components/layout/FormRegister";

const SignIn = () => {
  const [data, setData] = useState<string>("");
  const userCollection = collection(database, "Users");
  const [resgisterEmail, setRegisterEmail] = useState("");
  const [resgisterPassword, setRegisterPassword] = useState("");
  const [useruid, setuseruid] = useState("")

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [showAdmin, setShowAdmin] = useState(false);

  const addUser = async () => {
    if (!auth.currentUser) return;
    const docRef = doc(userCollection, auth.currentUser.uid);
    const docSet = await setDoc(docRef, {
      uid: auth.currentUser?.uid,
      admin: false,
    });
  };



  const getUser = async () => {
    if (!auth.currentUser) return;
    const user = await getUserById(auth.currentUser.uid)
    if(!user)return;
      if (user.admin) {
        setShowAdmin(true);
        console.log(user?.admin)
      }
      else setShowAdmin(false);
      console.log(user.admin)
      console.log(showAdmin)
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        resgisterEmail,
        resgisterPassword

      );
      addUser();
    } catch (error) {

    }

  };
  const login = async () => {
    const user = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    getUser()
  };
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h1>SignIn</h1>
      <div>
        <h3>Register User</h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        ></input>
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        ></input>

        <button onClick={register}>Create User</button>
      </div>
      <div>
    <h3>Login</h3>
    <input
      placeholder="Email..."
      onChange={(event) => {
        setLoginEmail(event.target.value);
      }}
    />
    <input
      placeholder="Password..."
      onChange={(event) => {
        setLoginPassword(event.target.value);
      }}
    />

    <button onClick={login}>login</button>
  </div>

      <div>
        <h4>User logged In: {auth.currentUser?.email}</h4>
        <button onClick={logout}>Sign out</button>
      </div>
      {showAdmin ? <h3>Admin page</h3> : null}

      {showAdmin ? <FormAjoutRestaurant></FormAjoutRestaurant> : null}

      <Formlogin/>

      <FormRegister/>

      
    </div>

    
  );
};

export default SignIn;
