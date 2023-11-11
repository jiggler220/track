import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2  } from '@angular/core';
import { CommonModule } from '@angular/common';
import Globe from 'globe.gl';
import * as THREE from 'three';
import { interval } from 'rxjs';

import { GpsService } from '../../services/gps.service'


@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrl: './globe.component.scss'
})

export class GlobeComponent implements OnInit, AfterViewInit {
  @ViewChild('container') container: ElementRef;

  EARTH_RADIUS_KM = 6371 * 1000; // m
  SAT_SIZE = 100; // km
  TIME_STEP = 3 * 1000; // per frame
  gData: any = [];
  myGlobe = Globe();
  geoCoords: any = [];

  constructor(private gpsService: GpsService, private renderer: Renderer2) {}

  ngOnInit() {
  // Initial call
  this.fetchData();
  }



  setupInterval() {
  // Set up a 15-second interval
  interval(1000) // 15 seconds = 15,000 milliseconds
    .subscribe(() => {
      this.fetchData();
      requestAnimationFrame(() => this.moveSpheres());
    });
  }

  fetchData() {
    this.gpsService.getGpsSvs().subscribe((data: any) => {
      // Extract the "geoCoord" property from the response
      this.geoCoords = Object.values(data).map((item: any) => item.geoCoord);
    });
  }

  getData() {
    const N = 30;
    this.gData = this.geoCoords.map((item) => ({
      lat: item.x,
      lng: item.y,
      alt:  (this.EARTH_RADIUS_KM)/item.z,
      radius: 1,
      color: '#0000FF',
    }));
  }

  ngAfterViewInit() {
    // Define an interface for the expected structure of the 'd' object
    interface LocationData {
      lat: number;
      lng: number;
      alt: number;
    }

    this.getData();
    this.myGlobe(this.container.nativeElement)
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .pointOfView({ altitude: 3.5 })
    .customLayerData(this.gData)
    .customThreeObject(d => new THREE.Mesh(
      new THREE.SphereGeometry(d.radius),
      new THREE.MeshLambertMaterial({ color: d.color })
    ))
    .customThreeObjectUpdate((obj, d: LocationData) => {
      Object.assign(obj.position, this.myGlobe.getCoords(d.lat, d.lng, d.alt));
    });

    this.setupInterval();
  }

  moveSpheres() {
    this.getData();
    this.myGlobe.customLayerData(this.gData);
  }
}
