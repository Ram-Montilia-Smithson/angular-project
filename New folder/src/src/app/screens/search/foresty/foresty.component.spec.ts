import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestyComponent } from './foresty.component';

describe('ForestyComponent', () => {
  let component: ForestyComponent;
  let fixture: ComponentFixture<ForestyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForestyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
