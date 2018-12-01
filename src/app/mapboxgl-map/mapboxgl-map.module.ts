import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAPBOXGL_MAP_SERVICES } from './services';
import { MAPBOXGL_MAP_COMPONENTS } from './components';
import { MapboxglMapRoutingModule } from './mapboxgl-map.module.routing';


@NgModule({  
  imports: [    
    CommonModule,
    MapboxglMapRoutingModule
  ],
  declarations: [
    ...MAPBOXGL_MAP_COMPONENTS
  ],
  providers: [
    ...MAPBOXGL_MAP_SERVICES
  ],
  exports: [...MAPBOXGL_MAP_COMPONENTS]
})
export class MapboxglMapModule { }
