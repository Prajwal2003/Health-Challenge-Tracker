import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroSlideComponent } from './intro-slide.component';

describe('IntroSlideComponent', () => {
  let component: IntroSlideComponent;
  let fixture: ComponentFixture<IntroSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
