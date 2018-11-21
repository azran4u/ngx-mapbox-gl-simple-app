import { Component, OnInit } from '@angular/core';
import { MapMouseEvent, GeoJSONGeometry, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw } from 'mapbox-gl';
import { GeoJson, FeatureCollection } from './map';
import { Geometry, geometry, Point } from '@turf/helpers';
import {Museums} from '../data/museums';
// import * as data from '../data/hike.geojson';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  
  map: Map;
  style = 'mapbox://styles/mapbox/streets-v9';
  imageLoaded = false;
  cursorStyle: string;
  center: LngLatLike = [-71.97722138410576, -13.517379300798098];
  marker: Marker;
  message = 'Hello World!';
  a = 10;
  // data
  source: any;
  markers: any;
  collection:any;

  twoPoints: GeoJSONSourceRaw = {         
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [10,10]
          },
          properties: null
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [20,20]
          },
          properties: null
        }
      ]
    }
  };
  pointLayer: Layer = {
    id: "point",
    type: "circle",
    source: "point",        
    paint: {
        "circle-radius": 10,
        "circle-color": "#007cbf"
    }    
  };

  markerPoint: GeoJSON.FeatureCollection<GeoJSONGeometry> = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "description": 'Hello Popup'
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-57.9510569572449, -34.9103230869756]
      }
    }]
  };

  constructor(){
  }

  ngOnInit(){
    this.initializeMap();
    this.initializeCollection();      
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

    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // center map
    this.map.on('load', (event) => {
      this.mapClickEventHandler();     
      this.centerMap();        
      this.addMapElements();      
      this.markerSourceLayer();   
    })    
  }

  initializeCollection(){
    this.collection = {
      type: 'geojson',
      data: {
      type: 'FeatureCollection',
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [this.a,this.a]
          },
          properties: null
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [21,21]
          },
          properties: null
        }
      ]
    }
  }
  }

  mapClickEventHandler(){
    //// Add Marker on Click
    this.map.on('click', (event) => {
    const coordinates = [event.lngLat.lng, event.lngLat.lat];
    this.center = coordinates;
    const newMarker   = new GeoJson(coordinates, { message: this.message });
    // this.mapService.createMarker(newMarker)
    })
  }
  
  addMapElements(){
    /// register source
    this.map.addSource('point', this.collection);
    this.map.addLayer(this.pointLayer); 
    this.museumsLayer();
  }

  updateMapElements(){
    this.a+=10;
    this.collection.data.features[0].coordinates=[this.a, this.a];

    (<GeoJSONSource>(this.map.getSource('point'))).setData({...this.collection.data});
  }  

  flyTo(data: GeoJson) {
    this.center = data.geometry.coordinates;
    this.map.flyTo({
      center: this.center
    })
  };  

  moveMapElements(){
    this.updateMapElements();
  }

  centerMap(){            
    console.log(`centerMap : ${this.center}`);
    this.map.flyTo({          
      center: this.center
    }); 
  }

  museumsLayer(){
    this.map.addSource('museums', Museums.getVectorSource());
    this.map.addLayer(Museums.getLayerVector());    
  }

  museumsLayerShow(){
    this.map.setLayoutProperty('museums', 'visibility', 'visible');
  }

  museumsLayerHide(){
    this.map.setLayoutProperty('museums', 'visibility', 'none');
  }

  markerUpdate(){
    // let bb: GeoJSONSource = <GeoJSONSource>(this.map.getSource('museums'));
    
    var i = 0;
    // let a: FeatureCollection = data.data;
    // let a:any = Museums.getGeoJsonSourceRaw().data;
    // let features = a.features;
    var timer = window.setInterval(function() {
            if (i < 10) {
              this.markerPoint.features[0].geometry.coordinates = [34+i, 34+i];
           // .setData(markerPoint) has bad performance ?
              this.map.getSource('markerPoint').setData(this.markerPoint);

              // a.features[0].geometry.coordinates.push([34+i,34+i]);     
              // this.map.getSource('museums').setData(a);         
              // bb.setData(a);
              // this.map.panTo([34+i,34+i]);
              i++;
            } else {
                window.clearInterval(timer);
            }
        }, 10);
  }

  markerSourceLayer(){
    this.map.addSource('markerPoint', {
      type: 'geojson',
      data: this.markerPoint
    });

    this.map.addLayer({
      "id": "markerPoint",
      "source": "markerPoint",
      "type": "circle",
      "paint": {
        "circle-radius": 8,
        "circle-color": "#ff0000",
        'circle-stroke-color': '#FFF',
        'circle-stroke-width': 1
      }
    });

    this.map.addLayer({
      "id": 'markerPoint2',
      "source": 'markerPoint',
      "type": "symbol",
      "paint": {
        "text-color": "#000",
      },
      "layout": {
        "icon-image": "rocket-15",
        "icon-size": 0.8,
        "text-field": "{title}",
        "text-offset": [0, 0.6],
        "text-anchor": "top",
        "text-font": [
          "DIN Offc Pro Medium",
          "Arial Unicode MS Bold"
        ],
        "text-size": 12
      }
    });
  }

  // movingElement(){
  //   var coordinates = data.features[0].geometry.coordinates;

  //       // start by showing just the first coordinate
  //       data.features[0].geometry.coordinates = [coordinates[0]];

  //       // add it to the map
  //       map.addSource('trace', { type: 'geojson', data: data });
  //       map.addLayer({
  //           "id": "trace",
  //           "type": "line",
  //           "source": "trace",
  //           "paint": {
  //               "line-color": "yellow",
  //               "line-opacity": 0.75,
  //               "line-width": 5
  //           }
  //       });

  //       // setup the viewport
  //       map.jumpTo({ 'center': coordinates[0], 'zoom': 14 });
  //       map.setPitch(30);

  //       // on a regular basis, add more coordinates from the saved list and update the map
  //       var i = 0;
  //       var timer = window.setInterval(function() {
  //           if (i < coordinates.length) {
  //               data.features[0].geometry.coordinates.push(coordinates[i]);
  //               map.getSource('trace').setData(data);
  //               map.panTo(coordinates[i]);
  //               i++;
  //           } else {
  //               window.clearInterval(timer);
  //           }
  //       }, 10);
  // }

}
