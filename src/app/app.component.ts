import { Component, OnInit } from '@angular/core';
import { MapMouseEvent, Map } from 'mapbox-gl';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  myMap:any;
  map: Map;
  imageLoaded = false;
  cursorStyle: string;
  center = [-90.96, -0.47];
  data = {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
      {
          'type': 'Feature',
          'geometry': {
              'type': 'Point',
              'coordinates': [-91.395263671875, -0.9145729757782163]
          }
      },
      {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-90.32958984375,-0.6344474832838974]
        }
      },
      {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-95.32958984375,-0.6344474832838974]
        }
      }
      ]
    }
  };


  centerMapTo(evt: MapMouseEvent) {
    this.center = (<any>evt).features[0].geometry.coordinates;
    this.data.data.features[2].geometry=
    {...this.data.data.features[2].geometry, ...{coordinates :[34,32]}}
    this.data = {...this.data};
  }

  ngOnInit(){
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXpyYW40dSIsImEiOiJjam9rMDhqZzMwOXMwM3dxYWF3ZTd6ZjN2In0.3nut3OCPi9M0kL3cZ1JKtQ';
    
    this.myMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9'
    });

  this.myMap.on('load', () => {
    this.myMap.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', (error, image) => {
        if (error) throw error;
        this.myMap.addImage('cat', image);
        this.myMap.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [34, 32]
                        }
                    }]
                }
            },
            "layout": {
                "icon-image": "cat",
                "icon-size": 0.25
            }
        });
    });
});

  }

  centerMap() {
    this.myMap.setCenter([34,32]);
  }
}
