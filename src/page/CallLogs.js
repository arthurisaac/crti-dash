import { ref, get, child } from "firebase/database";
import { auth, db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import DataTable from 'react-data-table-component';

export default function CallLog(props) {
    const [calls, setCallLogs] = useState([]);
    const { phone } = props;
    const columns = [
        {
            name: 'Numéro de téléphone',
            selector: row => row.number,
            sortable: true,
        },
        {
            name: 'Durée d\'appel',
            selector: row => row.duration,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.type == 2 ? 'Entrant' : 'Sortant',
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toUTCString(),
            sortable: true,
        }
    ];

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/call_logs`)).then((snapshot) => {
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

    return <div className="card p-3" style={{ height: 'auto' }}>
        <h1>Log d'appels</h1>

        <DataTable columns={columns} data={calls} pagination/>
        {/*<table className="table">
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
        </table>*/}

    </div>
}