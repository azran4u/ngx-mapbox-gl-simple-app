import { Component, OnInit } from '@angular/core';
import { MapMouseEvent, GeoJSONGeometry, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw, Point } from 'mapbox-gl';
import { GeoJson, FeatureCollection, IMap, IMapLayer } from './map';


@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  
  map: Map;
  style = 'mapbox://styles/mapbox/streets-v9';
  center: LngLatLike = [35, 35];

  geojson : GeoJSON.FeatureCollection<GeoJSONGeometry> = {
    "type": "FeatureCollection",
    "features": []
  };
  
  layer : Layer = {
    id: "point",
    type: "circle",
    source: "custom",        
    paint: {
        "circle-radius": 10,
        "circle-color": "#007cbf"
    }    
  };

  source : GeoJSONSourceRaw = {
    "type": "geojson",
    "data": this.geojson
  };
  
  marker : any = {
    type: "Feature",
    geometry: {
      type: 'Point',
      coordinates: []
    }
  };

  constructor(){
  }

  ngOnInit(){
    this.initializeMap();
  }
   
  initializeMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXpyYW40dSIsImEiOiJjam9rMDhqZzMwOXMwM3dxYWF3ZTd6ZjN2In0.3nut3OCPi9M0kL3cZ1JKtQ';    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 5,
      center: this.center,
      renderWorldCopies: false
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (event) => {
      this.mapClickEventHandler();     
      this.centerMap();              
      this.addMarkerToFeatures();
    })    
  }

  mapClickEventHandler(){    
    this.map.on('click', (event) => {
    const coordinates = [event.lngLat.lng, event.lngLat.lat];
    this.center = coordinates;    
    })
  }

  flyTo(data: GeoJson) {
    this.center = data.geometry.coordinates;
    this.map.flyTo({
      center: this.center
    })
  };  

  
  centerMap(){            
    console.log(`centerMap : ${this.center}`);
    this.map.flyTo({          
      center: this.center
    }); 
  }
  
  addMarkerToFeatures(){
    
    this.map.addSource('custom', this.source);   
    this.map.addLayer(this.layer);  

    let i: number;
    let j: number;
    let N: number = 50;
    for(i = 1; i<=N; i++) {
      for(j = 1; j<=N; j++) {
        var deepClone = { ...this.marker, geometry: {...this.marker.geometry}};
        deepClone.geometry.coordinates = [35+i,35+j];            
        this.geojson.features.push(deepClone);     
      }      
    }
    this.renderMap();
  }

  renderMap(){
    (<GeoJSONSource>(this.map.getSource('custom'))).setData(this.geojson);   
  }
  markerShow(){
    this.map.setLayoutProperty('point', 'visibility', 'visible');
  }

  markerHide(){
    this.map.setLayoutProperty('point', 'visibility', 'none');
  }

  markerMoveRandom(){
    for (var _i = 0; _i < this.geojson.features.length; _i++) {
      var current = (<any>this.geojson.features[_i].geometry).coordinates;
      var random = Math.floor(Math.random() * 100) - 50;
      (<any>this.geojson.features[_i].geometry).coordinates = [current[0]+random, current[1]+random];
    }
    this.renderMap();
  }

  markerMoveByTime(){            
    var self = this;    
    var timer = window.setInterval(function() {self.markerMoveRandom();}, 2000);
  }
  

  
}
