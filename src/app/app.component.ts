import { Component, OnInit } from '@angular/core';
import { MapMouseEvent, GeoJSONGeometry, Map, Layer, Marker, GeoJSONSource, LngLatLike, LngLat, GeoJSONSourceRaw, Point } from 'mapbox-gl';
import {} from './map';
// import rtlText from '@mapbox/mapbox-gl-rtl-text';


@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  
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
    mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js', (err) => {console.log(err)});
    // mapboxgl.setRTLTextPlugin('../plugin/mapbox-gl-rtl-text.js', (err) => {console.log(err)});
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
      this.centerMap();              
      // this.pointsInit();
      // this.showByciclesWithHebrewText();      
      // this.addSymbolLayer();
      this.showTextNative();
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
    let N: number = 2;
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

  showTextHtml(){

    let symbolSource: GeoJSONSourceRaw = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    }

    this.map.addSource('bycicles-source', symbolSource);

    this.map.loadImage('./assets/bycicle.png', (err, image) => {
      if (err) throw err;
      this.map.addImage('bycicle', image);
    })
      this.map.addLayer({
        id: 'bycicles',
        type: 'symbol',
        source: 'bycicles-source',
        maxzoom: 24,
        minzoom: 0,
        layout: {
          "icon-image": 'bycicle',
          "icon-allow-overlap": true,
          "icon-size": 0.1
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
      let N: number = 2;
      for(i = 1; i<=N; i++) {
        for(j = 1; j<=N; j++) {
          let feature: GeoJSON.Feature = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [35+i,35+j]
            },
            properties: {
             name: "אבגד"+i+j            
            }
          }

          data.features.push(feature as GeoJSON.Feature);                    
        }      
      }

    data.features.forEach((marker) => {
      var el = document.createElement('div');      
      el.innerHTML = `
        <h2         
          style="
            padding: 2px;                    
          ";>
          ${marker.properties.name}
        </h2>    
      `
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);
    });
  
    (<GeoJSONSource>this.map.getSource('bycicles-source')).setData(data as GeoJSON.FeatureCollection<GeoJSONGeometry>);
  
    // this.map.setPaintProperty('point', 'circle-color', [
    //   "interpolate",
    //   ["exponential", 1],
    //   ["zoom"],
    //   0,
    //   "#ff0000",
    //   13,
    //   "#088"
    // ]);  
  }

  showTextNative(){

    let geojsonSource: GeoJSONSourceRaw = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    }

    this.map.addSource('bycicles-source', geojsonSource);

    this.map.loadImage('./assets/bycicle.png', (err, image) => {
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
          "text-offset": [0, -1],
          "text-anchor": "top",
          "icon-image": 'bycicle',
          "icon-allow-overlap": true,
          "icon-size": 0.1
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

      // var rtlText = require('mapbox-gl-rtl-text');
      // var arabicString = "שלום";
      // var shapedArabicText = rtlText.applyArabicShaping(arabicString);
      // var readyForDisplay = rtlText.processBidirectionalText(shapedArabicText, []);
      
      let i: number;
      let j: number;
      let N: number = 2;
      for(i = 1; i<=N; i++) {
        for(j = 1; j<=N; j++) {
          let feature: GeoJSON.Feature = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [35+i,35+j]
            },
            properties: {
             title: 'אבגד'
            }
          }
          data.features.push(feature as GeoJSON.Feature);                    
        }      
      }    
  
    (<GeoJSONSource>this.map.getSource('bycicles-source')).setData(data as GeoJSON.FeatureCollection<GeoJSONGeometry>);
  
  }


  addSymbolLayer() {

    let dataFeatureCollection: GeoJSON.FeatureCollection<GeoJSONGeometry> = {
      type: 'FeatureCollection',
      features: []
    };    

    let geojsonSource: GeoJSONSourceRaw = {
      type: 'geojson',
      data: dataFeatureCollection
    }

    this.map.addSource('text-source', geojsonSource);

    this.map.loadImage('./assets/bycicle.png', (err, image) => {
      if (err) throw err;
      this.map.addImage('bycicle', image);
    })

    this.map.addLayer({
      id: 'text',
      type: 'symbol',
      source: geojsonSource,
      layout: {
        "icon-image": 'bycicle',
        "icon-allow-overlap": true,
        "icon-size": 0.05
      },
      paint: {
        'text-opacity': 0,
        "text-color": '#000'
      }
    });

    let i: number;
    let j: number;
    let N: number = 10;
    for (i = 1; i <= N; i++) {
      for (j = 1; j <= N; j++) {
        let feature: GeoJSON.Feature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [35 + i, 35 + j]
          },
          properties: {
            name: "abcd" + i + j
          }
        }
        dataFeatureCollection.features.push(feature as GeoJSON.Feature);
      }
    }
    (<GeoJSONSource>this.map.getSource('text-source')).setData(geojsonSource.data);
  }
}
