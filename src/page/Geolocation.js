import React from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import {db} from '../firebase';
import {child, get, ref as firebaseRef} from "firebase/database";
import {auth} from '../firebase';
import {onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";

import {MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup} from 'react-leaflet';

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
                            setPosition({lat: position.latitude, long: position.longitude, dateTime: position.dateTime})
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
                    <LayersControl position="topright">
                        <LayersControl.Overlay checked name="Street map">
                            <LayerGroup>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[position.lat, position.long]}>
                                    <Popup>
                                        {position.lat}. {position.long} <br/> {position.dateTime}
                                    </Popup>
                                </Marker>
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay name="Satelitte map">
                            <LayerGroup>
                                <TileLayer
                                    url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                                    maxZoom={20}
                                    subdomains={['mt1', 'mt2', 'mt3']}
                                />
                                <Marker position={[position.lat, position.long]}>
                                    <Popup>
                                        {position.lat}. {position.long} <br/> {position.dateTime}
                                    </Popup>
                                </Marker>
                            </LayerGroup>
                        </LayersControl.Overlay>
                    </LayersControl>
                </MapContainer> : <div>Position non récupéré</div>
                }
                </div>
                </div>
                }
