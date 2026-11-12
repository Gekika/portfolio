import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import Globe from 'globe.gl';
import type { MeshPhongMaterial } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CITIES, LINKS } from './globe-data';

@Component({
  selector: 'app-globe-hero',
  templateUrl: './globe-hero.html',
  styleUrl: './globe-hero.css',
})
export class GlobeHero {
  private readonly globeEl = viewChild.required<ElementRef<HTMLDivElement>>('globe');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => this.createGlobe());
  }

  private async createGlobe(): Promise<void> {
    const el = this.globeEl().nativeElement;

    const globe = new Globe(el)
      .width(el.clientWidth)
      .height(el.clientHeight)
      .backgroundColor('rgba(0,0,0,0)')
      .atmosphereColor('#b9a3e3')
      .atmosphereAltitude(0.2)
      .pointOfView({ lat: 20, lng: -40, altitude: 2.2 });

    // A plain dark-plum sphere instead of a satellite photo of Earth
    (globe.globeMaterial() as MeshPhongMaterial).color.set('#1c1526');

    // Slow spin. Zoom off, so scrolling the page still works over the globe
    const controls = globe.controls() as OrbitControls;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;

    // The continents, drawn as dots
    const countries = await fetch('data/countries.geojson').then((res) => res.json());
    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.35)
      .hexPolygonUseDots(true)
      .hexPolygonColor(() => 'rgba(185, 163, 227, 0.6)');



        // City lights
    globe
      .pointsData(Object.values(CITIES))
      .pointColor(() => '#e4dcef')
      .pointAltitude(0.01)
      .pointRadius(0.3)
      .pointsMerge(true);

    // The connections: arcs with a moving dash, like data travelling
    const arcs = LINKS.map(([from, to]) => ({
      startLat: CITIES[from].lat,
      startLng: CITIES[from].lng,
      endLat: CITIES[to].lat,
      endLng: CITIES[to].lng,
      // Links from Nairobi glow brighter than the rest of the web
      color:
        from === 'nairobi'
          ? ['rgba(228, 220, 239, 0.15)', 'rgba(228, 220, 239, 0.95)']
          : ['rgba(185, 163, 227, 0.05)', 'rgba(185, 163, 227, 0.6)'],
      // Random timing so the arcs don't all pulse in sync
      dashTime: 2500 + Math.random() * 2500,
      dashOffset: Math.random(),
    }));

    globe
      .arcsData(arcs)
      .arcColor('color')
      .arcStroke(0.3)
      .arcAltitudeAutoScale(0.4)
      .arcDashLength(0.6)
      .arcDashGap(0.8)
      .arcDashInitialGap('dashOffset')
      .arcDashAnimateTime('dashTime');

    // Keep the canvas the same size as its box when the window resizes
    const resize = new ResizeObserver(() => globe.width(el.clientWidth).height(el.clientHeight));
    resize.observe(el);

    // Free the GPU memory when this component leaves the page
    this.destroyRef.onDestroy(() => {
      resize.disconnect();
      globe.pauseAnimation();
      globe.renderer().dispose();
    });
  }
}