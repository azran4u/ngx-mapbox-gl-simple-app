import { VectorSource, MapMouseEvent, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw } from 'mapbox-gl';
import { getRandomInt } from '../utils/random';

export class Lines {
    static source: GeoJSONSourceRaw = {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: []
        }
    }

    static layer: Layer = {
        'id': 'lines',
        'type': 'line',
        'source': 'lines-source',
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#888",
            "line-width": 8
        }
    }

    static data = {
        type: 'FeatureCollection',
        features: []
    };

    static generateFeature([lng, lat]: number[]): GeoJSON.Feature {
        let offset = 0.005;
        let feature: GeoJSON.Feature = {
            type: 'Feature',
            geometry: {
                "type": "LineString",
                "coordinates": [
                    [lng - 0.5*offset, lat - 0.5*offset],
                    [lng - 2*offset, lat - 2*offset]
                ]
            },
            properties: null
        }
        return feature;
    }
}