import React from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import {db} from '../firebase';
import {onValue, ref} from "firebase/database";
import {auth} from '../firebase';
import {onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import Map from "./components/Map";

export const AnyReactComponent = ({text, lat, lng}) => <div>
    {/*<img src={pin} alt="pin" style={{width: 20}}/>*/}
    <i className='bx bx-mobile' style={{ color: 'red'}}/>
    <div style={{ width: 80}}>{text}</div>
    <div style={{ width: 120, color: 'red'}}>{lat}, {lng}</div>
</div>;

export default function Geolocation(props) {
    const [position, setPosition] = useState({lat: 0, long: 0});
    const {phone} = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                const query = ref(db, `user/${user.uid}/${phone}/location`);
                onValue(query, (snapshot) => {
                    const data = snapshot.val();
                    const position = data["data"];
                    if (position) {
                        setPosition({lat: position.latitude, long: position.longitude})
                    }

                });
            })
        }
    }, [phone])

    return <div className="card" style={{height: '70%'}}>
        <div style={{height: '100vh', width: '100%'}}>
            <Map positions={[]} position={position} suppressMarkers={false} />
        </div>
    </div>
}
