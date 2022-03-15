import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  filter,
  map,
  mapTo,
  merge,
  Observable,
  startWith,
  Subject,
} from 'rxjs';
import { SelectOption } from './question-select.model';

export declare type FormEvent =
  | 'default'
  | 'disable'
  | 'clear'
  | 'delete'
  | 'save'
  | 'edit'
  | 'add'
  | 'create'
  | 'update'
  | 'autocomplete'
  | 'updateOptions'
  | 'optionSelected';

export interface FormOption {
  key?: string;
  event?: FormEvent;
  control?: FormControl;
  option?: SelectOption;
  options?: SelectOption[];
  value?: any;
  value$?: Observable<any>;
}
2;
export class FormDataSource {
  // subject which handle form logic
  private formStateSubject: Subject<FormOption>;
  private formState$: Observable<FormOption>;

  constructor() {
    this.formStateSubject = new Subject<FormOption>();
    this.formState$ = this.formStateSubject.asObservable();
  }

  public getFormState$(
    formOption: FormOption = { event: 'default' }
  ): Observable<FormOption> {
    return this.formState$.pipe(startWith(formOption));
  }

  // method  which return form state filtered by events[]
  public getFormStateWithFilterEvents(
    events?: FormEvent[]
  ): Observable<FormOption> {
    return this.getFormState$().pipe(
      filter((formOption) => {
        return events ? events.indexOf(formOption.event) !== -1 : true;
      })
    );
  }
  // method  which return only form events
  public getEvents(events?: FormEvent[]): Observable<FormEvent> {
    return this.getFormState$().pipe(
      map((formOption: FormOption) => formOption.event),
      filter((event) => (events ? events.indexOf(event) !== -1 : true))
    );
  }

  // FORM EVENTS SECTION

  // use when delete item form array
  private autocomplete(formOption?: FormOption) {
    this.formStateSubject.next({ ...formOption, event: 'autocomplete' });
  }

  //  use when update form - formGroup.pathValue/setValue
  private edit(formOption?: FormOption) {
    this.formStateSubject.next({ ...formOption, event: 'edit' });
  }

  //  use when reset form - formGroup.reset()
  private clear(formOption?: FormOption) {
    this.formStateSubject.next({ ...formOption, event: 'clear' });
  }
  //  use when reset form disable - formGroup.disabled()
  private disable() {
    this.formStateSubject.next({ event: 'disable' });
  }

  //  use when update form options
  private updateOptions(formOption?: FormOption) {
    this.formStateSubject.next({ ...formOption, event: 'updateOptions' });
  }

  // DATA EVENTS SECTION

  // use when delete item form array
  private delete(formOption?: FormOption) {
    this.formStateSubject.next({ ...formOption, event: 'clear' });
  }

  // use to create new item
  private create(formOption?: FormOption) {
    this.formStateSubject.next({ ...formOption, event: 'create' });
  }

  // use when to add created item
  private add(formOption?: FormOption) {
    this.formStateSubject.next({ ...formOption, event: 'add' });
  }

  // use when save item form array
  private save(formOption?: FormOption) {
    this.formStateSubject.next({ ...formOption, event: 'save' });
  }

    // use when save item form array
    private update(formOption?: FormOption) {
      this.formStateSubject.next({ ...formOption, event: 'update' });
    }

  private optionSelected(formOption: FormOption) {
    this.formStateSubject.next({ ...formOption, event: 'optionSelected' });
  }


  public getActions() {
    return {
      edit: (formOption?) => this.edit(formOption),
      add: (formOption?) => this.add(formOption),
      create: (formOption?) => this.create(formOption),
      clear: (formOption?) => this.clear(formOption),
      disable: () => this.disable(),
      updateOptions: (formOption?) => this.updateOptions(formOption),
      delete: (formOption?) => this.delete(formOption),
      save: (formOption?) => this.save(formOption),
      update: (formOption?) => this.update(formOption),
      autocomplete: (formOption?) => this.autocomplete(formOption),
      optionSelected: (formOption?) => this.optionSelected(formOption),
    };
  }

  public getStateOf = {
    edit: () => this.getFormStateWithFilterEvents(['edit']),
    add: () => this.getFormStateWithFilterEvents(['add']),
    create: () => this.getFormStateWithFilterEvents(['create']),
    clear: () => this.getFormStateWithFilterEvents(['clear']),
    disable: () => this.getFormStateWithFilterEvents(['disable']),
    updateOptions: () => this.getFormStateWithFilterEvents(['updateOptions']),
    delete: () => this.getFormStateWithFilterEvents(['delete']),
    save: () => this.getFormStateWithFilterEvents(['save']),
    update: () => this.getFormStateWithFilterEvents(['update']),
    autocomplete: () => this.getFormStateWithFilterEvents(['autocomplete']),
    optionSelected: () => this.getFormStateWithFilterEvents(['optionSelected']),
  };

  public toggleEvent(
    trueEvents: FormEvent[],
    falseEvents: FormEvent[]
  ): Observable<boolean> {
    const true$ = this.getEvents(trueEvents).pipe(mapTo(true));
    const false$ = this.getEvents(falseEvents).pipe(mapTo(false));
    return merge(true$, false$);
  }
}
