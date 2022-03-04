import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { Event } from '@angular/router';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective {
  
  // using the @Input, the defaultColor, defaultBackgroundColor and highlightColor attributes
  // can be assigned to the elementRef through property binding.
  // the black and grey will show only in the beginning,
  // after that, the values binned to these attributes will overwrite them
  @Input() defaultBackgroundColor: string = 'black'
  @Input() defaultColor: string = 'grey'
  @Input('appBetterHighlight') highlightColor: string = 'purple'

  // using @HostBinding, it is possible to specify which attributes of the ElementRef these new variables will be assigning to
  // and assigning values to the new variables 
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultBackgroundColor
  @HostBinding('style.color') color: string = this.defaultColor;
  @HostBinding('style.padding') padding: string = '10px';
  @HostBinding('style.borderRadius') borderRadius: string = '10px';
  
  // getting access to the element and it's properties that this attribute directive would be added to via ElementRef
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  
  // the @HostListener decorator gives access to the various events of the elementRef
  // and binds a function to the event selected between the parenthesis
  // renderer2 gives access to setStyle function,
  // which is a better way to change a component's style than directly through the component's nativeElement.style.style attributes
  // (like in the basic-highlight.directive)
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.highlightColor);
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'pink');
    this.renderer.setStyle(this.elementRef.nativeElement, 'padding', '10px');
    this.renderer.setStyle(this.elementRef.nativeElement, 'border-radius', '10px');
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.defaultBackgroundColor);
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', this.defaultColor);
    this.renderer.setStyle(this.elementRef.nativeElement, 'padding', '10px');
    this.renderer.setStyle(this.elementRef.nativeElement, 'border-radius', '10px');
  }
}
