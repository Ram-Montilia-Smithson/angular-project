import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingUnitComponent } from './working-unit.component';

describe('WorkingUnitComponent', () => {
  let component: WorkingUnitComponent;
  let fixture: ComponentFixture<WorkingUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
