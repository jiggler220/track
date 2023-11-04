import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CesiumComponentComponent } from './cesium-component.component';

describe('CesiumComponentComponent', () => {
  let component: CesiumComponentComponent;
  let fixture: ComponentFixture<CesiumComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CesiumComponentComponent]
    });
    fixture = TestBed.createComponent(CesiumComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
