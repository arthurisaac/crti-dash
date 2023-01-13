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
                const query = ref(db, `${user.uid}/${phone}`);
                onValue(query, (snapshot) => {
                    const data = snapshot.val();
                    const position = data["CURRENT_POSITION"];
                    console.log(position.lat, position.long);
                    setPosition({lat: position.lat, long: position.long})
                });
            })
        }
    }, [phone])

    return <div className="card" style={{ height: '70%'}}>
        <div style={{height: '100vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: ""}}
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
            </GoogleMapReact>
        </div>
    </div>
}

/*
export class Geolocation extends Component {

    state = {
        lat: 0,
        long: 0,
        showMap: false,
        phone: this.props.phone
    }

    componentDidMount() {
        if (this.state.phone) {
            this.getData()
        }
    }


    getData() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const query = ref(db, `${user.uid}/${this.state.phone}`);
                onValue(query, (snapshot) => {
                    const data = snapshot.val();
                    const position = data["CURRENT_POSITION"];
                    console.log(position.lat, position.long);
                    this.setState({
                        lat: position.lat,
                        long: position.long
                    })
                    console.log(this.state.lat, this.state.long)
                });
            } else {
                this.setState({
                    showMap: true,
                })
            }

        });
    }

    render() {
        return (
            <div className="home-content">
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={
                        {
                            lat: this.state.lat,
                            lng: this.state.long
                        }
                    }
                    center={
                        {
                            lat: this.state.lat,
                            lng: this.state.long
                        }
                    }
                >
                    <Marker
                        position={{ lat: this.state.lat, lng: this.state.long }}
                        title="derniere position"
                    />
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCMPfgRI9IUDK66_a_BYOVunqfxfqEoy00'
})(Geolocation);*/
