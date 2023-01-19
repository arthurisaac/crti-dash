import React from "react";
import {
    GoogleMap,
    withGoogleMap,
    withScriptjs,
    DirectionsRenderer
} from "react-google-maps";
import { withProps, compose, lifecycle } from "recompose";

const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyCMPfgRI9IUDK66_a_BYOVunqfxfqEoy00&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            this.setState({ position: this.props.position })
            const { lat, long } = this.props.position;
            // TODO: 
            // origin: this.props.position[0]
            // destination: this.props.position.length

            const google = window.google
            const DirectionsService = new google.maps.DirectionsService();

            DirectionsService.route(
                {
                    origin: new google.maps.LatLng(lat, long),
                    destination: new google.maps.LatLng(lat, long),
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: []
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        },
        componentWillReceiveProps(nextProps) {
            //console.log(nextProps);
            //if (nextProps.positions !== this.props.positions) {
            //this.setState({ positions: nextProps.positions });
            //}
            //if (nextProps.position !== this.props.position) {
            //this.setState({ position: nextProps.position });
            //}

            const google = window.google
            const DirectionsService = new google.maps.DirectionsService();
            const { lat, long } = nextProps.position;
            const locations = []
            if (nextProps.positions) {
                nextProps.positions.map((p, i) => {
                    if (i < 25) {
                        locations.push({ location: new google.maps.LatLng(p.latitude, p.longitude) })
                    }
                })
            }

            console.log(locations)

            DirectionsService.route(
                {
                    origin: new google.maps.LatLng(lat, long),
                    destination: new google.maps.LatLng(lat, long),
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: locations
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        this.setState({
                            directions: result
                        });
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }
    })
)(props => (
    <GoogleMap
        defaultZoom={10}
        defaultCenter={new window.google.maps.LatLng(0, 0)}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
));

class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            position: { lat: props.position.latitude, long: props.position.longitude },
            positions: []
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.positions !== this.props.positions) {
            this.setState({ positions: nextProps.positions });
        }
        if (nextProps.position !== this.props.position) {
            this.setState({ position: nextProps.position });
        }
    }

    render() {
        const { position } = this.props;
        return (
            <>
                {(this.props.position.lat && this.props.position.long) ? <MapWithADirectionsRenderer positions={this.state.positions} position={this.state.position} /> : <div>...</div>}
            </>
        );
    }
}

export default Map;
