import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximosPagosModalComponent } from './proximos-pagos-modal.component';

describe('ProximosPagosModalComponent', () => {
  let component: ProximosPagosModalComponent;
  let fixture: ComponentFixture<ProximosPagosModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProximosPagosModalComponent]
    });
    fixture = TestBed.createComponent(ProximosPagosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
