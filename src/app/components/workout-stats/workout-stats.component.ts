import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';

interface Workout {
  userName: string;
  workoutType: string;
  workoutMinutes: number;
}

@Component({
  selector: 'app-workout-stats',
  standalone: true,
  templateUrl: './workout-stats.component.html',
  styleUrls: ['./workout-stats.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class WorkoutStatsComponent implements OnInit {
  users: string[] = [];
  selectedUser: string = '';
  workouts: Workout[] = [];
  userWorkouts: Workout[] = [];

  totalMinutes: number = 0;
  avgMinutes: number = 0;
  minMinutes: number = 0;
  maxMinutes: number = 0;

  pieChart: any;

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    const storedData = localStorage.getItem('workouts');
    this.workouts = storedData ? JSON.parse(storedData) : [];

    this.users = [...new Set(this.workouts.map(workout => workout.userName))];
  }

  onUserSelect() {
    if (!this.selectedUser) return;

    this.userWorkouts = this.workouts.filter(workout => workout.userName === this.selectedUser);

    this.calculateStats();

    this.renderPieChart();
  }

  calculateStats() {
    const totalMinutesArray = this.userWorkouts.map(workout => workout.workoutMinutes);
    this.totalMinutes = totalMinutesArray.reduce((sum, min) => sum + min, 0);
    this.avgMinutes = this.totalMinutes / totalMinutesArray.length || 0;
    this.minMinutes = Math.min(...totalMinutesArray) || 0;
    this.maxMinutes = Math.max(...totalMinutesArray) || 0;
  }

  renderPieChart() {
    setTimeout(() => {
      const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
      if (!canvas) {
        console.error("Canvas element not found!");
        return;
      }
  
      if (this.pieChart) {
        this.pieChart.destroy();
      }
  
      const workoutTypes = this.userWorkouts.map(w => w.workoutType);
      const workoutMinutes = this.userWorkouts.map(w => w.workoutMinutes);
  
      this.pieChart = new Chart(canvas.getContext('2d')!, {
        type: 'pie',
        data: {
          labels: workoutTypes,
          datasets: [{
            data: workoutMinutes,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0']
          }]
        }
      });
    }, 100);
  }
}