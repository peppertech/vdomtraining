import AsyncNumberRangeValidator = require('ojs/ojasyncvalidator-numberrange');
import type AsyncValidator = require('ojs/ojvalidator-async');

export default class DemoNumberRangeAsyncValidator implements AsyncValidator<number> {
  readonly hint: Promise<string | null>;

  constructor(private readonly timeoutTimeMs: number) {
    this.hint = new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          'Enter a number between 100 and 10000, otherwise you will see an error.'
        );
      }, 100);
    });
  }

  validate = (value: number) => {
    const numberRangeValidator = new AsyncNumberRangeValidator({
      min: 100,
      max: 10000
    });

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        numberRangeValidator.validate(value).then(
          () => resolve(),
          (error) => reject(new Error(`${error} Your value is ${value}.`))
        );
      }, this.timeoutTimeMs);
    });
  };
}
