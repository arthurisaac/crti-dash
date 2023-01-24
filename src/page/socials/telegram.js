import { ref, get, child } from "firebase/database";
import { auth, db } from '../../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import DataTable from "react-data-table-component";

export default function Telegram(props) {
    const [notifications, setNotifications] = useState([]);
    const { phone } = props;
    const columns = [
        {
            name: 'Titre',
            selector: row => <div style={{ whiteSpace: "pre-wrap"}}>{row.title}</div>,
            sortable: true,
        },
        {
            name: 'Text',
            selector: row => <div style={{ whiteSpace: "pre-wrap"}}>{row.text}</div>,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.dateTime,
            sortable: true,
        },
    ];

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/notificationsMessages/data`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setNotifications([]);
                        Object.values(snapshot.val()).map((key) => {
                            if (key.type === 5) {
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
        <h1>Telegram</h1>

        <DataTable columns={columns} data={notifications} pagination/>

        {/*<table className="table">
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Titre</td>
                    <td>Texte</td>
                </tr>
            </thead>
            <tbody>
                {
                    notifications.map((notification, index) => (
                        <tr key={index}>
                            <td>{notification.dateTime}</td>
                            <td>{notification.title}</td>
                            <td style={{ width: '60%' }}>{notification.text}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>*/}

    </div>
}