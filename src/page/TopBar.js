import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { child, ref, get } from "firebase/database";
import { auth, db } from '../firebase';

export default function TopBar(props) {

    const navigate = useNavigate();
    const [phones, setPhones] = useState([]);
    //const [phone, setPhone] = useState("");
    const { setPhone } = props;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const dbRef = ref(db);
            get(child(dbRef, `${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    let keys = Object.keys(data);
                    console.log(keys);
                    keys.map(key => setPhones(prevState => [...prevState, key]))
                    setPhone(keys[0])
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        });
    }, [setPhone])

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }

    return <>

        <select name='phone'  onChange={(e) => setPhone(e.target.value)}>
            {
                phones.map((p, i) => (
                    <option key={i}>{p}</option>
                ))
            }

        </select>

        <button className="btn btn-sm" style={{ float: 'right'}} onClick={handleLogout}>
            Déconnexion
        </button>
    </>
}