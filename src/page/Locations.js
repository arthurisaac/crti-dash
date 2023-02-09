import React, {useRef} from 'react';
import {db} from '../firebase';
import {onValue, ref as firebaseRef, get, child} from "firebase/database";
import {auth} from '../firebase';
import {onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import Map from './components/Map';
import exportAsImage from "./components/exportAsImage";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";

export default function Locations(props) {
    const [positions, setPositions] = useState([]);
    const [position, setPosition] = useState({});
    const exportRef = useRef();

    const {phone} = props;

    useEffect(() => {
        if (phone) {
            setPositions([]);
            onAuthStateChanged(auth, (user) => {
                const dbRef = firebaseRef(db);
                get(child(dbRef, `user/${user.uid}/${phone}/location/HOURLY`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        //console.log(snapshot.val())
                        let arr = [];
                        Object.values(snapshot.val()).map((pos) => {
                            arr.push(pos)
                        })
                        setPositions(arr)
                        console.log(arr)
                    } else {
                        console.log('no positions')
                    }

                });

                //const location_query = firebaseRef(db, `user/${user.uid}/${phone}/location`);
                //onValue(location_query, (snapshot) => {
                get(child(dbRef, `user/${user.uid}/${phone}/location`))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            const position = data["data"];
                            if (position) {
                                setPosition({lat: position.latitude, long: position.longitude})
                            }
                        }
                    });
            })
        }
    }, [phone])

    return <div className="card" style={{height: '70%'}}>
        <div style={{height: '100vh', width: '100%'}} ref={exportRef}>
            <p>
                <button onClick={() => exportAsImage(exportRef.current, "test")}>Enregistrer</button>
                <button onClick={() => window.print()}>Imprimer</button>
            </p>

            {/*<Map positions={positions} position={position} suppressMarkers={true} ref={exportRef}/>*/}
            {(position.lat && position.long) ?
                <MapContainer center={[position.lat, position.long]} zoom={12} scrollWheelZoom={false}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[position.lat, position.long]}>
                        <Popup>
                            {position.lat}. {position.long} <br />
                        </Popup>
                    </Marker>
                    {
                        positions.length > 0 ? <>
                        {
                            positions.map((pos) => (
                                <Marker position={[pos.latitude, pos.longitude]}>
                                    <Popup>
                                        {pos.latitude}. {pos.longitude} <br />
                                    </Popup>
                                </Marker>
                            ))
                        }

                        </> : <></>
                    }
                </MapContainer> : <div>Patientez pendant la récupération des positions</div>
            }
        </div>
    </div>
}
