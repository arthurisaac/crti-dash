import React from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { db } from '../firebase';
import { onValue, ref, get, child } from "firebase/database";
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";
import GoogleMapReact from 'google-map-react';
import { useEffect, useState } from "react";
import { withScriptjs } from "react-google-maps";
import Map from './components/Map';

const AnyReactComponent = ({ text }) => <div>
    <i className='bx bx-mobile' style={{ color: 'red' }} />
    <div style={{ width: 80 }}>{text}</div>
</div>;

export default function Locations(props) {
    const [positions, setPositions] = useState([]);
    const [position, setPosition] = useState({});
    const { phone } = props;

    useEffect(() => {
        if (phone) {
            setPositions([]);
            onAuthStateChanged(auth, (user) => {
                const dbRef = ref(db);
                get(child(dbRef, `user/${user.uid}/${phone}/locations`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val())
                        let arr = [];
                        Object.values(snapshot.val()).map((pos) => {
                            //setPositions(prev => [...prev, pos]);
                            arr.push(pos)
                        })
                        setPositions(arr)
                    } else {
                        console.log('no positions')
                    }

                });

                const location_query = ref(db, `user/${user.uid}/${phone}/location`);
                onValue(location_query, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const position = data["data"];
                        if (position) {
                            setPosition({ lat: position.latitude, long: position.longitude })
                        }
                    }
                });
            })
        }
    }, [phone])

    return <div className="card" style={{ height: '70%' }}>
        <div style={{ height: '100vh', width: '100%' }}>
            <p>Map</p>
            <Map positions={positions} position={position} />
        </div>
    </div>
}
