import { onValue, ref } from "firebase/database";
import { auth, db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

export default function Contacts(props) {
    const [contacts, setContacts] = useState([]);
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const query = ref(db, `${user.uid}/${phone}/CONTACTS`)
                return onValue(query, (snapshot) => {
                    const data = snapshot.val();
                    console.log(data)
                    setContacts(data);
                });
            });
        }
    }, [phone])

    return <div className="card p-3" >
        <h1>CONTACTS</h1>

        <table className="table">
            <thead>
                <tr>
                    <td>Nom du contact</td>
                    <td>Numéro de téléphon</td>
                </tr>
            </thead>
            <tbody>
            {
                contacts.map((contact, index) => (
                    <tr key={index}>
                        <td>{contact.name}</td>
                        <td>{contact.number}</td>
                    </tr>
                ))
            }
            </tbody>

        </table>
    </div>
}