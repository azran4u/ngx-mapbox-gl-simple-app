import { Component, OnInit } from '@angular/core';
import { MapMouseEvent, GeoJSONGeometry, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw, Point } from 'mapbox-gl';

@Component({
  selector: 'app-mapboxgl-map',
  templateUrl: './mapboxgl-map.component.html',
  styleUrls: ['./mapboxgl-map.component.css']
})
export class MapboxglMapComponent implements OnInit {

  map: Map;
  style = 'mapbox://styles/mapbox/streets-v9';
  center: LngLatLike = [35, 35];

  pointsGeojson : GeoJSON.FeatureCollection<GeoJSONGeometry> = {
    "type": "FeatureCollection",
    "features": []
  };
  
  pointsSource : GeoJSONSourceRaw = {
    "type": "geojson",
    "data": this.pointsGeojson
  };

  pointsLayer : Layer = {
    id: "point",
    type: "circle",
    source: "custom",        
    paint: {
        "circle-radius": 10,
        "circle-color": "#007cbf"
    }    
  };

  pointsMarker : GeoJSON.Feature = {
    type: "Feature",
    geometry: {
      type: 'Point',
      coordinates: []
    },
    properties : null
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
      this.pointsInit();
    })    
  }

  mapClickEventHandler(){    
    this.map.on('click', (event) => {
    const coordinates = [event.lngLat.lng, event.lngLat.lat];
    this.center = coordinates;    
    })
  }

  flyTo(data: LngLat) {
    this.center = [data.lng, data.lat];
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
  
  changeMapStyle(){
    this.style = 'mapbox://styles/mapbox/satellite-v9';
    this.map.setStyle(this.style);    
  }

  pointsInit(){
    
    this.map.addSource('custom', this.pointsSource);   
    this.map.addLayer(this.pointsLayer);  

    let i: number;
    let j: number;
    let N: number = 30;
    for(i = 1; i<=N; i++) {
      for(j = 1; j<=N; j++) {
        var deepClone : GeoJSON.Feature = { ...this.pointsMarker, geometry: {...this.pointsMarker.geometry}};        
        (<any>deepClone.geometry).coordinates = [35+i,35+j];            
        this.pointsGeojson.features.push(deepClone);     
      }      
    }
    this.pointsRender();
  }

  pointsRender(){
    (<GeoJSONSource>(this.map.getSource('custom'))).setData(this.pointsGeojson);   
  }

  pointsShow(){
    this.map.setLayoutProperty('point', 'visibility', 'visible');
  }

  pointsHide(){
    this.map.setLayoutProperty('point', 'visibility', 'none');
  }

  pointsMoveRandom(){
    for (var _i = 0; _i < this.pointsGeojson.features.length; _i++) {
      var current = (<any>this.pointsGeojson.features[_i].geometry).coordinates;
      var random = Math.floor(Math.random() * 100) - 50;
      (<any>this.pointsGeojson.features[_i].geometry).coordinates = [current[0]+random, current[1]+random];
    }
    this.pointsRender();
  }

  pointsMoveByTime(){            
    var self = this;    
    var timer = window.setInterval(function() {self.pointsMoveRandom();}, 2000);
  }

}

