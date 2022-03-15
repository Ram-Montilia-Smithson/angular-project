import { Component, OnInit } from '@angular/core';
import { AllSearchUnitsForWorkDilution } from 'src/app/Models/AllSearchUnitsForWorkDilution';
import { GridScreenService } from 'src/app/services/grid-screen.service';
@Component({
  selector: 'app-working-unit',
  templateUrl: './working-unit.component.html',
  styleUrls: ['./working-unit.component.scss'],
})
export class WorkingUnitComponent implements OnInit {
  allObjectAfterSearchWorkUnits: AllSearchUnitsForWorkDilution;
  constructor(private gridScreenService: GridScreenService) {}
  public activeStep = 0;
  workUnit:any[]=[];
  public steps = [
    {
      svgSrc: 'assets/images/forest.svg',
      text: 'תיאור היער ומצבו',
    },
    {
      svgSrc: 'assets/images/trees.svg',
      text: 'ייעוד השטח ומטרת הדילול',
    },
    {
      svgSrc: 'assets/images/gardening-tools.svg',
      text: 'הפעולה הנדרשת',
    },
  ];
  changeActiveStep(newActiveStep) {
    this.activeStep = +newActiveStep;
  }
  ngOnInit() {
     
    this.workUnit.push(this.gridScreenService.objectForWorkUnitAfterSearch.globalID)
    try {
      return this.gridScreenService
        .GetAllObjectForWorkUnitsAfterSearch(
          this.gridScreenService.objectForWorkUnitAfterSearch
        )
        .subscribe((res) => {
           
          this.allObjectAfterSearchWorkUnits = res;

        });
    } catch (e) {
      console.log(e);
    }
    return undefined
  }
}
