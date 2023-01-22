import React, {useEffect, useState} from 'react';
import {redirect, useNavigate} from 'react-router-dom';
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from '../firebase';
import '../dashboard.css';
import Geolocation, {AnyReactComponent} from './Geolocation';
import {child, get, onValue, ref} from "firebase/database";
import GoogleMapReact from "google-map-react";

const customCourbes = {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px"
}

const customCourbesDetails = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

const customCourbesTitle = {
    fontSize: "20px",
    fontWeight: "500",
    textAlign: "left"
}

const customStyle = {
    width: "65%",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
    padding: "20px",

}

const customStats = {
    width: "35%",
    marginLeft: "20px",
    background: "#fff",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
    padding: "20px",
    borderRadius: "12px"
}

const customGps = {
    width: "auto",
    marginLeft: "20px",
    background: "#fff",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
    padding: "20px",
    borderRadius: "12px"
}

const customGpsTitle = {
    fontSize: "20px",
    fontWeight: "500",
    textAlign: "center"
}

export default function Home(props) {
    const navigate = useNavigate();
    const [latestCall, setLatestCall] = useState([]);
    const [latestSMS, setLatestSMS] = useState([]);
    const [device, setDevice] = useState({});
    const [totalNotification, setTotalNotification] = useState(0);
    const [user, setUser] = useState({});
    const [position, setPosition] = useState({lat: 0, long: 0});
    const [positions, setPositions] = useState([]);
    const {phone} = props;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log("uid", uid)
            } else {
                console.log("user is logged out")
                navigate("/login");
            }
        });
    }, [navigate])

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const dbRef = ref(db);
                    get(child(dbRef, `user/${user.uid}/${phone}/call_logs`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            //setCallLogs(snapshot.val());
                            if (snapshot.val().length > 0) {
                                setLatestCall(snapshot.val()[0]['number'])
                            }
                        } else {
                            console.log("No data available");
                        }
                    }).catch((error) => {
                        console.error(error);
                    });

                    get(child(dbRef, `user/${user.uid}/${phone}/location/HOURLY`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            console.log(snapshot.val())
                            let arr = [];
                            let i = 0;
                            Object.values(snapshot.val()).map((pos) => {
                                if (i < 5) {
                                    arr.push(pos)
                                }
                                i++;
                            })
                            setPositions(arr)
                        } else {
                            console.log('no positions')
                        }

                    });
                }
            });
        }
    }, [phone])

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const dbRef = ref(db);
                    get(child(dbRef, `user/${user.uid}/${phone}/smses`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            //setCallLogs(snapshot.val());
                            if (snapshot.val().length > 0) {
                                setLatestSMS(snapshot.val()[0]['text'])
                            }
                        } else {
                            console.log("No data available");
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            });
        }
    }, [phone])

    useEffect(() => {
        if (phone) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const dbRef = ref(db);
                    get(child(dbRef, `user/${user.uid}/${phone}/notificationsMessages`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            //setCallLogs(snapshot.val());
                            if (snapshot.val().length > 0) {
                                setTotalNotification(snapshot.val().length)
                            }
                        } else {
                            console.log("No data available");
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            });
        }
    }, [phone])

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

            onAuthStateChanged(auth, (user) => {
                const query = ref(db, `user/${user.uid}/${phone}/data`);
                onValue(query, (snapshot) => {
                    console.log(snapshot.val())
                    setDevice(snapshot.val())
                });
            })
        }
    }, [phone])

    return <>
        <div className="home-content">
            <div className="overview-boxes">
                <div className="box">
                    <div className="box_topic">Dernier appel reçu</div>
                    <div className="number">
                        <i className='bx bx-mobile'/>
                        {latestCall}
                    </div>
                    <div className="number-call"/>
                </div>

                <div className="box">
                    <div className="box_topic">Dernier message reçu</div>
                    <div style={{fontSize: 12}}>
                        {latestSMS}
                    </div>
                    <div className="number-call"/>
                </div>

                <div className="box">
                    <div className="box_topic">Total notifications</div>
                    <div className="number">
                        <i className='bx bx-mobile'/>
                        {totalNotification}
                    </div>
                    <div className="number-call"/>
                </div>
            </div>

            <div className="courbes-boxes" style={customCourbes}>
                <div className="use-courbes" style={customStyle}>
                    <div className="title" style={customCourbesTitle}>5 dernières positions</div>
                    <div className="details-courbes" style={customCourbesDetails}>
                        <table className="table">
                            <thead>
                            <tr>
                                <td>Date</td>
                                <td>Coordonnées</td>
                                <td>Adresses</td>
                                <td/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                positions ? positions.map((map, i) => (
                                    <tr key={i}>
                                        <td>{map.dateTime}</td>
                                        <td>{map.latitude}, {map.longitude}</td>
                                        <td>{map.address}</td>
                                        <td>
                                            <a href={`https://maps.google.com/maps?z=12&t=m&q=${map.latitude},${map.longitude}`}>Ouvrir
                                                sur Maps</a>
                                        </td>
                                    </tr>
                                )) : <tr>
                                    <td colSpan={4}>Aucune position recueillie</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>
                    <div className="details-courbes" style={customCourbesDetails}>
                        Les positions sont recueillies par heures
                    </div>
                </div>

                <div className="stats-boxes" style={customStats}>
                    <div className="title">Information sur l'appareil</div>
                    <br/>
                    <div>
                        <h6>Nom personnalisé</h6>
                        <p>{device?.nameChild}</p>
                        <br/>
                        <h6>Nom de l'appareil</h6>
                        <p>{device?.nameDevice}</p>
                    </div>
                </div>
            </div>

            <div className="gps" style={customGps}>
                <div className="title">Dernier emplacement</div>
                <div className="map-details">
                    <div className="card" style={{height: '70%'}}>
                        <div style={{height: '300px', width: '100%'}}>
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
                </div>
            </div>


        </div>

    </>
}