import { VectorSource, MapMouseEvent, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw } from 'mapbox-gl';

export class Museums{
    static source: VectorSource = {
        "type": "vector",
        "url": "mapbox://mapbox.2opop9hr"
    };

    static layer: Layer = {
        'id': 'museums',
        'type': 'circle',
        'source': 'museums',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 8,
            'circle-color': 'rgba(55,148,179,1)'
        },
        'source-layer': 'museum-cusco'
    }

    public static getSource() : VectorSource{
        return this.source;
    }

    public static getLayer() : Layer{
        return this.layer;
    }
}
