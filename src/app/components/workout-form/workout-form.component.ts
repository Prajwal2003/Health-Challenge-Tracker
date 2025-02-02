import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';


interface Workout {
  userName: string;
  workoutType: string;
  workoutMinutes: number;
  date: string;
}

interface GroupedWorkout {
  userName: string;
  workoutCounts: Record<string, number>;
  totalTypes: number;
  totalMinutes: number;
}

@Component({
  selector: 'app-workout-form',
  standalone: true,
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss'],
  imports: [CommonModule, FormsModule]
})

export class WorkoutFormComponent {
  userName: string = '';
  workoutType: string = 'Cycling';
  workoutMinutes: number | null = null;
  workouts: Workout[] = [];
  groupedWorkouts: GroupedWorkout[] = [];
  searchTerm: string = '';
  filterType: string = 'All';

  currentPage: number = 1;
  pageSize: number = 5;

  constructor() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    if (typeof window !== 'undefined' && localStorage) {
      this.workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    } else {
      this.workouts = [];
    }
    this.groupAndFilterWorkouts();
  }

  addWorkout() {
    if (!this.userName || !this.workoutMinutes) {
      alert("Please fill in all fields!");
      return;
    }

    const workout: Workout = {
      userName: this.userName,
      workoutType: this.workoutType,
      workoutMinutes: this.workoutMinutes,
      date: new Date().toLocaleDateString()
    };

    if (typeof window !== 'undefined' && localStorage) {
      const existingWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
      existingWorkouts.push(workout);
      localStorage.setItem('workouts', JSON.stringify(existingWorkouts));
      this.loadWorkouts();
      console.log("Loaded Workouts from LocalStorage:", this.workouts);
    } else {
      console.warn("LocalStorage is not available.");
    }

    this.userName = '';
    this.workoutMinutes = null;
  }

  groupWorkouts(): GroupedWorkout[] {
    const groupedData: Record<string, GroupedWorkout> = {};

    this.workouts.forEach(workout => {
      if (!groupedData[workout.userName]) {
        groupedData[workout.userName] = {
          userName: workout.userName,
          workoutCounts: {},
          totalTypes: 0,
          totalMinutes: 0
        };
      }

      if (!groupedData[workout.userName].workoutCounts[workout.workoutType]) {
        groupedData[workout.userName].workoutCounts[workout.workoutType] = 0;
      }

      groupedData[workout.userName].workoutCounts[workout.workoutType] += workout.workoutMinutes;
      groupedData[workout.userName].totalMinutes += workout.workoutMinutes;
    });

    return Object.values(groupedData).map(group => ({
      ...group,
      totalTypes: Object.keys(group.workoutCounts).length
    }));
  }

  groupAndFilterWorkouts() {
    let filtered = this.groupWorkouts();

    if (this.searchTerm) {
      filtered = filtered.filter(group =>
        group.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.filterType !== 'All') {
      filtered = filtered.filter(group =>
        Object.keys(group.workoutCounts).includes(this.filterType)
      );
    }

    this.groupedWorkouts = filtered;
    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.ceil(this.groupedWorkouts.length / this.pageSize) || 1;
  }

  get paginatedWorkouts(): GroupedWorkout[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.groupedWorkouts.slice(startIndex, startIndex + this.pageSize);
  }

  getWorkoutTypes(workoutCounts: Record<string, number>): string[] {
      return Object.keys(workoutCounts);
    }

  @ViewChild('bottomAnchor') bottomAnchor!: ElementRef;

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      setTimeout(() => this.scrollToBottom(), 50);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      setTimeout(() => this.scrollToBottom(), 50);
    }
  }

  scrollToBottom() {
    if (this.bottomAnchor) {
      this.bottomAnchor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }
}