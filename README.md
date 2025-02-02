# Health Challenge Tracker

This is a health challenge tracker web application built using Angular. The app allows users to log their workouts, view workout statistics, and track their progress over time. It uses `localStorage` to save user data and provides an easy-to-use interface to monitor fitness goals.

## Features

- **Workout Log**: Allows users to log their workout details including type, duration, and calories burned.
- **Workout Statistics**: Displays statistics such as the shortest and longest workouts.
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly design.
- **Data Persistence**: User data is stored in `localStorage` for session persistence.

## Technologies Used

- **Angular**: Frontend framework for building the application.
- **Tailwind CSS**: Utility-first CSS framework used for styling the app.
- **localStorage**: Used to store and retrieve workout data in the browser.

## Requirements

- Node.js (version >= 14)
- npm (Node package manager)
- chart.js
  
## Getting Started

To get started with the development of this project, follow the steps below:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/health-challenge-tracker.git
cd health-challenge-tracker
```

### 2. Install dependencies

Install all the required dependencies using npm:

```bash
npm install
```

### 3. Run the application

Once the dependencies are installed, run the development server:
```bash
ng serve
```
This will start the Angular development server and you can access the application at http://localhost:4200.

### Folder Structure
```bash
src/
├── app/
    ├── components/
    │   ├── ABC/
    │   │   ├── ABC.component.ts   
    │   │   ├── ABC.component.html 
    │   │   └── ABC.component.scss 
    │   └── .....
    ├── app.component.ts
    │── app.component.html
    └── index.html
```

### Summary

- **Total Specs Executed**: 23
- **Total Specs Passed**: 23
- **Total Duration**: 0.099 seconds

### Test Results

| Component               | Test Outcome                                                                                                                                                                                      |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **IntroSlideComponent**  | should create                                                                                                                                                                                    |
| **AppComponent**         | should create the app, should have the 'health-challenge-tracker' title, should render title                                                                                                      |
| **WorkoutStatsComponent**| should create                                                                                                                                                                                    |
| **WorkoutFormComponent** | should return correct total pages, should filter workouts by type, should scroll to bottom on nextPage(), should navigate to the next page, should paginate workouts correctly, should call addWorkout when button is clicked, should initialize with an empty workouts array, should scroll to bottom on previousPage(), should not add a workout if required fields are missing, should group workouts correctly, should filter workouts by user name, should create the component, should load workouts from localStorage, should add a workout and save it to localStorage, should not go past the last page, should navigate to the previous page, should not go below the first page |
| **HeroSectionComponent** | should create                                                                                                                                                                                    |

## Code Coverage

- **Statements**: 70.27% (78/111)
- **Branches**: 63.88% (23/36)
- **Functions**: 53.33% (16/30)
- **Lines**: 75.51% (74/98)

### Usage

Once the app is running, you can interact with the following features:
	•	Log a new workout: Use the provided form to log a new workout including its duration, type, and calories burned.
	•	View statistics: On the main page, you’ll see the shortest and longest workout durations.

Example of Workout Data
```
{
  "type": "Running",
  "duration": 45
}
```

### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgements
	•	Tailwind CSS: A utility-first CSS framework.
	•	Angular: A TypeScript-based open-source web application framework.
