import { async } from "@firebase/util";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  DatabaseReference,
  get,
  push,
  ref,
  remove,
  set,
  child,
} from "firebase/database";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { auth, database } from "@/lib/firebase";
    DatabaseReference,
    get,
    push,
    ref,
    remove,
    set,
    child,
  } from "firebase/database";
  import {
    collection,
    addDoc,
    updateDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    limit,
    deleteDoc,
    setDoc,
  } from "firebase/firestore";
import { auth, database } from "@/lib/firebase"


const SignIn = () => {
  const [data, setData] = useState<string>("");
  const userCollection = collection(database, "Users");
  const [resgisterEmail, setRegisterEmail] = useState("");
  const [resgisterPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [showAdmin, setShowAdmin] = useState(false);

  const addUser = async () => {
    if (!auth.currentUser) return;
    const docRef = doc(userCollection, "my.custom.id@gmail.com");
    const docSet = await setDoc(docRef, {
      uid: auth.currentUser?.uid,
      admin: false,
    });
  };

  const getUser = async () => {
    if (!auth.currentUser) return;
    const docRef = doc(database, "User", auth.currentUser?.uid);
    const docSnap = await getDoc(docRef);
    setData((data) => {
      return `${docSnap.id} => ${JSON.stringify(docSnap.data())} \n`;
    });
    console.log(docSnap.data());
  };

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        resgisterEmail,
        resgisterPassword
      );
      addUser();
    } catch (error) {}
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      if (
        auth.currentUser?.uid == "zK4Zqji7ghXesLpn4YTxpHZ7StN2" ||
        auth.currentUser?.uid == "zjqv7AWMiHQvidL9w9odYb45Hmj2"
      ) {
        setShowAdmin(true);
      } else setShowAdmin(false);
    } catch (error) {}
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
        <button onClick={getUser}>get uid</button>
      </div>
      {showAdmin ? <h3>Admin page</h3> : null}
    </div>
  );
};

export default SignIn;
