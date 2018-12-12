import { VectorSource, MapMouseEvent, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw } from 'mapbox-gl';
import { getRandomInt } from '../utils/random';

export class Circle {
    static source: GeoJSONSourceRaw = {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: []
        }
    }

    static layer: Layer = {
        'id': 'circle',
        'source': 'circle-source',
        'type': 'circle',
        "paint": {
            "circle-radius": 10,
            "circle-color": "#007cbf"
        }
    }

    static data = {
        type: 'FeatureCollection',
        features: []
    };

    

    static pointOnCircle(angle) {
        var radius = 20;
        return {
            "type": "Point",
            "coordinates": [
                Math.cos(angle) * radius,
                Math.sin(angle) * radius
            ]
        };
    }

}