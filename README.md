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

### Troubleshooting

Error: localStorage is not defined

This error typically occurs if the app is trying to use localStorage during server-side rendering or in a non-browser environment (such as during unit testing).

To fix this, ensure that the code accessing localStorage is only run in the browser. You can do this by checking if window or localStorage is available before using it.

if (typeof window !== 'undefined' && window.localStorage) {
  const data = localStorage.getItem('key');
}

### Enjoy using the Health Challenge Tracker! 🎉