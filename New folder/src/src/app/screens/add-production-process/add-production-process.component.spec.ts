import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductionProcessComponent } from './add-production-process.component';

describe('AddProductionProcessComponent', () => {
  let component: AddProductionProcessComponent;
  let fixture: ComponentFixture<AddProductionProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductionProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductionProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
