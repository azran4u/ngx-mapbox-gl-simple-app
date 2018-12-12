import { Component, OnInit } from '@angular/core';
import { GeoJSONGeometry, Map, GeoJSONSource, LngLatLike, GeoJSONSourceRaw } from 'mapbox-gl';
import { getRandomFloat } from '../../../../utils/random';
import { Planes } from '../../../../data/Planes';
import { PlanesTwo } from '../../../../data/PlanesTwo';
import { Lines } from '../../../../data/Lines';
import { LinesTwo } from '../../../../data/Lines2';
import { Poligons } from '../../../../data/Poligons';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

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
      this.planesRotation();      
    })
  }

  planesRotation() {

    // ***** Planes ************
    let planesData = Planes.data;
    let planesSource: GeoJSONSourceRaw = Planes.source;
    this.map.addSource('planes-source', planesSource);
    this.map.loadImage('./assets/fighter-jet.png', (err, image) => {
      if (err) throw err;
      this.map.addImage('plane', image);
    });
    this.map.addLayer(Planes.layer);

    let planes2Data = PlanesTwo.data;
    let planes2Source: GeoJSONSourceRaw = PlanesTwo.source;
    this.map.addSource('planes2-source', planes2Source);
    this.map.loadImage('./assets/rocket-15-240.png', (err, image) => {
      if (err) throw err;
      this.map.addImage('plane2', image);
    });
    this.map.addLayer(PlanesTwo.layer);

    // ******** Lines *******************
    let linesSource: GeoJSONSourceRaw = Lines.source;
    this.map.addSource('lines-source', linesSource);
    this.map.addLayer(Lines.layer);
    let linesData = Lines.data;

    let lines2Source: GeoJSONSourceRaw = LinesTwo.source;
    this.map.addSource('lines2-source', lines2Source);
    this.map.addLayer(LinesTwo.layer);
    let lines2Data = LinesTwo.data;

    // ******** Poligons *******************
    let poligonsSource: GeoJSONSourceRaw = Poligons.source;
    this.map.addSource('poligons-source', poligonsSource);
    this.map.addLayer(Poligons.layer);
    let poligonsData = Poligons.data;

    this.renderMap();

  }

  renderMap() {
    let [planesData, planes2Data, linesData, lines2Data, poligonsData] = this.generateNewPositions();

    this.layerRender('planes-source', planesData as GeoJSON.FeatureCollection<GeoJSONGeometry>);
    this.layerRender('planes2-source', planes2Data as GeoJSON.FeatureCollection<GeoJSONGeometry>);
    this.layerRender('lines-source', linesData as GeoJSON.FeatureCollection<GeoJSONGeometry>);
    this.layerRender('lines2-source', lines2Data as GeoJSON.FeatureCollection<GeoJSONGeometry>);
    this.layerRender('poligons-source', poligonsData as GeoJSON.FeatureCollection<GeoJSONGeometry>);
  }

  planesRandomByTime() {
    var self = this;
    var timer = window.setInterval(function () {
      self.renderMap();
    }, 2000);
  }

  generateNewPositions(): GeoJSON.FeatureCollection<GeoJSONGeometry>[] {
    const minLat = -90;
    const maxLat = 90;
    const minLng = -180;
    const maxLng = 180;
    let i: number;
    let N: number = 5000;


    let planesData = {
      type: 'FeatureCollection',
      features: []
    };
    let planes2Data = {
      type: 'FeatureCollection',
      features: []
    };
    let poligonsData = {
      type: 'FeatureCollection',
      features: []
    };

    let linesData = {
      type: 'FeatureCollection',
      features: []
    };

    let lines2Data = {
      type: 'FeatureCollection',
      features: []
    };

    for (i = 1; i <= N; i++) {
      let [lng, lat] = [getRandomFloat(minLng, maxLng), getRandomFloat(minLat, maxLat)];

      let plane = Planes.generateFeature([lng, lat]);
      planesData.features.push(plane as GeoJSON.Feature);

      let line = Lines.generateFeature([lng, lat]);
      linesData.features.push(line as GeoJSON.Feature);

      let line2 = LinesTwo.generateFeature([lng, lat]);
      lines2Data.features.push(line2 as GeoJSON.Feature);

      let poligon = Poligons.generateFeature([lng, lat]);
      poligonsData.features.push(poligon as GeoJSON.Feature);

      [lng, lat] = [getRandomFloat(minLng, maxLng), getRandomFloat(minLat, maxLat)];

      let plane2 = PlanesTwo.generateFeature([lng, lat]);
      planes2Data.features.push(plane2 as GeoJSON.Feature);

      let line22 = Lines.generateFeature([lng, lat]);
      linesData.features.push(line22 as GeoJSON.Feature);

      let line222 = LinesTwo.generateFeature([lng, lat]);
      lines2Data.features.push(line222 as GeoJSON.Feature);

      let poligon22 = Poligons.generateFeature([lng, lat]);
      poligonsData.features.push(poligon22 as GeoJSON.Feature);
    }

    return [
      planesData as GeoJSON.FeatureCollection<GeoJSONGeometry>,
      planes2Data as GeoJSON.FeatureCollection<GeoJSONGeometry>,
      linesData as GeoJSON.FeatureCollection<GeoJSONGeometry>,
      lines2Data as GeoJSON.FeatureCollection<GeoJSONGeometry>,
      poligonsData as GeoJSON.FeatureCollection<GeoJSONGeometry>
    ];
  }

  layerRender(layer: string, data: GeoJSON.FeatureCollection<GeoJSONGeometry>) {
    (<GeoJSONSource>this.map.getSource(layer)).setData(data as GeoJSON.FeatureCollection<GeoJSONGeometry>);
  }
}
