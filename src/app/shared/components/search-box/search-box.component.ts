import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer.pipe(
      debounceTime(300)
    )
      .subscribe((value) => {
        this.onDebonunce.emit(value);
      })
  }
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';


  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebonunce = new EventEmitter<string>();

  emitValue(value: string): void {
    this.onValue.emit(value);
  }
  onKeyPress(searchTerm: any): void {
    this.debouncer.next(searchTerm);
  }
}
