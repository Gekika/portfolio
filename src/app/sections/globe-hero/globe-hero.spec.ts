import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobeHero } from './globe-hero';

describe('GlobeHero', () => {
  let component: GlobeHero;
  let fixture: ComponentFixture<GlobeHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobeHero],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobeHero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
