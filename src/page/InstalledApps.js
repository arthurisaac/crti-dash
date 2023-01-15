import {child, get, ref} from "firebase/database";
import { auth, db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

export default function InstalledApps(props) {
    const [apps, setApps] = useState([]);
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {

                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/applications`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        console.log(data)
                        setApps([]);
                        // eslint-disable-next-line array-callback-return
                        Object.values(data).map((app) => {
                            setApps((apps) => [...apps, app]);
                        })
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            });
        }
    }, [phone])

    return <div className="card p-3" style={{ height: 'auto'}}>
        <h1>Applications</h1>
        <table className="table">
            <thead>
            <tr>
                <td>ID</td>
                <td>Nom de l'application</td>
            </tr>
            </thead>
            <tbody>
            {
                apps.map((app, index) => (
                    <tr>
                        <td>{index}</td>
                        <td key={index}>{app.name}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>

    </div>
}