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

    return <div style={{ margin: 20 }}>
        <h1>Call Log</h1>
        {
            calls.map((call, index) => (
                <p key={index}>{call.number} {call.duration} {call.type} {new Date(call.date).toUTCString()}</p>
            ))
        }
    </div>
}