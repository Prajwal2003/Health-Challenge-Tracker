import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { IntroSlideComponent } from './components/intro-slide/intro-slide.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutStatsComponent } from './components/workout-stats/workout-stats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSectionComponent, IntroSlideComponent, WorkoutFormComponent, WorkoutStatsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'health-challenge-tracker';
}