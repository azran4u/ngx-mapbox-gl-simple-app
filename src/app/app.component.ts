import { Component, OnInit } from '@angular/core';
import { MapMouseEvent, Map, Layer, Marker, GeoJSONSource } from 'mapbox-gl';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  
  map: Map;
  imageLoaded = false;
  cursorStyle: string;
  center = [34,32];
  marker: Marker;
  layer: any = {
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

  ngOnInit(){

    mapboxgl.accessToken = 'pk.eyJ1IjoiYXpyYW40dSIsImEiOiJjam9rMDhqZzMwOXMwM3dxYWF3ZTd6ZjN2In0.3nut3OCPi9M0kL3cZ1JKtQ';    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
      center: this.center,
      zoom: 9 // starting zoom
    });

    var radius = 20;

    function pointOnCircle(angle) {
      return {
        "type": "Point",
        "coordinates": [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius
        ]
      };  
    }

    this.map.on('load', () => {
      // Add a source and layer displaying a point which will be animated in a circle.
      // a: GeoJSONSource;      
      
    //   this.map.addSource('firebase', {
    //     type: 'geojson',
    //     data: {
    //       type: 'FeatureCollection',
    //       features: []
    //     }
    //  });

    
      // this.map.addLayer({
      //   "id": "point",
      //   "source": "point",
      //   "type": "circle",
      //   "paint": {
      //       "circle-radius": 10,
      //       "circle-color": "#007cbf"
      //   }
      // });

      this.displayCat();
      // Start the animation.
      // this.marker = new mapboxgl.Marker();

      // function animateMarker(timestamp) {
      //   var radius = 20;
    
      //   // Update the data to a new position based on the animation timestamp. The
      //   // divisor in the expression `timestamp / 1000` controls the animation speed.
      //   this.marker.setLngLat([
      //       Math.cos(timestamp / 1000) * radius,
      //       Math.sin(timestamp / 1000) * radius
      //   ]);
    
      //   // Ensure it's added to the map. This is safe to call if it's already added.
      //   this.marker.addTo(this.map);
    
      //   // Request the next frame of the animation.
      //   requestAnimationFrame(animateMarker);
      // };

      // requestAnimationFrame(animateMarker);
    });
  }

  displayCat(){
    this.map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', (error, image) => {
        if (error) throw error;
        this.map.addImage('cat', image);        
        this.map.addLayer(this.layer);
      });
  };

  moveCat(){
    this.layer.source.data.features[0].geometry.coordinates=[50,50];    
  };

  centerMap() {
    this.map.setCenter(this.center);
  };

  centerMapTo(evt: MapMouseEvent) {
    this.moveCat();
    this.center = (<any>evt).features[0].geometry.coordinates;
    this.layer.source.data.features[2].geometry=
    {...this.layer.source.data.features[2].geometry, ...{coordinates :this.center}}
    this.layer = {...this.layer};
  }

  
}
