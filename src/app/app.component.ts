import { Component, OnInit } from '@angular/core';
import { MapMouseEvent, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw } from 'mapbox-gl';
import { GeoJson, FeatureCollection } from './map';
import { Geometry, geometry, Point } from '@turf/helpers';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  
  map: Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  imageLoaded = false;
  cursorStyle: string;
  center: LngLatLike = [34,32];
  marker: Marker;
  message = 'Hello World!';
  a = 10;
  // data
  source: any;
  markers: any;

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

  layer: Layer = {
    "id": "points",
    "type": "symbol",
    "source": {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [34, 32]
                },
                "properties": null
              },
              {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [40, 40]
                },
                "properties": null
              }
          ]
        }
    },
    "layout": {
        "icon-image": "cat",
        "icon-size": 0.1
    }
  };

  constructor(){
  }

  ngOnInit(){
    this.initializeMap();
  }
  
  private initializeMap() {
    this.buildMap();   
    this.map.flyTo({          
      center: this.center
    })
  }
   
  buildMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXpyYW40dSIsImEiOiJjam9rMDhqZzMwOXMwM3dxYWF3ZTd6ZjN2In0.3nut3OCPi9M0kL3cZ1JKtQ';    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 0,
      center: this.center
    });

    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    //// Add Marker on Click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      this.center = coordinates;
      const newMarker   = new GeoJson(coordinates, { message: this.message });
      // this.mapService.createMarker(newMarker)
    })

    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {

      /// register source
      this.map.addSource('point', this.twoPoints);
      this.map.addLayer(this.pointLayer);      
    })    
  }

  removeMarker(marker) {
    // this.mapService.removeMarker(marker.$key)
  }

  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    })
  };  

  centerMap(){            
    console.log(`centerMap : ${this.center}`);
    this.map.flyTo({          
      center: this.center
    });

    (<GeoJSONSource>(this.map.getSource('point'))).setData({
      type: 'FeatureCollection',
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [this.a++,this.a++]
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
    });
  }
}
