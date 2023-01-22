import {ref, get, child, update} from "firebase/database";
import {auth, db} from '../firebase';
import React, {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {Row} from "react-bootstrap";

export default function Cameras(props) {
    const [cameras, setCameras] = useState([]);
    const [user, setUser] = useState({});
    const {phone} = props;

    useEffect(() => {
        if (phone) {
            setCameras([]);
            onAuthStateChanged(auth, (user) => {
                setUser(user);
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/photo/data`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        //console.log(snapshot.val());
                        Object.values(snapshot.val()).map((photo) => {
                            setCameras(prevState => [...prevState, photo])
                        })
                        console.log(cameras)
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            });
        }
    }, [phone])

    const captureCameraFront = () => {
        const updates = {};
        updates[`user/${user.uid}/${phone}/photo/params/capturePhoto`] = true;
        updates[`user/${user.uid}/${phone}/photo/params/facingPhoto`] = 1;
        update(ref(db), updates).then(() => console.log('capture sent'));
    }

    const captureCameraBack = () => {
        const updates = {};
        updates[`user/${user.uid}/${phone}/photo/params/capturePhoto`] = true;
        updates[`user/${user.uid}/${phone}/photo/params/facingPhoto`] = 0;
        update(ref(db), updates).then(() => console.log('capture sent'));
    }


    return <div className="card p-3" style={{height: 'auto'}}>

        <div className="row">
            <div className="col-6">
                <button className="btn btn-sm" onClick={captureCameraFront}>Prendre un selfie</button>
            </div>
            <div className="col-6">
                <button className="btn btn-sm" onClick={captureCameraBack}>Prendre une photo</button>
            </div>
        </div>

        <Row xs={2} md={4} className="g-4">
            {
                cameras.map((photo, i) => (
                    <div className="card" key={i} style={{ height: 'auto' }}>
                        <img className="card-img-top img-thumbnail" src={photo.urlPhoto} alt="Card image cap"
                             style={{maxHeight: 250, objectFit: 'cover'}}/>
                        <div className="card-body">
                            <h6 className="card-title">{photo.nameRandom}</h6>
                            <div className="card-text">
                                <small className="text-muted">{photo.dateTime}</small><br/>
                                <small>Position : <a href={`https://maps.google.com/maps?z=12&t=m&q=${photo.location?.lat},${photo.location?.lng}`}>Ouvrir sur Maps</a></small>
                                <p><a href={photo.urlPhoto} target="_blank" download>Téléchager</a></p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Row>
        {/*<table className="table">
            <thead>
            <tr>
                <td>Date</td>
                <td>Nom</td>
                <td>Photo</td>
            </tr>
            </thead>
            <tbody>
            {
                cameras.map((call, index) => (
                    <tr key={index}>
                        <td>{new Date(call.dateTime).toUTCString()}</td>
                        <td>{call.nameRandom}</td>
                        <td><img src={call.urlPhoto} alt={call.nameRandom} className="img-thumbnail" /></td>
                    </tr>
                ))
            }
            </tbody>
        </table>*/}

    </div>
}