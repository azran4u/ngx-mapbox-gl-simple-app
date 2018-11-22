import {Layer, VectorSource , RasterSource , GeoJSONSource , ImageSource , VideoSource , GeoJSONSourceRaw} from 'mapbox-gl';

export class Map {
}

export class IMapLayer {
    private id: string; 
    private source: VectorSource | RasterSource | GeoJSONSource | ImageSource | VideoSource | GeoJSONSourceRaw;
    private layer: Layer;

    constructor(id, source, layer){
        this.id = id;
        this.source = source;
        this.layer = layer;        
    }

    public getId(){
        return this.id;
    }

    public getSource(){
        return this.source;
    }

    public getLayer(){
        return this.layer;
    }
}

export class IMap{
    private layers: IMapLayer[];

    constructor(layers: IMapLayer[]){                        
        this.layers = layers;
    }


    public addLayer(layer: IMapLayer){
        this.layers.push(layer);
    }

    public getLayers() : IMapLayer[]{
        return this.layers;
    }
}

export interface IGeometry {
    type: string;
    coordinates: number[];
}

export interface IGeoJson {
    type: string;
    geometry: IGeometry;
    properties?: any;
    $key?: string;
}

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    }
  }
}

export class FeatureCollection {
  type = 'FeatureCollection'
  constructor(public features: Array<GeoJson>) {}
}