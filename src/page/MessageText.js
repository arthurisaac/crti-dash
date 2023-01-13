import { onValue, ref } from "firebase/database";
import { auth, db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

export default function MessageText(props) {
    const [messages, setMessages] = useState([]);
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const query = ref(db, `${user.uid}/${phone}/SMS`)
                return onValue(query, (snapshot) => {
                    const data = snapshot.val();
                    setMessages(data);
                });
            });
        }
    }, [phone])

    return <div style={{ margin: 20 }}>
        <h1>Messages</h1>
        {
            messages.map((message, index) => (
                <p key={index}>{message.number} {message.text} {new Date(message.date).toUTCString()}</p>
            ))
        }
    </div>
}