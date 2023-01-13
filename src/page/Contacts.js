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

    return <div style={{ margin: 20 }}>
        <h1>CONTACS</h1>
        {
            contacts.map((contact, index) => (
                <p key={index}>{contact.name} {contact.number}</p>
            ))
        }
    </div>
}