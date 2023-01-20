import { ref, get, child } from "firebase/database";
import { auth, db } from '../../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

export default function WhatsApp(props) {
    const [notifications, setNotifications] = useState([]);
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/notificationsMessages/data`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setNotifications([]);
                        Object.values(snapshot.val()).map((key) => {
                            if (key.type === 2) {
                                setNotifications((prev) => [...prev, key]);
                            }
                        })
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            });
        }
    });

    return <div className="card p-3" style={{ height: 'auto' }}>
        <h1>WhatsApp</h1>

        <table className="table">
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Titre</td>
                    <td>Texte</td>
                </tr>
            </thead>
            <tbody>
                {
                    notifications.reverse().map((notification, index) => (
                        <tr key={index}>
                            <td>{notification.dateTime}</td>
                            <td>{notification.title}</td>
                            <td style={{ width: '60%' }}>{notification.text}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>
}