import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeModalComponent } from './mensaje-modal.component';

describe('MensajeModalComponent', () => {
  let component: MensajeModalComponent;
  let fixture: ComponentFixture<MensajeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MensajeModalComponent]
    });
    fixture = TestBed.createComponent(MensajeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
