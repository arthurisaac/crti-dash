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
                get(child(dbRef, `${user.uid}/${phone}/INSTALLED_APPS`)).then((snapshot) => {
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

    return <div style={{ margin: 20 }}>
        <h1>Applications</h1>
        {
            apps.map((app, index) => (
                <p key={index}>{app.name}</p>
            ))
        }
    </div>
}