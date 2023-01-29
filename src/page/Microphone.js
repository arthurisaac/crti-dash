import {ref, get, child, update, onValue} from "firebase/database";
import {auth, db, storage} from '../firebase';
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

export default function Microphone(props) {
    const [audio, setAudios] = useState([]);
    const [user, setUser] = useState({});
    const [time, setTime] = useState(10000);
    const [loading, setLoading] = useState(false);
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            setAudios([]);
            onAuthStateChanged(auth, (user) => {
                setUser(user);
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
        setLoading(true);
        const updates = {};
        updates[`user/${user.uid}/${phone}/recording/params/recordAudio`] = true;
        updates[`user/${user.uid}/${phone}/recording/params/timeAudio`] = time;
        update(ref(db), updates).then(() => setTimeout(() => {
            alert("Commande envoyée!")
            setLoading(false);
        }, 5000));
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
                <input type="range" step="10" name="name" min="10" max="1000" onChange={(e) => {
                    console.log(e.target.value * 1000)
                    setTime(e.target.value * 1000)
                }} />
            </div>
        </div>

        { Object.keys(user).length > 0 && (
            <div className="row">
                <div className="col-6">
                    { loading ? <p>Chargement en cours</p> : <button className="btn btn-sm" onClick={recordAudio}>Enregistrer un audio</button>}
                </div>
            </div>
        )}

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