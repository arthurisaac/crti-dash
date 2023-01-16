import React, { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth} from '../firebase';
import '../dashboard.css';
import Geolocation from './Geolocation';

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

export default function Home() {
    const navigate = useNavigate();

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

    return <>
        <div className="home-content">
            <div className="overview-boxes">
                <div className="box">
                    <div className="box_topic">Contact avec plus d'appel</div>
                    <div className="number">
                        <i className='bx bx-mobile'/>
                        70xxxxxx
                    </div>
                    <div className="number-call">42 fois</div>
                </div>

                <div className="box">
                    <div className="box_topic">Contact avec plus d'appel</div>
                    <div className="number">
                        <i className='bx bx-mobile'/>
                        70xxxxxx
                    </div>
                    <div className="number-call">42 fois</div>
                </div>

                <div className="box">
                    <div className="box_topic">Site web le plus utilises</div>
                    <div className="number">
                        <i className='bx bx-mobile'/>
                            google.com
                    </div>
                    <div className="number-call">42 fois</div>
                </div>
            </div>

                <div className="courbes-boxes" style={customCourbes}>
                    <div className="use-courbes" style={customStyle}>
                        <div className="title" style={customCourbesTitle}>Courbes d'utilisations</div>
                        <div className="details-courbes" style={customCourbesDetails}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                        <div className="details-courbes" style={customCourbesDetails}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        </div>    
                    </div>

                    <div className="stats-boxes" style={customStats}>
                        <div className="title">Statistique utilisateur</div>
                    </div>
                </div>

                <div className="gps" style={customGps}>
                    <div className="title">Dernier emplacement</div>
                    <div className="map-details" >
                        <Geolocation/>
                    </div>
                </div>


        </div>

    </>
}