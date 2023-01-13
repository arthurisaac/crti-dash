import {onValue, ref} from "firebase/database";
import {auth, db} from '../firebase';
import React, {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";

export default function MessageText(props) {
    const [messages, setMessages] = useState([]);
    const {phone} = props;

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

    return <div style={{margin: 20}}>
        <h1>Messages</h1>

        <table className="table">
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
                        <td>{new Date(message.date).toUTCString()}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
}