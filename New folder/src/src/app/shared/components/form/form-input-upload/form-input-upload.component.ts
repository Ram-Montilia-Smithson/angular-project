import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormService, Question } from '../services/form.service';

@Component({
  selector: 'kkl-form-input-upload',
  templateUrl: './form-input-upload.component.html',
  styleUrls: ['./form-input-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputUploadComponent),
      multi: true,
    },
  ],
})
export class FormInputUploadComponent implements OnInit {
  @Input() multi: boolean;
    // emit the file
  @Output() fileChange = new EventEmitter<File | string>();

  // listen to change event
  @HostListener('change', ['$event.target.files']) emitFiles(event) {
    // this.file = event && event.item(0);
    this.fileChange.emit(event);
  }

  public file: File | null = null;
  public preview: string;

  private uploadQuestion: Question = {
    key: 'upload',
    label: '',
  };
  public control: FormControl;

  constructor(
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.control = this.formService.getFieldControl(this.uploadQuestion);
  }
}
