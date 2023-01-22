import {ref, get, child, update} from "firebase/database";
import {auth, db} from '../firebase';
import React, {useState, useEffect} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {Row} from "react-bootstrap";

export default function Videos(props) {
    const [videos, setVideos] = useState([]);
    const [videoCount, setVideoCount] = useState(2);
    const [user, setUser] = useState({});
    const {phone} = props;

    useEffect(() => {
        if (phone) {
            setVideos([]);
            onAuthStateChanged(auth, (user) => {
                setUser(user);
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/videos/data`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        //console.log(snapshot.val());
                        Object.values(snapshot.val()).map((photo) => {
                            setVideos(prevState => [...prevState, photo])
                        })
                        console.log(videos)
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
        updates[`user/${user.uid}/${phone}/videos/params/getVideos`] = true;
        updates[`user/${user.uid}/${phone}/videos/params/count`] = videoCount;
        update(ref(db), updates).then(() => alert('Commande envoyée'));
    }


    return <div className="card p-3" style={{height: 'auto'}}>

        <div className="row">
            <div className="col-6">
                <button className="btn btn-sm" onClick={getPhotos}>Recupérer des vidéos</button>
            </div>
        </div>

        <Row xs={2} md={4} className="g-4">
            {
                videos.map((video, i) => (
                    <div className="card" key={i} style={{ height: 'auto' }}>
                        <video width="320" height="240" controls>
                            <source src={video.file} type="video/mp4" />
                                    Your browser does not support the video tag.
                        </video>
                        <div className="card-body">
                            <h6 className="card-title">{video.name}</h6>
                            <div className="card-text">
                                {/*<small className="text-muted">{photo.dateTime}</small><br/>*/}
                                <p><a href={video.file} target="_blank" download>Téléchager</a></p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Row>

    </div>
}