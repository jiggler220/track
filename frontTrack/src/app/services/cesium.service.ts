import { Injectable } from '@angular/core';
declare let Cesium: any;
// import * as Cesium from '../assets/js/Cesium.js';
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YzFkMWEwOS0yMTU2LTQzZTYtODg3OS0xYWVjNzVmOWIyZGMiLCJpZCI6MTc2MDE4LCJpYXQiOjE2OTkxMTgzMzh9.8kcOW-mg8ofW0EWMaNed2ctZANsDZbMcq1opYYQHPcs";
@Injectable({
  providedIn: 'root'
})
export class CesiumService {
constructor() { }
  private viewer: any;
plotPoints(div:string){
    this.viewer = new Cesium.Viewer(div);
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
      point: {
        color: Cesium.Color.RED,
        pixelSize: 16,
      },
    });
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-80.5, 35.14),
      point: {
        color: Cesium.Color.BLUE,
        pixelSize: 16,
      },
    });
    this.viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-80.12, 25.46),
      point: {
        color: Cesium.Color.YELLOW,
        pixelSize: 16,
      },
    });
  }
}