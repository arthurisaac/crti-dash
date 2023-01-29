import React, {useRef} from 'react';
import {db} from '../firebase';
import {onValue, ref as firebaseRef, get, child} from "firebase/database";
import {auth} from '../firebase';
import {onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import Map from './components/Map';
import exportAsImage from "./components/exportAsImage";

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
                        console.log(snapshot.val())
                        let arr = [];
                        Object.values(snapshot.val()).map((pos) => {
                            arr.push(pos)
                        })
                        setPositions(arr)
                    } else {
                        console.log('no positions')
                    }

                });

                const location_query = firebaseRef(db, `user/${user.uid}/${phone}/location`);
                onValue(location_query, (snapshot) => {
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
        <div style={{height: '100vh', width: '100%'}} ref={exportRef} >
            <p><button  onClick={() => exportAsImage(exportRef.current, "test")}>Enregistrer</button><button  onClick={() => window.print()}>Imprimer</button></p>

            <Map positions={positions} position={position} suppressMarkers={true} ref={exportRef} />
        </div>
    </div>
}
