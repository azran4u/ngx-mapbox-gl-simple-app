import { Component, OnInit } from '@angular/core';
import { MapMouseEvent, Map } from 'mapbox-gl';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

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
            'coordinates': [-92.32958984375,-0.6344474832838974]
        }
      }
      ]
    }
  };
  geometries = [
    {
      'type': 'Point',
      'coordinates': [
        -91.395263671875,
        -0.9145729757782163

      ]
    },
    {
      'type': 'Point',
      'coordinates': [
        -90.32958984375,
        -0.6344474832838974
      ]
    },
    {
      'type': 'Point',
      'coordinates': [
        -91.34033203125,
        0.01647949196029245
      ]
    }
  ];

  centerMapTo(evt: MapMouseEvent) {
    this.center = (<any>evt).features[0].geometry.coordinates;
  }

  ngOnInit(){

  }
}
