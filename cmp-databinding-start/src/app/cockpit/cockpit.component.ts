import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

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

  constructor() {}

  ngOnInit(): void {}

  onAddServer(serverNameInput: string, serverContentInput: string) {
    console.log(serverNameInput, serverContentInput);
    this.serverCreated.emit({
      serverName: serverNameInput,
      serverContent: serverContentInput
    });
  }

  onAddBlueprint(serverNameInput: string, serverContentInput: string) {
    this.eventName1.emit({
      serverName: serverNameInput,
      serverContent: serverContentInput
    });
  }
}
