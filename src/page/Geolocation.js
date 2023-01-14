import React from 'react';
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import {db} from '../firebase';
import {onValue, ref} from "firebase/database";
import {auth} from '../firebase';
import {onAuthStateChanged} from "firebase/auth";
import GoogleMapReact from 'google-map-react';
import {useEffect, useState} from "react";
import pin from '../images/map-pin.svg';

const AnyReactComponent = ({text}) => <div>
    <img src={pin} alt="pin" style={{width: 20}}/>
    {text}
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
            {position ? <GoogleMapReact
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
            >
                <AnyReactComponent
                    lat={position.lat}
                    lng={position.long}
                    text={phone}

                />
            </GoogleMapReact> : <div>Position non récupéré</div>
            }
        </div>
    </div>
}
