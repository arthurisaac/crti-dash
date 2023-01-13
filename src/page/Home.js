import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth} from '../firebase';

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("uid", uid)
            } else {
                console.log("user is logged out")
                navigate("/login");
            }
        });
    }, [navigate])

    return <>
       <h1>Accueil</h1>
    </>
}