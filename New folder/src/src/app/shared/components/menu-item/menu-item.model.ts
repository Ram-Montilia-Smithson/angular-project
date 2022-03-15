import { BehaviorSubject, Observable } from 'rxjs';

export class MenuItemModel {
  public key?: string;
  public label?: string;
  public path?: string;
  public svgUrl?: string;
  public scale?: number;
  public size?: number;
  public isActive?: boolean;

  private active$: BehaviorSubject<boolean>;

  constructor(options: {
    label?: string;
    path?: string;
    svgUrl?: string;
    isActive?: boolean;
  }) {
    this.label = options?.label;
    this.path = options?.path;
    this.isActive = options?.isActive || false;
    this.svgUrl = options?.svgUrl || 'arrow_right_alt';
    this.active$ = new BehaviorSubject(this.isActive || false);
  }

  public getActiveObs(): Observable<boolean> {
    return this.active$.asObservable();
  }

  public emitActive(state: boolean) {
    this.active$.next(state);
  }

  public active(): void {
    this.isActive = true;
    this.emitActive(this.isActive);
  }
  public unactive(): void {
    this.isActive = false;
    this.emitActive(this.isActive);
  }
}
