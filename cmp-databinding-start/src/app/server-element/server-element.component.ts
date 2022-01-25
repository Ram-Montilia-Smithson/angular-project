import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck,
  Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styles: ['p {color: blue; font-weight: bold}'],
  encapsulation: ViewEncapsulation.None // will make the css declared inside this component active throughout the app,
  // but only once this component is rendered in the DOM of course
  // encapsulation: ViewEncapsulation.ShadowDom will reset to default and overwrite all css declared in this component and it's children
  //  encapsulation: ViewEncapsulation.Emulated is the default setting of ViewEncapsulation (=== not defining it at all)
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  
  // the values passed to this element through the parent component can now be usable by adding the @Input() decorator
  // by adding a string name inside the braces, I can refer to that value that was passed and calling it by a different name that would be usable in this component's template
  @Input('serverElementName2') serverElementName3: string

  // life cycle methods:
  // ngOnInit is a lifecycle hook that runs when the component is being initiated, not necessarily when it is appearing in the DOM, runs after the constructor
  // ngOnChanges runs when component is created (before ngOnInit) and also every time of the bound input (properties decorated with @Input()) properties change
  // ngDoCheck will run every time changeDetection runs (every time angular will check for changes)
  // ngAfterContentInit runs when the parent component's ng-content has been projected into the view
  // ngAfterContentChecked runs every time the projected content has been checked
  // ngAfterViewInit runs after the component's view and it's children's has been initialized
  // ngAfterViewChecked runs every time the component's view and it children's have been checked
  // ngOnDestroy runs once, just before the component is destroyed

  constructor() {
    console.log("constructor");
  }

  // the only life cycle hook that receives arguments
  // the changes are the elements that were changed and it gives access to their currentValue, previousValue and weather it is their firstChange or not
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
    console.log(changes);
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  ngDoCheck(): void {
    console.log("ngDoCheck");
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit"); // only once in this example
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked"); // twice in this example
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit"); // only once in this example
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked"); // twice in this example
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }
}
