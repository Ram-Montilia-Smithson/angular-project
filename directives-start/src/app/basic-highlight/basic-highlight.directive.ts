import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})

export class BasicHighlightDirective {
    // getting access to the element that this attribute directive would be added to via the ElementRef and changing it's style directly
    constructor(private elementRef: ElementRef) {
        this.elementRef.nativeElement.style.backgroundColor = 'darkgreen'
        this.elementRef.nativeElement.style.color = 'lightgreen'
        this.elementRef.nativeElement.style.padding = '10px'
        this.elementRef.nativeElement.style.borderRadius = '10px'
    }
}