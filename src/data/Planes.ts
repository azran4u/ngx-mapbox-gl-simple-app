import { VectorSource, MapMouseEvent, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw } from 'mapbox-gl';
import { getRandomInt } from '../utils/random';

export class Planes{
    static source: GeoJSONSourceRaw = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
    }

    static layer: Layer = {
        id: 'planes',
        type: 'symbol',
        source: 'planes-source',
        maxzoom: 24,
        minzoom: 0,
        layout: {
            "icon-image": 'plane',
            "icon-allow-overlap": true,
            "text-allow-overlap": true,
            "icon-size": 0.3,
            "icon-rotate": {
                "property": "rotation",
                "type": "categorical",
                "stops": [
                    [30, 30],
                    [60, 60],
                    [90, 90],
                    [120, 120],
                    [150, 150],
                    [180, 180],
                    [210, 210],
                    [240, 240],
                    [270, 270],
                    [300, 300],
                    [330, 330],
                    [360, 360]
                ],
                "default": 0
            }
        },
        paint: {
            "text-color": '#000'
        }
    }

    static data = {
        type: 'FeatureCollection',
        features: []
    };

    static generateFeature([lng, lat]: number[]): GeoJSON.Feature {
        let feature: GeoJSON.Feature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [lng, lat]
            },
            properties: {
                name: 'אBג',
                rotation: (30 * getRandomInt(1, 12)) % 360
            }
        }
        return feature;
    }
}