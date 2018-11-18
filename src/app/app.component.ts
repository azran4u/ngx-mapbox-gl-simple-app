import { Component, OnInit } from '@angular/core';
import { MapMouseEvent, Map } from 'mapbox-gl';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  pitch = 0;  

  map: Map;
  cursorStyle: string;

  center = [-90.96, -0.47];

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
