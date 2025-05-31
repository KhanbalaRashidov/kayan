import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IscilerComponent } from './isciler.component';

describe('IscilerComponent', () => {
  let component: IscilerComponent;
  let fixture: ComponentFixture<IscilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IscilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IscilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
