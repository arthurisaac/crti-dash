import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth} from '../firebase';
import '../dashboard.css';

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
                        70xxxxxx
                    </div>
                    <div className="number-call">42 fois</div>
                </div>
            </div>
        </div>

    </>
}