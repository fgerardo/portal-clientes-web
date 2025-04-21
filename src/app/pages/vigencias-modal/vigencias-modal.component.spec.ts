import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VigenciasModalComponent } from './vigencias-modal.component';

describe('VigenciasModalComponent', () => {
  let component: VigenciasModalComponent;
  let fixture: ComponentFixture<VigenciasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VigenciasModalComponent]
    });
    fixture = TestBed.createComponent(VigenciasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
