import { Component, EventEmitter, OnInit, Output, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html"
})
export class CockpitComponent implements OnInit {
  // to pass data upwards with costume event binding, I declare eventEmitters (with some types, of course)
  // that would emit on function call (using regular event binding), and I add the @Output() decorator to have the events usable by the parent component's template.
  // exactly like @Input decorator, I can assign a new name to that event passing here and calling it by a that name which would be usable by the parent component's template.
  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  @Output("eventName2") eventName1 = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  // local references can be fetched from the template with @ViewChild() decorator and be used directly here in the component
  // you insert a string with the element reference's name within the parenthesis as the an argument,
  // and with it, declare a variable that would refer to that element
  // you add {static: true} as a second argument to @ViewChild() to .....
  @ViewChild('serverContentInput', {static: true}) serverContentInputRef: ElementRef

  constructor() {}

  ngOnInit(): void {}

  onAddServer(serverNameInput: string) {
    this.serverCreated.emit({
      serverName: serverNameInput,
      serverContent: this.serverContentInputRef.nativeElement.value
    });
  }

  onAddBlueprint(serverNameInput: string) {
    this.eventName1.emit({
      serverName: serverNameInput,
      serverContent: this.serverContentInputRef.nativeElement.value
    });
  }
}
