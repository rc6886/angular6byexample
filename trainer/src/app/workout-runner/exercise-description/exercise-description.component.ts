import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'abe-exercise-description',
  templateUrl: './exercise-description.component.html',
  styles: []
})
export class ExerciseDescriptionComponent implements OnInit {
  constructor() { }
  @Input() description: string;
  @Input() steps: string;

  ngOnInit() {
  }
}
