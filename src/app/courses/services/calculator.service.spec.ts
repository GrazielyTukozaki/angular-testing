import { CalculatorService } from "./calculator.service";

let calculator: CalculatorService,
loggerSpy:any;

/* the beforeEach will be called before each test, and will works like a previus common setup that all the unit tests can use,
so we don't have to repeat a lot of code and instatiations */

beforeEach(()=>{

//the spy will observe if the method log its called, in this case, we want that be called only once
 loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
 calculator = new CalculatorService (loggerSpy);
});

describe('CalculatorService',()=>{
  it('should add two numbers', ()=> {
    const result = calculator.add(2,2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
  it('should subtract two numbers', ()=> {
    const result = calculator.subtract(2,2);
    expect(result).toBe(0, "unexpected substraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});

