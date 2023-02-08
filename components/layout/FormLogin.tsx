import { getUserById } from "@/lib/api/users";
import { auth, database } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
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
            <form className="form-login" onSubmit={(event) => handleSubmit(event)}>
                <div>
                    <label>Adresse courriel</label>
                    <input name="Email" onChange={e => setLoginEmail(e.target.value)}></input>
                </div>
                <div>
                    <label>Mot de passe</label>
                    <input type={"password"} name="password" onChange={e => setLoginPassword(e.target.value)}></input>
                    <p>Mot de passe oublié?</p>
                </div>
                
                <button type="submit">Se connecter</button>
            </form>
        </div>
    )

}

export default Formlogin;
