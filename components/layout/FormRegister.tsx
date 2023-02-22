import { getUserById } from "@/lib/api/users";
import { auth, database } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import Link from "next/link";

function FormRegister() {
  const userCollection = collection(database, "Users");
  const router = useRouter();
  const [showAdmin, setShowAdmin] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [username, setUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPasswordConfirm, setregisterPasswordConfirm] = useState("");
  const [formerror, setFormError] = useState("");

  const getUser = async () => {
    if (!auth.currentUser) return;
    const user = await getUserById(auth.currentUser.uid);
    if (!user) return;
    if (user.admin) {
      setShowAdmin(true);
      console.log(user?.admin);
    } else setShowAdmin(false);
    console.log(user.admin);
    console.log(showAdmin);
  };
  const addUser = async () => {
    if (!auth.currentUser) return;
    const docRef = doc(userCollection, auth.currentUser.uid);
    const docSet = await setDoc(docRef, {
      uid: auth.currentUser?.uid,
      admin: false,
      username: username,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!registerEmail.trim()) {
      setFormError("L'adresse courriel ne peut pas être vide");
      return;
    }
    if (!username.trim()) {
      setFormError("Le nom d'utilisateur ne peut pas être vide");
      return;
    }
    if (!registerPassword.trim()) {
      setFormError("Le mot de passe ne peut pas être vide");
      return;
    }
    if (!(registerPassword == registerPasswordConfirm)) {
      setFormError("Les deux mot de passe doivent être identique");
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      addUser();
    } catch (error) {
      console.error(error);
    }
    getUser();
    router.push("/");
  };
  return (
    <div className="form-login-container">
      <div className="form-login-div-logo">
        <Link href="/">
          <img className="form-login-fleche" src="/img/fleche.png"></img>
        </Link>
        <img className="form-login-logo" src="/img/PoutineLogo.png"></img>
      </div>
      <form className="form-login" onSubmit={(event) => handleSubmit(event)}>
        <div>
          <h1>Création de compte</h1>
          <p>
            Vous avez un compte? <Link href={"/signup"}>Connexion</Link>
          </p>
        </div>
        <p>{formerror}</p>
        <div>
          <label>Nom d&apos;utilisateur</label>
          <input
            required
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Adresse courriel</label>
          <input
            required
            name="Email"
            onChange={(e) => setRegisterEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            required
            type={"password"}
            name="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Confirmation de mot de passe</label>
          <input
            required
            type={"password"}
            name="password"
            onChange={(e) => setregisterPasswordConfirm(e.target.value)}
          ></input>
        </div>
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
}

export default FormRegister;
