import { getUserById } from "@/lib/api/users";
import { auth, database } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Formlogin() {
    const router = useRouter()
    const [showAdmin, setShowAdmin] = useState(false);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const getUser = async () => {
        if (!auth.currentUser) return;
        const user = await getUserById(auth.currentUser.uid)
        if (!user) return;
        if (user.admin) {
            setShowAdmin(true);
            console.log(user?.admin)
        }
        else setShowAdmin(false);
        console.log(user.admin)
        console.log(showAdmin)
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );

        }
        catch (error) {
            console.error(error)
        }
        getUser()
        router.push("/")
    };
    return (   
        <div className="form-login-container"> 
        <div className="form-login-div-logo">
            <a href="/">
            <img className="form-login-fleche" src="/img/fleche.png"></img>
            </a>
            <img className="form-login-logo" src="/img/PoutineLogo.png"></img>
        </div>
            <form className="form-login" onSubmit={(event) => handleSubmit(event)}>
            <div>
            <h1>Connexion</h1>
            <p>Aucun compte? <Link href={"/signup"}>Création de compte</Link><br></br>Cela prend moins d'une minute</p>
            </div>
                <div>
                    <label>Adresse courriel</label>
                    <input name="Email" onChange={e => setLoginEmail(e.target.value)}></input>
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input type={"password"} name="password" onChange={e => setLoginPassword(e.target.value)}></input>
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    )

}

export default Formlogin;
