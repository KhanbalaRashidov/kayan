import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatislarComponent } from './satislar.component';

describe('SatislarComponent', () => {
  let component: SatislarComponent;
  let fixture: ComponentFixture<SatislarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatislarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatislarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
