import {ref, get, child, update} from "firebase/database";
import {auth, db} from '../firebase';
import React, {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {Row} from "react-bootstrap";

export default function Photos(props) {
    const [photos, setPhotos] = useState([]);
    const [photoCount, setPhotoCount] = useState(10);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const {phone} = props;

    useEffect(() => {
        if (phone) {
            setPhotos([]);
            onAuthStateChanged(auth, (user) => {
                setUser(user);
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/photos/data`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        Object.values(snapshot.val()).map((photo) => {
                            setPhotos(prevState => [...prevState, photo])
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

    const getPhotos = () => {
        const updates = {};
        setLoading(true);
        updates[`user/${user.uid}/${phone}/photos/params/getPhotos`] = true;
        updates[`user/${user.uid}/${phone}/photos/params/count`] = photoCount;
        update(ref(db), updates).then(() => setTimeout(() => {
            alert("Commande envoyée!")
            setLoading(false);
        }, 5000));
    }


    return <div className="card p-3" style={{height: 'auto'}}>

        {
            Object.keys(user).length > 0 &&
            <div className="row">
                <div className="col-6">
                    { loading ? <p>Chargement en cours</p> : <button className="btn btn-sm" onClick={getPhotos}>Recupérer des photos</button> }
                </div>
            </div>
        }


        <Row xs={2} md={4} className="g-4">
            {
                photos.map((photo, i) => (
                    <div className="card" key={i} style={{ height: 'auto' }}>
                        <img className="card-img-top img-thumbnail" src={photo.file} alt="Card image cap"
                             style={{maxHeight: 250, objectFit: 'cover'}}/>
                        <div className="card-body">
                            <h6 className="card-title">{photo.name}</h6>
                            <div className="card-text">
                                {/*<small className="text-muted">{photo.dateTime}</small><br/>*/}
                                <p><a href={photo.file} target="_blank" download>Téléchager</a></p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Row>

    </div>
}