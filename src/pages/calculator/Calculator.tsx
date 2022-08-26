import { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import MapView from '../../compoents/MapView';
import { SourceDestinationInterface } from "../../shared/types";
import USA_AIRPORTS_OPTIONS from "../../shared/data/usaAirports.json";
import { calculateDistance } from "../../shared/utils";

const defaultSourceDestinationConfig: SourceDestinationInterface = {
    lat: 0,
    lng: 0,
    name: "",
    errorMessage: ""
};

const Calculator = () => {
    const [source, setSource] = useState<SourceDestinationInterface>(defaultSourceDestinationConfig)
    const [destination, setDestination] = useState<SourceDestinationInterface>(defaultSourceDestinationConfig)
    const [distance, setDistance] = useState<number>(0)

    const handleDistanceCalculate = (lat1: number, lon1: number, lat2: number, lon2: number, unit?: string) => {
        if (source.name && destination.name) {
            setDistance(calculateDistance(lat1, lon1, lat2, lon2, unit))
        } else {
            setDistance(0)
            if (!source.name) {
                setSource({ ...source, errorMessage: "Please Select Source" })
            } if (!destination.name) {
                setDestination({ ...destination, errorMessage: "Please Select Destination" })
            }
        }
    }

    return (
        <div className='main-section'>
            <div className='input-section'>
                <div className='input-places'>
                    <div className='input-selector'>
                        <Autocomplete
                            id="source"
                            options={USA_AIRPORTS_OPTIONS}
                            renderInput={params => (
                                <TextField {...params} label="Source" variant="outlined" />
                            )}
                            getOptionLabel={option => option.name}
                            onChange={(_event, airport: any) => {
                                if (airport) {
                                    setSource({ lat: parseFloat(airport.lat), lng: parseFloat(airport.lng), name: airport.name, errorMessage: "" })
                                } else {
                                    setSource(defaultSourceDestinationConfig)
                                    setDistance(0)
                                }
                            }}
                        />
                        <Typography className='error-msg'>{source.errorMessage}</Typography>
                    </div>
                    <div className='input-selector'>
                        <Autocomplete
                            id="destination"
                            options={USA_AIRPORTS_OPTIONS}
                            renderInput={params => (
                                <TextField {...params} label="Destination" variant="outlined" />
                            )}
                            getOptionLabel={option => option.name}
                            onChange={(_event, airport: any) => {
                                if (airport) {
                                    setDestination({ lat: parseFloat(airport.lat), lng: parseFloat(airport.lng), name: airport.name, errorMessage: "" })
                                } else {
                                    setDestination(defaultSourceDestinationConfig)
                                    setDistance(0)
                                }
                            }}
                        />
                        <Typography className='error-msg'>{destination.errorMessage}</Typography>
                    </div>
                </div>

                <div className='calculate-button'>
                    <Button variant="contained" onClick={() => handleDistanceCalculate(source.lat, source.lng, destination.lat, destination.lng, "N")}>Calculate Distance</Button>
                </div>

                <div className='distance'>
                    <Typography>Distance: {distance ? distance.toFixed(2) : distance} Nautical Miles</Typography>
                </div>
            </div>

            <MapView source={source} destination={destination} />
        </div>
    )
}

export default Calculator