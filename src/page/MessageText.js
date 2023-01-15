import {child, get, onValue, ref} from "firebase/database";
import {auth, db} from '../firebase';
import React, {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";

export default function MessageText(props) {
    const [messages, setMessages] = useState([]);
    const {phone} = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/smses`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        console.log(data)
                        setMessages(data);
                    } else {
                        console.log("No data available");
                        alert("Aucun message")
                    }
                }).catch((error) => {
                    console.error(error);
                });
            });
        }
    }, [phone])

    return <div className="card p-3"  style={{ height: 'auto'}}>
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
                        <td>{message.type === 1 ? 'Entrant' : 'Sortant'}</td>
                        <td>{new Date(message.date).toUTCString()}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
}