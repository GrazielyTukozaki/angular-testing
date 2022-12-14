import {ComponentFixture, fakeAsync, flush, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {CoursesService} from '../services/courses.service';

import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';


//Testing a container component

describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().
  filter(course => course.category == 'BEGINNER');

  const advancedCourses = setupCourses().
  filter(course => course.category == 'ADVANCED');

  beforeEach(waitForAsync(() => {

    const courseServiceSpy = jasmine.createSpyObj('CoursesService',['findAllCourses'])

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
         NoopAnimationsModule //this module its essencial if have some animation, in this case have the tag change animation
        ],
        providers: [
          {provide: CoursesService, useValue: courseServiceSpy} //mocking the CoursesService
        ]
    }).compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(HomeComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
          coursesService = TestBed.inject(CoursesService);
        });
  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    //call all the courses from service mock and filter by category synchronously
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    //DOM should reflect the data passed above only with Beginner group

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    expect(tabs.length).toBe(1, "Unexpected number of tabs found");

  });


  it("should display only advanced courses", () => {

    //call all the courses from service mock and filter by category synchronously
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();

    //DOM should reflect the data passed above only with Advanced group

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    expect(tabs.length).toBe(1, "Unexpected number of tabs found");

  });


  it("should display both tabs", () => {

    //call all the courses from service mock and get both categories synchronously
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    //DOM should reflect the data passed above with both categories

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    expect(tabs.length).toBe(2, "2 tabs not found");

  });


  it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {

    //call all the courses from service mock and get both categories synchronously
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    //DOM should reflect the data passed above with both categories

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    //Simulanting user DOM interaction, call function click whith secound tab as argument

    click(tabs[1]);

    fixture.detectChanges();

    //flush() will execute all the asynchronous tasks at the queue before execute the next lines
    flush();

    //the animation is asynchronous, so the test need to be executed asynchronously

    const cardTitles = el.queryAll(By.css(".mat-tab-body-active"));

    expect(cardTitles.length).toBeGreaterThan(0, "Couldn't find card titles");

    //Verify if the first course title is Angular Security Course
    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");



  }));

  //the same test above, but whith waitForAsync instead fakeAsync
  it("should display advanced courses when tab clicked - waitForAsync", waitForAsync(() => {

    //call all the courses from service mock and get both categories synchronously
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    //DOM should reflect the data passed above with both categories

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    //Simulanting user DOM interaction, call function click whith secound tab as argument

    click(tabs[1]);

    fixture.detectChanges();

    //when all the asynchronous tasks end, its necessary to call the whenStable, to say that the process finished
    fixture.whenStable().then(() => {

      //the animation is asynchronous, so the test need to be executed asynchronously

    const cardTitles = el.queryAll(By.css(".mat-tab-body-active"));

    expect(cardTitles.length).toBeGreaterThan(0, "Couldn't find card titles");

    //Verify if the first course title is Angular Security Course
    expect(cardTitles[0].nativeElement.textContent).toContain("Angular Security Course");

    });

  }));

});


