import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";


describe("Async Testing Examples", () => {

  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {

    let test = false;

    setTimeout(() => {

      test = true;

      expect(test).toBeTruthy();

      done();
    }, 1000);

  });

  it("Asynchronous test example with setTimeout()", fakeAsync(() => {

    let test = false;

    setTimeout(() => {

      test = true;

    }, 1000);

    //tick() defines the operation time that the asynchronous test will take to end the task
    //tick(1000);

    //flush() wait for all asynchronous tasks to be executed without defining a time to the operation
    flush();

    expect(test).toBeTruthy();

  }));

  it("Asynchronous test example - plain Promise", fakeAsync(() => {

    let test = false;

    console.log("Creating Promise");

    Promise.resolve().then(() => {
      console.log("Promise evaluated successfully");

      test = true;

    });

    /** the Asynchronous tasks goes to the "tasks queue" to be processed,
    but the Promises goes to a different browser queue, the "microtaks queue", so the
    command its a little bit different flushMicrotasks() **/

    flushMicrotasks();

    console.log("Running test assertions");

    expect(test).toBeTruthy();

  }));

  it("Asynchronous test example - Promises + setTimeout", fakeAsync(() => {

    let counter = 0;

    Promise.resolve()
        .then(() => {

          counter+=10;

          setTimeout(() => {
            counter+=1;
          }, 1000);
    });

    expect(counter).toBe(0);

    /// mix the flush microtasks with tick(), to control the tasks queue

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);


  }));

  it("Asynchronous test example - Observables", fakeAsync(() => {

    let test = false;

    console.log("Creating Observable");

    //creating an asynchronous Observable
    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);

    console.log("Running test assertions");

    expect(test).toBe(true);

  }));

});
