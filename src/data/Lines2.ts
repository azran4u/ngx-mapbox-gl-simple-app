import { VectorSource, MapMouseEvent, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw } from 'mapbox-gl';
import { getRandomInt } from '../utils/random';

export class LinesTwo {
    static source: GeoJSONSourceRaw = {
        type: 'geojson',
        data: {
            type: 'FeatureCollection',
            features: []
        }
    }

    static layer: Layer = {
        'id': 'lines2',
        'type': 'line',
        'source': 'lines2-source',
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
        let mult = 1;
        let feature: GeoJSON.Feature = {
            type: 'Feature',
            geometry: {
                "type": "LineString",
                "coordinates": [
                    [lng + mult*0.5*offset, lat + mult*0.5*offset],
                    [lng + mult*2*offset, lat + mult*2*offset]
                ]
            },
            properties: null
        }
        return feature;
    }
}