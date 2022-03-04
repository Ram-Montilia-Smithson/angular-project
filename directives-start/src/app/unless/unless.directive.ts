import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  // building a costume structural directive
  // making sure that the variable and the selector have the same name
  // using the @Input, but now assigning a function with the set key word
  // assigning the type of the expected value to a boolean, just like ngIf
  // go over this again, what is TemplateRef? and ViewContainerRef?
  @Input() set appUnless(condition: boolean) {
    if (condition) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }

}
