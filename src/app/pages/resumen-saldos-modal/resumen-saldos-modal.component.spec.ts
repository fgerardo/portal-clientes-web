import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenSaldosModalComponent } from './resumen-saldos-modal.component';

describe('ResumenSaldosModalComponent', () => {
  let component: ResumenSaldosModalComponent;
  let fixture: ComponentFixture<ResumenSaldosModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenSaldosModalComponent]
    });
    fixture = TestBed.createComponent(ResumenSaldosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
