import { Component, OnInit } from '@angular/core';
import { Map, LngLat, LngLatLike } from 'mapbox-gl';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

  map: Map;
  style = 'mapbox://styles/mapbox/streets-v9';
  center: LngLatLike = [35, 35];

  constructor() {
  }

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
      this.mapClickEventHandler();
    })
  }

  mapClickEventHandler() {
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      this.center = coordinates;
      console.log(this.center);
    })
  }

  flyTo(data: LngLat) {
    this.center = [data.lng, data.lat];
    this.map.flyTo({
      center: this.center
    })
  };


  centerMap() {
    console.log(`centerMap : ${this.center}`);
    this.map.flyTo({
      center: this.center
    });
  }

  changeMapStyle() {
    this.style = 'mapbox://styles/mapbox/light-v9';
    this.map.setStyle(this.style);
  }
}
