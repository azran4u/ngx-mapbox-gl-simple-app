import { Component, OnInit } from '@angular/core';
import { GeoJSONSourceRaw, Map, GeoJSONSource, LngLatLike, GeoJSONGeometry } from 'mapbox-gl';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {

  map: Map;
  style = 'mapbox://styles/mapbox/streets-v9';
  center: LngLatLike = [0, 0];

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
      zoom: 2,
      center: this.center,
      renderWorldCopies: false
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (event) => {      
      this.backgroungFading();
    })
  }


  backgroungFading() {

    let feature: GeoJSON.Feature = {
      type: 'Feature',
      geometry: this.pointOnCircle(0),
      properties: null
    }

    let featureCollection: GeoJSON.FeatureCollection<GeoJSONGeometry> = {
      type: "FeatureCollection",
      features: [feature]
    }

    let source: GeoJSONSourceRaw = {
      "type": "geojson",
      "data": featureCollection
    }

    this.map.addSource('point', source);

    this.map.addLayer({
      "id": "point",
      "source": "point",
      "type": "circle",
      "paint": {
        "circle-radius": 10,
        "circle-color": "#007cbf"
      }
    });

    // Start the animation.
    this.animateMarker(0);

  }

  pointOnCircle(angle): GeoJSON.Point {
    var radius = 20;
    return {
      'type': 'Point',
      "coordinates": [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
      ]
    };
  }

  animateMarker = (timestamp) => {

    (<GeoJSONSource>this.map.getSource('point')).setData(
      {
        type: 'Feature',
        geometry: this.pointOnCircle(timestamp / 1000),
        properties: null
      }
    );
    requestAnimationFrame(this.animateMarker);
  }

}
