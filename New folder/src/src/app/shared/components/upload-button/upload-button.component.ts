import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-upload-button',
  templateUrl: './upload-button.component.html',
  styleUrls: ['./upload-button.component.scss'],
})
export class UploadButtonComponent implements OnInit {
  @Input() multi: boolean = true;
  @Input() table: boolean;
  @Input() public label: string = 'לחץ להעלאת קובץ';
  @Input() changeName: boolean;
  // @Input() delete: Observable<number>;
  @Input() boxLayout: string = 'column';
  @Input() globalLayout:string = 'column';
  @Input() buttonFlex:number;
  @Input() isTable:boolean = false;
  public fileName: string;

  @Output() getFiles: EventEmitter<File[]> = new EventEmitter<File[]>();

  public files: File[] = [];

  constructor() { }

  ngOnInit(): void {    
  }

  public onFileChange(file: File & File[]) {
    if (this.changeName) {
      this.fileName = file.name;
    }
    for (const [key, value] of Object.entries(file)) {
      this.files.push(value);
    }
    this.getFiles.emit(this.files);
  }

  public removeFile(index: number) {
    this.files.splice(index, 1);
    this.getFiles.emit(this.files);
  }
}
