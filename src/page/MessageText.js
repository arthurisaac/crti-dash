import {child, get, onValue, ref as firebaseRef, ref} from "firebase/database";
import {auth, db} from '../firebase';
import React, {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import DataTable from 'react-data-table-component';

export default function MessageText(props) {
    const [messages, setMessages] = useState([]);
    //const [sms, setSMS] = useState([]);
    const {phone} = props;
    const columns = [
        {
            name: 'Numéro de téléphone',
            selector: row => row.number,
            sortable: true,
        },
        {
            name: 'Message',
            selector: row => <div style={{ whiteSpace: "pre-wrap"}}>{row.text}</div>,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => new Date(row.date).toUTCString(),
            sortable: true,
        }
    ];
    /*const columnsSMS = [
        {
            name: 'Numéro de téléphone',
            selector: row => row.smsAddress,
            sortable: true,
        },
        {
            name: 'Message',
            selector: row => <div style={{ whiteSpace: "pre-wrap"}}>{row.smsBody}</div>,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => <span>{row.type === 2 ? 'Entrant' : 'Sortant'}</span>,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.dateTime,
            sortable: true,
        }
    ];*/

    useEffect(() => {
        if (phone) {
            setMessages([])
            onAuthStateChanged(auth, (user) => {
                const old_sms_query = firebaseRef(db, `user/${user.uid}/${phone}/smses`);
                onValue(old_sms_query, (snapshot) => {
                    if (snapshot.exists()) {
                        let arr = [];
                        Object.values(snapshot.val()).map((item) => {
                            arr.push(item)
                        })
                        setMessages(arr);
                    }
                });

                /*const sms_query = firebaseRef(db, `user/${user.uid}/${phone}/sms/data`);
                onValue(sms_query, (snapshot) => {
                    if (snapshot.exists()) {
                        let arr = [];
                        Object.values(snapshot.val()).map((item) => {
                            arr.push(item)
                        })
                        setSMS(arr);
                    }
                });*/
            });
        }
    }, [phone])

    return <div className="card p-3" style={{height: 'auto'}}>
        <h1>Anciens messages</h1>

        <DataTable columns={columns} data={messages} pagination/>
        {/*<table className="table">
            <thead>
            <tr>
                <td>Numéro de téléphone</td>
                <td>Message</td>
                <td>Type</td>
                <td>Date</td>
            </tr>
            </thead>
            <tbody>
            {
                messages.map((message, index) => (
                    <tr key={index}>
                        <td>{message.number}</td>
                        <td>{message.text}</td>
                        <td>{message.type === 1 ? 'Entrant' : 'Sortant'}</td>
                        <td>{new Date(message.date).toUTCString()}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>*/}
    </div>
}