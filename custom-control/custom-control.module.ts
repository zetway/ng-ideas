import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomControlComponent } from './custom-control/custom-control.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomControlComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [CustomControlComponent]
})
export class CustomControlModule { }
