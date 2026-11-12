import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobeCanvas } from './globe-canvas';

describe('GlobeCanvas', () => {
  let component: GlobeCanvas;
  let fixture: ComponentFixture<GlobeCanvas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobeCanvas],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobeCanvas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
