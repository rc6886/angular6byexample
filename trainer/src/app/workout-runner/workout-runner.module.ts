import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutRunnerComponent } from './workout-runner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WorkoutRunnerComponent],
  exports: [WorkoutRunnerComponent]
})
export class WorkoutRunnerModule { }
