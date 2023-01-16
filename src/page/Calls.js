import { ref, get, child } from "firebase/database";
import {auth, db, storage} from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

export default function Calls(props) {
    const [calls, setCalls] = useState([]);
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/calls`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        //setCallLogs(snapshot.val());
                        console.log(snapshot.val())
                        setCalls([]);
                        // eslint-disable-next-line array-callback-return
                        Object.values(snapshot.val()).map((call) => {
                            getUrl(call)
                        })
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            });
        }
    }, [phone])

    const getUrl = (data) => {
        const audioRef = storageRef(storage, `${data.file}`);
        getDownloadURL(audioRef).then(url => {
            setCalls(prevState => [...prevState, {...data, url}])
        })
    }

    return <div className="card p-3" >
        <h1>Enregistrement d'appels</h1>

        <table className="table">
            <thead>
            <tr>
                <td>Date</td>
                <td>Taille</td>
                <td>Fichier audio</td>
            </tr>
            </thead>
            <tbody>
            {
                calls.map((call, index) => (
                    <tr key={index}>
                        <td>{new Date(+call.date).toUTCString()}</td>
                        <td>{call.size} o</td>
                        <td>
                            <a href={call.url}>Télécharger</a>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>

    </div>
}