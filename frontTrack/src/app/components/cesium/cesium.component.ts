import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Cesium from 'cesium';
import 'cesium/Widgets/widgets.css';

@Component({
  selector: 'app-cesium',
  templateUrl: './cesium.component.html',
  styleUrls: ['./cesium.component.scss']
})
export class CesiumComponent implements OnInit {
  
  ngOnInit() {
    // Initialize Cesium
    const viewer = new Cesium.Viewer('cesiumContainer');

    // Add a basic map layer (for example, OpenStreetMap)
    //viewer.imageryLayers.add(Cesium.createOpenStreetMapImageryProvider());
  }
    // const wyoming = viewer.entities.add({
    //   polygon: {
    //     hierarchy: Cesium.Cartesian3.fromDegreesArray([
    //       -109.080842, 45.002073, -105.91517, 45.002073, -104.058488, 44.996596,
    //       -104.053011, 43.002989, -104.053011, 41.003906, -105.728954, 40.998429,
    //       -107.919731, 41.003906, -109.04798, 40.998429, -111.047063, 40.998429,
    //       -111.047063, 42.000709, -111.047063, 44.476286, -111.05254, 45.002073,
    //     ]),
    //     height: 1000000,
    //     material: Cesium.Color.RED.withAlpha(0.5),
    //     outline: true,
    //     outlineColor: Cesium.Color.BLACK,
    //   },
    // });
    
    // viewer.zoomTo(wyoming);
}