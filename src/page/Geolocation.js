import React from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import {db} from '../firebase';
import {child, get, onValue, ref as firebaseRef, ref} from "firebase/database";
import {auth} from '../firebase';
import {onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import Map from "./components/Map";
import GoogleMapReact from "google-map-react";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export const AnyReactComponent = ({text, lat, lng}) => <div>
    {/*<img src={pin} alt="pin" style={{width: 20}}/>*/}
    <i className='bx bx-mobile' style={{color: 'red'}}/>
    <div style={{width: 80, backgroundColor: '#fff', fontWeight: 'bold'}}>{text}</div>
    <div style={{width: 130, color: 'red', backgroundColor: '#fff', fontWeight: 'bold'}}>{lat}, {lng}</div>
</div>;

export default function Geolocation(props) {
    const [position, setPosition] = useState({lat: 0, long: 0});
    const {phone} = props;

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                //const query = ref(db, `user/${user.uid}/${phone}/location`);
                //onValue(query, (snapshot) => {
                const dbRef = firebaseRef(db);
                get(child(dbRef, `user/${user.uid}/${phone}/location`))
                    .then((snapshot) => {
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
            {/*<Map positions={[]} position={position} suppressMarkers={false} />*/}
            {/*{position ? <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyCMPfgRI9IUDK66_a_BYOVunqfxfqEoy00"}}
                defaultCenter={{
                    lat: 0,
                    lng: 0,
                }}
                center={{
                    lat: position.lat,
                    lng: position.long
                }}
                defaultZoom={14}
                zoom={17}
                options={map => ({mapTypeId: map.MapTypeId.SATELLITE})}
            >
                <AnyReactComponent
                    lat={position.lat}
                    lng={position.long}
                    text={phone}

                />
            </GoogleMapReact> : <div>Position non récupéré</div>
            }*/}
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
                </MapContainer> : <div>Position non récupéré</div>
            }
        </div>
    </div>
}
