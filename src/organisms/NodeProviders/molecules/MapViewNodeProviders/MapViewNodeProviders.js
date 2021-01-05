import MemoMarker from "assets/icons/Marker";
import { Box, Grid, Text, Flex, Button } from "atoms";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

/**
 *  coordinates: [long, lat],
 */
const markers = [
  {
    coordinates: [-99.133209, 19.432608],
  },
  {
    coordinates: [-79.238609, 42.095554],
  },
  { coordinates: [77.1025, 28.7041] },
  { coordinates: [18.4233, -33.918861] },
  { coordinates: [-70.6693, -33.4489] },
  { coordinates: [-74.0721, 4.711] },
  { coordinates: [-78.4678, -0.1807] },
];

export const MapViewNodeProviders = () => {
  return (
    <>
      <ComposableMap
        projectionConfig={{
          scale: 300,
          rotation: [-11, 0, 0],
        }}
        className="google-map"
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#142E54"
                  stroke="#142D51"
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <MemoMarker height="1.5rem" width="1.5rem" fill="#129EED" />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};
