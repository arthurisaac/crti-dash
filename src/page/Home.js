import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from '../firebase';
import '../dashboard.css';
import {child, get, onValue, ref} from "firebase/database";
import DataTable from 'react-data-table-component';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet-fullscreen/dist/Leaflet.fullscreen'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'

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
    const [position, setPosition] = useState({lat: 0, long: 0});
    const [positions, setPositions] = useState([]);
    const [online, setOnline] = useState("");
    const columns = [
        {
            name: 'Date',
            selector: row => <div style={{ whiteSpace: 'pre-wrap' }}>{row.dateTime}</div>,
            sortable: true,
            width: '150px'
        },
        {
            name: 'Coordon??es',
            selector: row => <div>{row.latitude}, {row.longitude}</div>,
            sortable: false,
            width: '180px'
        },
        {
            name: 'Adresses',
            selector: row => <div style={{ whiteSpace: 'pre-wrap' }}>{row.address}</div>,
            sortable: true,
            width: '50%'
        }
    ];
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
                    setPositions([]);
                    setLatestSMS([]);
                    setLatestCall([]);
                    setTotalNotification(0);
                    setPosition({ lat: 0, long: 0});

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
                    });

                    get(child(dbRef, `user/${user.uid}/${phone}/location/HOURLY`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            let arr = [];

                            Object.values(snapshot.val()).map((pos) => {
                                arr.push(pos)
                            })
                            setPositions(arr)
                        } else {
                            console.log('no positions')
                        }

                    });

                    get(child(dbRef, `user/${user.uid}/${phone}/smses`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            //setCallLogs(snapshot.val());
                            if (snapshot.val().length > 0) {
                                setLatestSMS(snapshot.val()[0]['text'])
                            }
                        } else {
                            console.log("No data available");
                        }
                    });

                    get(child(dbRef, `user/${user.uid}/${phone}/notificationsMessages/data`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            //setCallLogs(snapshot.val());

                            let i = 0;
                            Object.values(snapshot.val()).map(() => {
                                i++
                            });
                            setTotalNotification(i)

                        } else {
                            console.log("No data available");
                        }
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
                        setPosition({lat: position.latitude, long: position.longitude, dateTime: position.dateTime  })
                    }

                });
            })

            onAuthStateChanged(auth, (user) => {
                const query = ref(db, `user/${user.uid}/${phone}/data`);
                onValue(query, (snapshot) => {
                    setDevice(snapshot.val());
                    let data = snapshot.val()
                    if (data.online) {
                        let start = new Date().getTime();
                        let last = new Date(data.online).getTime()
                        let elapsed = start - last
                        let elapsedSeconds = new Date(elapsed).getSeconds()
                        //console.log(elapsedSeconds)
                        /*setTimeout(() => {
                            start = new Date().getTime();
                            let last = new Date(data.online).getTime()
                            let elapsed = start - last
                            let elapsedSeconds = new Date(elapsed).getSeconds()
                            setOnline("Hors ligne")
                        }, 26000)
*/
                        if (elapsedSeconds <= 90) setOnline("En ligne")
                        else setOnline(`Derni??re connexion le ${new Date(data.online).toLocaleString()}`)
                    } else {
                        setOnline("Inconnu")
                    }
                });
            })
        }
    }, [phone])

    return <>
        <div className="home-content">
            <div className="overview-boxes">
                <div className="box">
                    <div className="box_topic">Dernier appel ??mis</div>
                    <div className="number">
                        <i className='bx bx-mobile'/>
                        {latestCall}
                    </div>
                    <div className="number-call"/>
                </div>

                <div className="box">
                    <div className="box_topic">Dernier message re??u</div>
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
                    <div className="title" style={customCourbesTitle}>10 derni??res positions</div>
                    <div className="details-courbes" style={customCourbesDetails}>
                        <div>

                            <DataTable
                                columns={columns}
                                data={positions}
                                pagination
                                dense
                            />
                        </div>
                    </div>
                    <div className="details-courbes" style={customCourbesDetails}>
                        Les positions sont recueillies par heures
                    </div>
                </div>

                <div className="stats-boxes" style={customStats}>
                    <div className="title">Information sur l'appareil</div>
                    <br/>
                    <div>
                        <h6>Nom personnalis??</h6>
                        <p>{device?.nameChild}</p>
                        <br/>
                        <h6>Nom de l'appareil</h6>
                        <p>{device?.nameDevice}</p>
                        <br/>
                        <h6>Status</h6>
                        <p>{ online }</p>
                    </div>
                </div>
            </div>

            <div className="gps" style={customGps}>
                <div className="title">Dernier emplacement</div>
                <div className="map-details">
                    <div className="card" style={{height: '70%'}}>
                        <div style={{height: '300px', width: '100%'}}>
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
                            >
                                <AnyReactComponent
                                    lat={position.lat}
                                    lng={position.long}
                                    text={phone}

                                />
                            </GoogleMapReact> : <div>Position non r??cup??r??</div>
                            }*/}
                            {(position.lat && position.long) ?
                                <MapContainer center={[position.lat, position.long]} zoom={12} scrollWheelZoom={false} fullscreenControl={true}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={[position.lat, position.long]}>
                                        <Popup>
                                            {position.lat}. {position.long} <br/>
                                            {position.dateTime}
                                        </Popup>
                                    </Marker>
                                    {/*<FullscreenControl position="topright" />*/}
                                </MapContainer> : <div>Position non r??cup??r??</div>
                            }
                        </div>
                    </div>
                </div>
            </div>


        </div>

    </>
}