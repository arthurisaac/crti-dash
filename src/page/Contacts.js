import {child, get, onValue, ref} from "firebase/database";
import { auth, db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

export default function Contacts(props) {
    const [contacts, setContacts] = useState([]);
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/contacts`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setContacts(data);
                    } else {
                        console.log("No data available");
                        alert("No contact")
                    }
                }).catch((error) => {
                    console.error(error);
                });

            });
        }
    }, [phone])

    return <div className="card p-3"  style={{ height: 'auto'}}>
        <h1>CONTACTS</h1>

        <table className="table">
            <thead>
                <tr>
                    <td>Nom du contact</td>
                    <td>Numéro de téléphone</td>
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