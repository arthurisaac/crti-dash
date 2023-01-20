import {ref, get, child, update, onValue} from "firebase/database";
import {auth, db, storage} from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

export default function Microphone(props) {
    const [audio, setAudios] = useState([]);
    const [user, setUser] = useState({});
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            setAudios([]);
            onAuthStateChanged(auth, (user) => {
                setUser(user);
                const dbRef = ref(db);
                /*get(child(dbRef, `user/${user.uid}/${phone}/recording/data`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        //console.log(snapshot.val());
                        Object.values(snapshot.val()).map((item) => {
                            getUrl(item)
                        })
                    } else {
                        console.log("No audio available");
                    }
                }).catch((error) => {
                    console.error(error);
                });*/
                const query = ref(db, `user/${user.uid}/${phone}/recording/data`);
                onValue(query, (snapshot) => {
                    setAudios([]);
                    Object.values(snapshot.val()).map((item) => {
                        getUrl(item)
                    })
                });
            });
        }
    }, [phone])

    const recordAudio = () => {
        const updates = {};
        updates[`user/${user.uid}/${phone}/recording/params/recordAudio`] = true;
        updates[`user/${user.uid}/${phone}/recording/params/timeAudio`] = 10000;
        update(ref(db), updates).then(() => console.log('Command sent'));
    }

    const getUrl = (data) => {
        const audioRef = storageRef(storage, `${data.nameAudio}`);
        getDownloadURL(audioRef).then(url => {
            setAudios(prevState => [...prevState, { ...data, url }])
        })
    }


    return <div className="card p-3" style={{ height: 'auto' }}>

        <div className="row">
            <div className="col-6">
                <button className="btn btn-sm" onClick={recordAudio}>Enregistrer un audio</button>
            </div>
        </div>

        <table className="table">
            <thead>
            <tr>
                <td>Date</td>
                <td>Photo</td>
            </tr>
            </thead>
            <tbody>
            {
                audio.map((file, index) => (
                    <tr key={index}>
                        <td>{new Date(file.dateTime).toUTCString()}</td>
                        <td><a href={file.url} target="_blank" download>Télécharger</a></td>
                    </tr>
                ))
            }
            </tbody>
        </table>

    </div>
}