import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import Globe from 'globe.gl';
import type { MeshPhongMaterial } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CITIES, LINKS } from './globe-data';

/** Pause for `ms` milliseconds inside an async function. */
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

@Component({
  selector: 'app-globe-hero',
  templateUrl: './globe-hero.html',
  styleUrl: './globe-hero.css',
})
export class GlobeHero {
  private readonly globeEl = viewChild.required<ElementRef<HTMLDivElement>>('globe');
  private readonly destroyRef = inject(DestroyRef);
  private destroyed = false;

  /** NEW: becomes true once the camera lands on Nairobi; the template fades the intro in. */
  protected readonly arrived = signal(false);

  constructor() {
    afterNextRender(() => this.createGlobe());
  }

  private async createGlobe(): Promise<void> {
    const el = this.globeEl().nativeElement;
    // NEW: respect people who've asked their system for less motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const globe = new Globe(el)
      .backgroundColor('rgba(0,0,0,0)')
      .atmosphereColor('#b9a3e3')
      .atmosphereAltitude(0.2)
      .pointOfView({ lat: 20, lng: -40, altitude: 2.2 });

    (globe.globeMaterial() as MeshPhongMaterial).color.set('#1c1526');

    const controls = globe.controls() as OrbitControls;
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 0.6;
    controls.enableZoom = false;

    // NEW: on wide screens, shift the globe right to leave room for the text
    const layout = () => {
      const w = el.clientWidth;
      globe
        .width(w)
        .height(el.clientHeight)
        .globeOffset([w >= 768 ? w * 0.18 : 0, 0]);
    };
    layout();
    const resize = new ResizeObserver(layout);
    resize.observe(el);

    // Cleanup is registered early, so it's in place even if we leave mid-animation
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      resize.disconnect();
      globe.pauseAnimation();
      globe.renderer().dispose();
    });

    // Continents as dots
    const countries = await fetch('data/countries.geojson').then((res) => res.json());
    if (this.destroyed) return;
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

    // The connections
    const arcs = LINKS.map(([from, to]) => ({
      startLat: CITIES[from].lat,
      startLng: CITIES[from].lng,
      endLat: CITIES[to].lat,
      endLng: CITIES[to].lng,
      color:
        from === 'nairobi'
          ? ['rgba(228, 220, 239, 0.15)', 'rgba(228, 220, 239, 0.95)']
          : ['rgba(185, 163, 227, 0.05)', 'rgba(185, 163, 227, 0.6)'],
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

    // NEW: the story. Spin, then fly to Nairobi, ripple, say hello
    const nairobi = CITIES.nairobi;
    if (reduceMotion) {
      globe.pointOfView({ ...nairobi, altitude: 1.7 });
    } else {
      await wait(3500);
      if (this.destroyed) return;
      controls.autoRotate = false;
      globe.pointOfView({ ...nairobi, altitude: 1.7 }, 3000);
      await wait(3000);
      if (this.destroyed) return;
    }

    globe
      .ringsData([nairobi])
      .ringColor(() => ['rgba(228, 220, 239, 0.9)', 'rgba(228, 220, 239, 0)'])
      .ringMaxRadius(5)
      .ringPropagationSpeed(2)
      .ringRepeatPeriod(1000);

    this.arrived.set(true);
  }
}