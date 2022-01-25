import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styles: ['p {color: blue; background-color: white; font-weight: bold} label {color: white;} div {background-color: black}'],
  encapsulation: ViewEncapsulation.None // will make the css declared inside this component active throughout the app,
  // but only once this component is rendered in the DOM of course
  // encapsulation: ViewEncapsulation.ShadowDom will reset to defalut and overwrite all css declared in this component and it's children
  //  encapsulation: ViewEncapsulation.Emulated is the default setting of ViewEncapsulation (=== not defining it at all)
})
export class ServerElementComponent implements OnInit {
  // the values passed to this element through the parent component can now be usable by adding the @Input() decorator
  // by adding a string name inside the braces, I can refer to that value that was passed and calling it by a different name that would be usable in this component's template
  @Input('elementName2') elementName3: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
  }

}
