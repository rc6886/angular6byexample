import { Component, OnInit } from '@angular/core';
import { WorkoutPlan, ExercisePlan, Exercise } from './model';
import { buildWorkoutData } from './workout-data-builder';

@Component({
  selector: 'abe-workout-runner',
  templateUrl: './workout-runner.component.html',
  styles: []
})
export class WorkoutRunnerComponent implements OnInit {
  workoutPlan: WorkoutPlan;
  restExercise: ExercisePlan;
  workoutTimeRemaining: number;
  currentExerciseIndex: number;
  currentExercise: ExercisePlan;
  exerciseRunningDuration: number;
  exerciseTrackingInterval: number;

  constructor() { }

  start() {
    this.workoutTimeRemaining = this.workoutPlan.totalWorkoutDuration();

    this.currentExerciseIndex = 0;
    this.startExercise(this.workoutPlan.exercises[this.currentExerciseIndex]);
  }

  startExercise(exercisePlan: ExercisePlan) {
    this.currentExercise = exercisePlan;
    this.exerciseRunningDuration = 0;

    this.startExerciseTimeTracking();
  }

  startExerciseTimeTracking() {
    this.exerciseTrackingInterval = window.setInterval(() => {
      if (this.exerciseRunningDuration >= this.currentExercise.duration) {
        clearInterval(this.exerciseTrackingInterval);

        const next: ExercisePlan = this.getNextExercise();

        if (next) {
          if (next !== this.restExercise) {
            this.currentExerciseIndex++;
          }

          this.startExercise(next);
        } else {
          console.log('Workout complete!');
        }

        return;
      }

      ++this.exerciseRunningDuration;
      --this.workoutTimeRemaining;
    }, 1000);
  }

  getNextExercise(): ExercisePlan {
    let nextExercise: ExercisePlan = null;

    if (this.currentExercise === this.restExercise) {
      nextExercise = this.workoutPlan.exercises[this.currentExerciseIndex + 1];
    } else if (this.currentExerciseIndex < this.workoutPlan.exercises.length - 1) {
      nextExercise = this.restExercise;
    }

    return nextExercise;
  }

  ngOnInit() {
    this.workoutPlan = buildWorkoutData();

    this.restExercise = new ExercisePlan(
      new Exercise('rest', 'Relax!', 'Relax a bit', 'rest.png'),
      this.workoutPlan.restBetweenExercise);

    this.start();
  }
}
