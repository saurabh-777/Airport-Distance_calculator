import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Polyline
} from "@react-google-maps/api";
import { SourceDestinationInterface } from "../shared/types";

interface IProps {
    source: SourceDestinationInterface;
    destination: SourceDestinationInterface;
}

const center = { lat: 42.877742, lng: -97.380979 };

const MapView = ({ source, destination }: IProps) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    });

    return (
        <div>
            {isLoaded && <div>
                <GoogleMap
                    center={center}
                    zoom={5}
                    mapContainerStyle={
                        {
                            position: 'relative',
                            width: '100%',
                            height: '50vh',
                            margin: '40px auto 0px',
                            overflow: 'hidden',
                            borderRadius: '8px',
                            boxShadow: '0px 0px 20px 6px #d0d0d0f7',
                        }
                    }
                >
                    <Marker label={"Source"} position={{ lat: source.lat, lng: source.lng }} />
                    <Marker label={"Destination"} position={{ lat: destination.lat, lng: destination.lng }} />
                    <Polyline
                        path={[{ lat: source.lat, lng: source.lng }, { lat: destination.lat, lng: destination.lng }]}
                        visible={source.name && destination.name ? true : false}
                    />
                </GoogleMap>
            </div>}
        </div>
    )
}

export default MapView