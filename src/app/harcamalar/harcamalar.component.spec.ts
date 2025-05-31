import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarcamalarComponent } from './harcamalar.component';

describe('HarcamalarComponent', () => {
  let component: HarcamalarComponent;
  let fixture: ComponentFixture<HarcamalarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarcamalarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarcamalarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
