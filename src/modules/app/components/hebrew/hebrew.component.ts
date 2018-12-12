import { Component, OnInit } from '@angular/core';
import { GeoJSONSourceRaw, Map, GeoJSONSource, LngLatLike, GeoJSONGeometry } from 'mapbox-gl';

@Component({
  selector: 'app-hebrew',
  templateUrl: './hebrew.component.html',
  styleUrls: ['./hebrew.component.css']
})
export class HebrewComponent implements OnInit {

  map: Map;
  style = 'mapbox://styles/mapbox/streets-v9';
  center: LngLatLike = [35, 35];

  constructor() { }

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() { 
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXpyYW40dSIsImEiOiJjam9rMDhqZzMwOXMwM3dxYWF3ZTd6ZjN2In0.3nut3OCPi9M0kL3cZ1JKtQ';
    mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js', (err) => { console.log(err) });    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 6,
      center: this.center,
      renderWorldCopies: false
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (event) => {      
      this.showTextNative();
    })
  }

  showTextNative() {

    let geojsonSource: GeoJSONSourceRaw = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    }

    this.map.addSource('bycicles-source', geojsonSource);

    this.map.loadImage('../../../../assets/fighter-jet.png', (err, image) => {
      if (err) throw err;
      this.map.addImage('bycicle', image);
    })
    this.map.addLayer({
      id: 'bycicles',
      type: 'symbol',
      source: 'bycicles-source',
      layout: {
        "text-field": "{title}",
        "text-font": ["Arial Unicode MS Bold"],
        "text-offset": [0, -3],
        "text-anchor": "top",
        "icon-image": 'bycicle',
        "icon-allow-overlap": true,
        "text-allow-overlap": true,
        "icon-size": 1
      },
      paint: {
        "text-color": '#000'
      }
    });

    let data = {
      type: 'FeatureCollection',
      features: []
    };

    let source = (this.map.getSource('bycicles-source') as GeoJSONSourceRaw);

    let i: number;
    let j: number;
    let N: number = 4;
    for (i = 1; i <= N; i++) {
      for (j = 1; j <= N; j++) {
        let feature: GeoJSON.Feature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [35 + i, 35 + j]
          },
          properties: {
            title: 'אבגד' + i + j
          }
        }
        data.features.push(feature as GeoJSON.Feature);
      }
    }

    (<GeoJSONSource>this.map.getSource('bycicles-source')).setData(data as GeoJSON.FeatureCollection<GeoJSONGeometry>);

  }
}
