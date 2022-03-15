import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-forest-description',
  templateUrl: './forest-description.component.html',
  styleUrls: ['./forest-description.component.scss']
})
export class ForestDescriptionComponent implements OnInit {
  @Input() allForestDescriptionFeildsToDisplay;
  @Input() allForestDescriptionFaeturesToDisplay;
  public content;
  getAlaisByParameter(nameOfObject:string){
    return this.allForestDescriptionFeildsToDisplay.find(x=>x.name==nameOfObject).alias
   }
  ngOnInit()
  {
    
   this.content=[{
    //headline:this.getAlaisByParameter('AgeGr'),
    headline:"גיל היער המחטני",
    text:'קבוצת גיל של שכבת היער הראשית',
    footer:this.allForestDescriptionFaeturesToDisplay[0].ageGr
  },
  {
    //headline:this.getAlaisByParameter('ForAgeComposition')
    headline:"מספר שכבות היער",
  footer:this.allForestDescriptionFaeturesToDisplay[0].forAgeComposition
},{
  //headline:this.getAlaisByParameter('CurForestType'),.
  headline:"תצורת צומח קיימת",
  footer:this.allForestDescriptionFaeturesToDisplay[0].curForestType
},{
  //headline:this.getAlaisByParameter('CurDensity'),
  headline:"רמת צפיפות קיימת",
  text:'מספר עצים לדונם',
  footer:this.allForestDescriptionFaeturesToDisplay[0].curDensity
},{
 // headline:this.getAlaisByParameter('CurCover'),
 headline:"רמת כיסוי צמרות קיימת(%)",
  text:'בשכבה/שכבות המטופלות ללא מינים פולשים',
  footer:this.allForestDescriptionFaeturesToDisplay[0].curCover
},{
  //headline:this.getAlaisByParameter('forStatusMain'),
  headline:"מצב היער",
  text:'מהתרשמות אישית',
  footer:this.allForestDescriptionFaeturesToDisplay[0].forStatusMain!=null?this.allForestDescriptionFaeturesToDisplay[0].forStatusMain.replaceAll('_' ," "):this.allForestDescriptionFaeturesToDisplay[0].forStatusMain,
}]
  }
  constructor() { }


}
