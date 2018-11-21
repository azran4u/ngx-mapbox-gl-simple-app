import { VectorSource, MapMouseEvent, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw } from 'mapbox-gl';

export class Museums{
    static source: VectorSource = {
        "type": "vector",
        "url": "mapbox://mapbox.2opop9hr"
    };

    static data: GeoJSONSourceRaw = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [34,34]
              },
              properties: null
            },
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [35,35]
              },
              properties: null
            }
          ]
        }
    };

    static layerVector: Layer = {
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

    static layerGeo: Layer = {
        "id": "museums",
            "type": "line",
            "source": "museums",
            "paint": {
                "line-color": "yellow",
                "line-opacity": 0.75,
                "line-width": 5
            }
        
        
        // 'id': 'museums',
        // 'type': 'circle',
        // 'source': 'museums',
        // 'layout': {
        //     'visibility': 'visible'
        // },
        // 'paint': {
        //     'circle-radius': 8,
        //     'circle-color': 'rgba(55,148,179,1)'
        // }
    }

    public static getVectorSource() : VectorSource{
        return this.source;
    }

    public static getGeoJsonSourceRaw() : GeoJSONSourceRaw{
        return this.data;
    }

    public static getLayerVector() : Layer{
        return this.layerVector;
    }

    public static getLayerGeo() : Layer{
        return this.layerGeo;
    }
}
