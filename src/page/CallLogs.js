import { ref, get, child } from "firebase/database";
import { auth, db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

export default function CallLog(props) {
    const [calls, setCallLogs] = useState([]);
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const dbRef = ref(db);
                get(child(dbRef, `${user.uid}/${phone}/CALL_LOG`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setCallLogs(snapshot.val());
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            });
        }
    }, [phone])

    return <div className="card p-3" >
        <h1>Log d'appels</h1>

        <table className="table">
            <thead>
            <tr>
                <td>Numéro de téléphone</td>
                <td>Durée d'appel</td>
                <td>Type</td>
                <td>Date</td>
            </tr>
            </thead>
            <tbody>
            {
                calls.map((call, index) => (
                    <tr key={index}>
                        <td>{call.number}</td>
                        <td>{call.duration}</td>
                        <td>{call.type}</td>
                        <td>{new Date(call.date).toUTCString()}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>

    </div>
}