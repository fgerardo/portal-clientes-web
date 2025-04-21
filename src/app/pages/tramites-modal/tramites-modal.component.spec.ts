import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesModalComponent } from './tramites-modal.component';

describe('TramitesModalComponent', () => {
  let component: TramitesModalComponent;
  let fixture: ComponentFixture<TramitesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TramitesModalComponent]
    });
    fixture = TestBed.createComponent(TramitesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
