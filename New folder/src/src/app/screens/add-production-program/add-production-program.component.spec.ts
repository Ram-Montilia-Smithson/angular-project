import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductionProgramComponent } from './add-production-program.component';

describe('AddProductionProgramComponent', () => {
  let component: AddProductionProgramComponent;
  let fixture: ComponentFixture<AddProductionProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductionProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
