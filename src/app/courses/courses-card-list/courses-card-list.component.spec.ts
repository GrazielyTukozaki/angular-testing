import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';


describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;

  let fixture: ComponentFixture<CoursesCardListComponent>;
  //The debug element allow to query things on the DOM
  let el: DebugElement;

  beforeEach (waitForAsync( () => {

    TestBed.configureTestingModule({
      imports: [CoursesModule]
    })
    .compileComponents()
    .then(()=>{
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
    });

  }));

  it("should create the component", () => {
  //see if the component instance was correctly created/ ins't undefined
   expect(component).toBeTruthy();

  });


  it("should display the course list", () => {

    //get the mocked course list
    component.courses = setupCourses();

    //trigger the component change detection
    fixture.detectChanges();

    //display the list on the screen
    const cards = el.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy("Could not find cards");

    expect(cards.length).toBe(12, "Unexpected number of cards");

  });


  it("should display the first course", () => {

    //get the mocked course list
    component.courses = setupCourses();

    //trigger the component change detection
    fixture.detectChanges();

    //get the first course
    const course = component.courses[0];

    const card = el.query(By.css(".course-card:first-child")),
    title = card.query(By.css("mat-card-title")),
    image = card.query(By.css("img"));

    expect(card).toBeTruthy("Could not find the first card");

    expect(title.nativeElement.textContent).toBe(course.titles.description);

    expect(image.nativeElement.src).toBe(course.iconUrl);
  });


});


