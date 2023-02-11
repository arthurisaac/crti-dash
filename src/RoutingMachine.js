import L from "leaflet";
//import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
    const positions = props.positions;
    const arr = [];
    positions.map(pos => {
        arr.push(L.latLng(pos.latitude, pos.longitude))
    })
    const instance = L.Routing.control({
        waypoints: arr,
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false
    });

    return instance;
};

const RoutingMachine = {}//createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
