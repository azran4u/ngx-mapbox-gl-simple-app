import {Layer, VectorSource , MapboxOptions, Map, GeoJSONGeometry, RasterSource , GeoJSONSource , ImageSource , VideoSource , GeoJSONSourceRaw} from 'mapbox-gl';
import { Feature } from '@turf/helpers';


export class IMapLayer {
    private id: string; 
    private features : GeoJSON.Feature[];
    private layer: Layer;
    
    private geojson: GeoJSON.FeatureCollection<GeoJSONGeometry>
    private source: GeoJSONSourceRaw;

    constructor(id, features, layer){
        this.id = id;
        this.features = features;
        this.layer = layer;     
        
        this.geojson = {
            "type": "FeatureCollection",
            "features": this.features
        };

        this.source = {
            "type": "geojson",
            "data": this.geojson
        };
    }

    public getId(){
        return this.id;
    }

    public getFeatures(){
        return this.features;
    }

    public getLayer(){
        return this.layer;
    }

    public getGeoJSON(){
        return this.geojson;
    }

    public getSource(){
        return this.source;
    }

    public addFeature(feature: GeoJSON.Feature){
        this.features.push(feature);        
    }
}

export class IMap{
    
    private map: Map;
    private layers: IMapLayer[];

    constructor(accessToken: string, options: MapboxOptions, layers?: IMapLayer[]){
        
        mapboxgl.accessToken = accessToken;
        this.map = new mapboxgl.Map(options);
        this.map.addControl(new mapboxgl.NavigationControl());
        
        if( layers ){
            this.layers = layers;
        }
    }

    

    public addLayer(layer: IMapLayer){
        this.layers.push(layer);
    }

    public getLayers() : IMapLayer[]{
        return this.layers;
    }
}





// export class Map {
// }

// export interface IGeometry {
//     type: string;
//     coordinates: number[];
// }

// export interface IGeoJson {
//     type: string;
//     geometry: IGeometry;
//     properties?: any;
//     $key?: string;
// }

// export class GeoJson implements IGeoJson {
//   type = 'Feature';
//   geometry: IGeometry;

//   constructor(coordinates, public properties?) {
//     this.geometry = {
//       type: 'Point',
//       coordinates: coordinates
//     }
//   }
// }

// export class FeatureCollection {
//   type = 'FeatureCollection'
//   constructor(public features: Array<GeoJson>) {}
// }