import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-purpose',
  templateUrl: './area-purpose.component.html',
  styleUrls: ['./area-purpose.component.scss']
})
export class AreaPurposeComponent implements OnInit {
@Input() allAreaPurpuseFeaturesToDisplay;
@Input() allAreaPurpuseFeildsToDisplay;

public content;
getAlaisByParameter(nameOfObject:string){
 return this.allAreaPurpuseFeildsToDisplay.find(x=>x.name==nameOfObject).alias
}
ngOnInit() {
  this.content=[ 
    { 
  // headline:this.getAlaisByParameter('AreaDesignation'),
  headline:"ייעוד השטח",
   footer:this.allAreaPurpuseFeaturesToDisplay[0].areaDesignation!=null?this.allAreaPurpuseFeaturesToDisplay[0].areaDesignation.replaceAll('_', " "):this.allAreaPurpuseFeaturesToDisplay[0].areaDesignation,
  },
  { 
    //headline:this.getAlaisByParameter('ReqForestType'),
    headline:"תצורת צומח רצויה",
    footer:this.allAreaPurpuseFeaturesToDisplay[0].reqForestType
},
{ 
 // headline:this.getAlaisByParameter('VegDesignPrinc'),
 headline:"עקרונות עיצוב צומח",
  footer:this.allAreaPurpuseFeaturesToDisplay[0].vegDesignPrinc!=null?this.allAreaPurpuseFeaturesToDisplay[0].vegDesignPrinc.replaceAll('_', " "):this.allAreaPurpuseFeaturesToDisplay[0].vegDesignPrinc,
}, { 
  //headline:this.getAlaisByParameter('ThinningPurpose'),
  headline:"מטרת דילול ראשית",
  text:'בהתאם לאיור 4 בחוברת דילולים',
  footer:this.allAreaPurpuseFeaturesToDisplay[0].thinningPurpose!=null?this.allAreaPurpuseFeaturesToDisplay[0].thinningPurpose.replaceAll('_', " "):this.allAreaPurpuseFeaturesToDisplay[0].thinningPurpose,
},
{ 
  //headline:this.getAlaisByParameter('OtherThinningPurpose'),
  headline:"מטרת דילול משנית",
  text:'במידה וקיימת מטרה נוספת',
  footer:this.allAreaPurpuseFeaturesToDisplay[0].otherThinningPurpose!=null?this.allAreaPurpuseFeaturesToDisplay[0].otherThinningPurpose.replaceAll('_', " "):this.allAreaPurpuseFeaturesToDisplay[0].otherThinningPurpose,
},
{ 
 // headline:this.getAlaisByParameter('ThinFreq'),
 headline:"תדירות דילול מתכוננת בעתיד",
  text:'בהתאם לטבלה 3 בחוברת דילולים והערכה של מנהל שטח',
  footer:this.allAreaPurpuseFeaturesToDisplay[0].thinFreq!=null?this.allAreaPurpuseFeaturesToDisplay[0].thinFreq.replaceAll('_', " "):this.allAreaPurpuseFeaturesToDisplay[0].thinFreq,
},
{ 
  // headline:this.getAlaisByParameter('TRTPriority'),
  headline:"סדר עדיפות לביצוע",
  text:'בהתאם לטבלה 5 בחוברת דילולים',
  footer:this.allAreaPurpuseFeaturesToDisplay[0].trtPriority
}
]
  }

  constructor() { }


}