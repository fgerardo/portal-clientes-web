import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesModalComponent } from './imagenes-modal.component';

describe('ImagenesModalComponent', () => {
  let component: ImagenesModalComponent;
  let fixture: ComponentFixture<ImagenesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagenesModalComponent]
    });
    fixture = TestBed.createComponent(ImagenesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
