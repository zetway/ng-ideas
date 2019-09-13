import { Component, OnInit, ChangeDetectionStrategy, Input, forwardRef, Optional, Self, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomControlComponent),
      multi: true
    }
  ]
})
export class CustomControlComponent implements OnInit, ControlValueAccessor {

  public value = null;
  public disabled = false;

  public ngControl: NgControl;

  @Input() public placeholder = '';
  @Input() public type: 'text' | 'email' = 'text';

  constructor(private readonly injector: Injector) { }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
  }

  public writeValue(value: any): void {
    if (this.value !== value) {
      this.value = value;
    }
  }

  private onChange: any = () => { };

  private onTouched: any = () => { };

  public registerOnChange(fn: () => { }): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => { }): void {
    this.onTouched = fn;
  }

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public onChangeValue(event: any): void {
    this.value = event.target.value;
    this.onChange(event.target.value);
  }

  public onTouchedInput(): void {
    this.onTouched();
  }

}
