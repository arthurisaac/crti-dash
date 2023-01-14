import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { child, ref, get } from "firebase/database";
import { auth, db } from '../firebase';

export default function TopBar(props) {

    const navigate = useNavigate();
    const [phones, setPhones] = useState([]);
    const [user, setUser] = useState(null);
    const { setPhone } = props;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const dbRef = ref(db);
            setUser(user)
            get(child(dbRef, `user/${user.uid}`)).then((snapshot) => {
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

    return user ? <div style={{ marginBottom: 20 }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href="#"/>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" onClick={handleLogout}>Quitter</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <select className="form-select" aria-label="Default select example" name='phone'  onChange={(e) => setPhone(e.target.value)}>
                            {
                                phones.map((p, i) => (
                                    <option key={i}>{p}</option>
                                ))
                            }

                        </select>
                    </form>
                </div>
            </div>
        </nav>



    </div> : <></>
}