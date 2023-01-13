import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";

export default function Sidebar() {
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        })
    })

    const menus = [
        {
            name: "Dashboard",
            url: "/"
        },
        {
            name: "Emplacement GPS",
            url: "/emplacement-gps"
        },
        {
            name: "Contacts",
            url: "/contacts"
        },
        {
            name: "Messages textes",
            url: "/sms"
        },
        {
            name: "Log d'appels",
            url: "/call-logs"
        },
        {
            name: "Application installées",
            url: "/installed-apps"
        }
    ]

    return <>
        {
            user ? <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="/"
                       className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline">CRIT</span>
                    </a>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                        id="menu">
                        {
                            menus.map( (menu, i) => (
                                <li className="nav-item" key={i}>
                                    <NavLink to={menu.url} className="nav-link align-middle px-0">
                                        <i className="fs-4 bi-house"/> <span
                                        className="ms-1 d-none d-sm-inline">{menu.name}</span>
                                    </NavLink>
                                </li>
                            ))
                        }

                    </ul>
                    <hr />
                    <div className="dropdown pb-4">
                        <a href="#"
                           className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                           id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30"
                                 className="rounded-circle" />
                            <span className="d-none d-sm-inline mx-1">{user?.email}</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li><a className="dropdown-item" href="#">Déconnexion</a></li>
                        </ul>
                    </div>
                </div>
            </div> : <></>
        }

        </>

    // const [phones, setPhones] = useState([]);
    // const [phone, setPhone] = useState("");

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         const query = ref(db, `${user.uid}`)
    //         return onValue(query, (snapshot) => {
    //             const data = snapshot.val();
    //             let keys = Object.keys(data);
    //             console.log(keys)
    //             //console.log(data)
    //             setPhones(prev => [...phones, keys])
    //         });
    //     });
    // }, [])
    // return <>
    //     <div className="sidebar">
    //         <div className="logo-details">
    //             <i className='bx bx-globe'></i>
    //             <span className="logo">CRTI</span>
    //         </div>
    //         <ul className="nav-links">
    //             <li>
    //                 <a href="#">
    //                     <i className='bx bxs-home'></i>
    //                     <span className="link_name ft">Tableau de bord</span>
    //                 </a>
    //                 <ul className="sub-menu blank">
    //                     <li><a href="#" className="l-name">Caracteristique Generales</a></li>
    //                 </ul>
    //             </li>

    //             <li>
    //                 <div className="icon-link2">
    //                     <a href="#">
    //                         <i className='bx bx-grid-alt'></i>
    //                         <span className="link_name ft">CaracteristiqueG</span>
    //                     </a>
    //                     <i className='bx bx-chevron-down arrow'></i>
    //                 </div>
    //                 <ul className="sub-menu">
    //                     <li><a className="l-name ft" href="#">Contact</a></li>
    //                     <li><a href="#">Contact</a></li>
    //                     <li><a href="#">Messages texts</a></li>
    //                     <li><a href="#">Appels</a></li>
    //                     <li><a href="#">Photos</a></li>
    //                     <li><a href="#">Videos</a></li>
    //                     <li><a href="#">Reseaux wifi</a></li>
    //                     <li><a href="#">Application</a></li>
    //                 </ul>
    //             </li>

    //             <li>
    //                 <a href="/emplacement-gps">
    //                     <i className='bx bx-current-location'></i>
    //                     <span className="link_name ft">Emplacement GPS</span>
    //                 </a>
    //                 <ul className="sub-menu blank">
    //                     <li><a href="#" className="l-name ft">GPS</a></li>
    //                 </ul>
    //             </li>

    //             <li>
    //                 <div className="icon-link2">
    //                     <a href="#">
    //                         <i className='bx bxl-meta'></i>
    //                         <span className="link_name ft">Reseaux sociaux</span>
    //                     </a>
    //                     <i className='bx bx-chevron-down arrow'></i>
    //                 </div>
    //                 <ul className="sub-menu">
    //                     <li><a className="l-name" href="#">whatsapp</a></li>
    //                     <li><a href="#">whatsapp</a></li>

    //                     <li>
    //                         <a href="#">facebook</a>
    //                     </li>
    //                     <li><a href="#">tiktok</a></li>
    //                 </ul>
    //             </li>

    //             <li>
    //                 <a href="#">
    //                     <i className='bx bx-screenshot'></i>
    //                     <span className="link_name ft">Capture d'ecran</span>
    //                 </a>
    //                 <ul className="sub-menu blank">
    //                     <li><a href="#" className="l-name ft">capture</a></li>
    //                 </ul>
    //             </li>

    //             <li>
    //                 <a href="#">
    //                     <i className='bx bx-history'></i>
    //                     <span className="link_name ft">Historique</span>
    //                 </a>
    //                 <ul className="sub-menu blank">
    //                     <li><a href="#" className="l-name ft">Historique</a></li>
    //                 </ul>
    //             </li>

    //             <li>
    //                 <a href="#">
    //                     <i className='bx bx-cog'></i>
    //                     <span className="link_name ft">Reglages</span>
    //                 </a>
    //                 <ul className="sub-menu blank">
    //                     <li><a href="#" className="l-name ft">Reglages</a></li>
    //                 </ul>
    //             </li>

    //             <li>
    //                 <div className="profile-details">
    //                     <div className="profile-content">
    //                         <img src="images/just.jpeg" alt="peofile" />
    //                     </div>
    //                     <i className='bx bx-log-out'></i>
    //                 </div>
    //             </li>
    //         </ul>
    //     </div>
    // </>
}