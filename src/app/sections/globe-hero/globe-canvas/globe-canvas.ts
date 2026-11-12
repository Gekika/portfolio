import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';
import Globe from 'globe.gl';
import type { MeshPhongMaterial } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CITIES, LINKS } from '../globe-data';

@Component({
  selector: 'app-globe-canvas',
  templateUrl: './globe-canvas.html',
  host: { class: 'absolute inset-0 block' },
})
export class GlobeCanvas {
  private readonly globeEl = viewChild.required<ElementRef<HTMLDivElement>>('globe');
  private readonly destroyRef = inject(DestroyRef);
  private destroyed = false;

  /** Flips to true once the globe is set up; the template fades the canvas in. */
  protected readonly ready = signal(false);

  constructor() {
    afterNextRender(() => this.createGlobe());
  }

  private async createGlobe(): Promise<void> {
    const el = this.globeEl().nativeElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nairobi = CITIES.nairobi;

    // Start downloading the continent shapes now, while we build everything else
    const countriesRequest = fetch('data/countries.json').then((res) => res.json());

    const globe = new Globe(el, { animateIn: false })
      .backgroundColor('rgba(0,0,0,0)')
      .atmosphereColor('#b9a3e3')
      .atmosphereAltitude(0.2)
      .pointOfView({ lat: 15, lng: -60, altitude: 2.4 });

    (globe.globeMaterial() as MeshPhongMaterial).color.set('#1c1526');
    (globe.controls() as OrbitControls).enableZoom = false;

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

    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      resize.disconnect();
      globe.pauseAnimation();
      globe.renderer().dispose();
    });

    // City lights and arcs need no download, so they're there from the first frame
    globe
      .pointsData(Object.values(CITIES))
      .pointColor(() => '#e4dcef')
      .pointAltitude(0.01)
      .pointRadius(0.3)
      .pointsMerge(true);

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

    // Fade the canvas in on the next frame, and fly straight to Nairobi
    requestAnimationFrame(() => this.ready.set(true));
    const flightMs = reduceMotion ? 0 : 2500;
    globe.pointOfView({ ...nairobi, altitude: 1.7 }, flightMs);

    // Ripple once we land
    setTimeout(() => {
      if (this.destroyed) return;
      globe
        .ringsData([nairobi])
        .ringColor(() => ['rgba(228, 220, 239, 0.9)', 'rgba(228, 220, 239, 0)'])
        .ringMaxRadius(5)
        .ringPropagationSpeed(2)
        .ringRepeatPeriod(1000);
    }, flightMs);

    // The dotted continents grow in as soon as their data arrives
    const countries = await countriesRequest;
    if (this.destroyed) return;
    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.35)
      .hexPolygonUseDots(true)
      .hexPolygonColor(() => 'rgba(185, 163, 227, 0.6)')
      .hexPolygonsTransitionDuration(800);
  }
}