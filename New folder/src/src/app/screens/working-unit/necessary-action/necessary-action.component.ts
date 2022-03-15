import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-necessary-action',
  templateUrl: './necessary-action.component.html',
  styleUrls: ['./necessary-action.component.scss'],
})
export class NecessaryActionComponent implements OnInit {
  @Input() allNecessaryActionFaeturesToDisplay;
  public content;
  getAlaisByParameter(nameOfObject:string){
   // return this.allNecessaryActionFeildsToDisplay.find(x=>x.name==nameOfObject).alias
   }
  ngOnInit() {
   this.content = [
    {
     // headline:this.getAlaisByParameter('ReqDensity'),
     headline:"רמת צפיפות רצויה לאחר דילול",
      text: 'מספר עצים לדונם',
      footer: this.allNecessaryActionFaeturesToDisplay[0].reqDensity,
    },
    {
      //headline:this.getAlaisByParameter('ReqCover'),
      headline:"רמת כיסוי צמרות רצויה(%)",
      text: 'בשכבה/ שכבות המטופלות ללא מינים פולשים',
      footer:this.allNecessaryActionFaeturesToDisplay[0].reqCover,
    },
    {
      headline:"עוצמת דילול",
    //  headline:this.getAlaisByParameter('ThinIntensity'),
      footer: this.allNecessaryActionFaeturesToDisplay[0].thinIntensity,
    },
    {
      //headline:this.getAlaisByParameter('ThinType'), 
      headline:"אופי דילול",
      footer: this.allNecessaryActionFaeturesToDisplay[0].thinType,
    },
    {
     // headline: this.getAlaisByParameter('PruningType'),
     headline:"אופי גיזום",
      footer: this.allNecessaryActionFaeturesToDisplay[0].pruningType!=null?this.allNecessaryActionFaeturesToDisplay[0].pruningType.replaceAll('_' ," "):this.allNecessaryActionFaeturesToDisplay[0].pruningType,
    },
    {
      //headline:this.getAlaisByParameter('BurnPermission'),
      headline:"האם תנאי השטח מצריכים בקשה לשריפת גזם",
      footer: this.allNecessaryActionFaeturesToDisplay[0].burnPermission,
    },
    {
     // headline:this.getAlaisByParameter('WPFSRequestStatus') ,
     headline:"סטטוס הבקשה",
      footer:  this.allNecessaryActionFaeturesToDisplay[0].wpfsRequestStatus,
    },
    {
      //headline: this.getAlaisByParameter('WPFSWorkEssence'),
      headline:"מהות העבודה",
      text: 'אגף הייעור מספק תשתית מקצועית זו. שינה חיונית והכרחית לצורך עבודה מקצועית מתקדמת יעליה ומתואמת במרחבים ובאזורים שניהל קק"ל. בלעדיה, לא ניתן לנהל את משאבי הטבע עליה מופקדת קק"ל בישראל',
      footer:this.allNecessaryActionFaeturesToDisplay[0].wpfsWorkEssence
    },
  ];
}
  constructor() {}


}
