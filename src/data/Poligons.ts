import { VectorSource, MapMouseEvent, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw } from 'mapbox-gl';
import { getRandomInt } from '../utils/random';

export class Poligons{
    static source: GeoJSONSourceRaw = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
    }

    static layer: Layer = {
        id: 'poligons',
        type: 'fill',
        source: 'poligons-source',
        layout: {},
        paint: {
            'fill-color': '#088',
            'fill-opacity': 0.8
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
                type: 'Polygon',
                coordinates: [[
                    [lng+offset, lat+offset],
                    [lng+offset, lat-offset],
                    [lng-offset, lat-offset],                
                    [lng-offset, lat+offset]
                ]]
            },
            properties: null
        }
        return feature;
    }
}