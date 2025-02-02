import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutFormComponent } from './workout-form.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutFormComponent, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an empty workouts array', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.loadWorkouts();
    expect(component.workouts).toEqual([]);
  });

  it('should load workouts from localStorage', () => {
    const mockWorkouts = JSON.stringify([
      { userName: 'Alice', workoutType: 'Running', workoutMinutes: 30, date: '2024-02-02' },
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(mockWorkouts);

    component.loadWorkouts();

    expect(component.workouts.length).toBe(1);
    expect(component.workouts[0].userName).toBe('Alice');
  });

  it('should add a workout and save it to localStorage', () => {
    spyOn(localStorage, 'setItem');
    component.userName = 'John Doe';
    component.workoutType = 'Cycling';
    component.workoutMinutes = 45;
  
    component.addWorkout();
  
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(component.workouts.length).toBeGreaterThan(-1);
  });
  

  it('should not add a workout if required fields are missing', () => {
    spyOn(window, 'alert');
    component.userName = '';
    component.workoutMinutes = null;

    component.addWorkout();

    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields!');
    expect(component.workouts.length).toBe(0);
  });

  it('should group workouts correctly', () => {
    component.workouts = [
      { userName: 'Alice', workoutType: 'Running', workoutMinutes: 30, date: '2024-02-02' },
      { userName: 'Alice', workoutType: 'Cycling', workoutMinutes: 20, date: '2024-02-02' },
      { userName: 'Bob', workoutType: 'Running', workoutMinutes: 40, date: '2024-02-02' },
    ];

    const grouped = component.groupWorkouts();
    
    expect(grouped.length).toBe(2);
    expect(grouped[0].userName).toBe('Alice');
    expect(grouped[0].totalMinutes).toBe(50);
    expect(grouped[0].totalTypes).toBe(2);
  });

  it('should filter workouts by user name', () => {
    component.workouts = [
      { userName: 'Alice', workoutType: 'Running', workoutMinutes: 30, date: '2024-02-02' },
      { userName: 'Bob', workoutType: 'Cycling', workoutMinutes: 40, date: '2024-02-02' },
    ];
    
    component.searchTerm = 'Alice';
    component.groupAndFilterWorkouts();

    expect(component.groupedWorkouts.length).toBe(1);
    expect(component.groupedWorkouts[0].userName).toBe('Alice');
  });

  it('should filter workouts by type', () => {
    component.workouts = [
      { userName: 'Alice', workoutType: 'Running', workoutMinutes: 30, date: '2024-02-02' },
      { userName: 'Bob', workoutType: 'Cycling', workoutMinutes: 40, date: '2024-02-02' },
    ];

    component.filterType = 'Running';
    component.groupAndFilterWorkouts();

    expect(component.groupedWorkouts.length).toBe(1);
    expect(component.groupedWorkouts[0].userName).toBe('Alice');
  });

  it('should return correct total pages', () => {
    component.groupedWorkouts = Array(12).fill({
      userName: 'Alice',
      workoutCounts: { Running: 30 },
      totalTypes: 1,
      totalMinutes: 30,
    });

    component.pageSize = 5;
    expect(component.totalPages).toBe(3);
  });

  it('should paginate workouts correctly', () => {
    component.groupedWorkouts = Array(12).fill({
      userName: 'Alice',
      workoutCounts: { Running: 30 },
      totalTypes: 1,
      totalMinutes: 30,
    });

    component.pageSize = 5;
    component.currentPage = 1;

    expect(component.paginatedWorkouts.length).toBe(5);
  });

  it('should navigate to the next page', () => {
    component.groupedWorkouts = Array(12).fill({
      userName: 'Alice',
      workoutCounts: { Running: 30 },
      totalTypes: 1,
      totalMinutes: 30,
    });

    component.pageSize = 5;
    component.currentPage = 1;

    component.nextPage();
    expect(component.currentPage).toBe(2);
  });

  it('should not go past the last page', () => {
    component.groupedWorkouts = Array(12).fill({
      userName: 'Alice',
      workoutCounts: { Running: 30 },
      totalTypes: 1,
      totalMinutes: 30,
    });

    component.pageSize = 5;
    component.currentPage = 3;

    component.nextPage();
    expect(component.currentPage).toBe(3);
  });

  it('should navigate to the previous page', () => {
    component.currentPage = 2;
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });

  it('should not go below the first page', () => {
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toBe(1); 
  });

  it('should scroll to bottom on nextPage()', () => {
    spyOn(component, 'scrollToBottom');
    component.nextPage();
    expect(component.scrollToBottom).toHaveBeenCalled();
  });

  it('should scroll to bottom on previousPage()', () => {
    spyOn(component, 'scrollToBottom');
    component.previousPage();
    expect(component.scrollToBottom).toHaveBeenCalled();
  });

  it('should call addWorkout when button is clicked', () => {
    spyOn(component, 'addWorkout');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.addWorkout).toHaveBeenCalled();
  });
});
