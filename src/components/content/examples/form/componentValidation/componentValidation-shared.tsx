import { IntlDateTimeConverter } from "ojs/ojconverter-datetime";
import { IntlNumberConverter } from "ojs/ojconverter-number";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import * as LocaleData from "ojs/ojlocaledata";
import AsyncDateRestrictionValidator = require("ojs/ojasyncvalidator-daterestriction");
import AsyncNumberRangeValidator = require("ojs/ojasyncvalidator-numberrange");
import AsyncRegExpValidator = require("ojs/ojasyncvalidator-regexp");

export const usernameValidator = new AsyncRegExpValidator({
  pattern: "[a-zA-Z0-9]{3,}",
  messageDetail: "Enter at least 3 letters or numbers",
});

export const passwordValidator = new AsyncRegExpValidator({
  pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",
  label: "Password",
  messageSummary: "'{label}' too Weak",
  messageDetail:
    "You must enter a password that meets our minimum security requirements.",
});

export const dateShortConverter = new IntlDateTimeConverter({
  formatType: "date",
  dateFormat: "short",
});

export const dateLongConverter = new IntlDateTimeConverter({
  dateFormat: "long",
});

export const decimalConverter = new IntlNumberConverter({
  style: "decimal",
});

export const percentConverter = new IntlNumberConverter({
  style: "percent",
});

export const currencyConverter = new IntlNumberConverter({
  style: "currency",
  currency: "USD",
  currencyDisplay: "symbol",
});

export const asyncSyncValidator = {
  validate(value: string | number) {
    if (value === 500 || value === "500") {
      throw new Error("500 is invalid");
    }
  },
  getHint() {
    return "Enter 500 to see an immediate synchronous validation error.";
  },
};

export const delayedRangeValidator = {
  validate(value: string | number) {
    const validator = new AsyncNumberRangeValidator({
      min: 100,
      max: 10000,
      converter: currencyConverter,
    });
    return new Promise<void>((resolve, reject) => {
      window.setTimeout(() => {
        validator.validate(value).then(resolve, (error) => reject(error));
      }, 1000);
    });
  },
  hint: new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(
        "Enter a value outside the range $100.00 to $10,000.00 to see the delayed error.",
      );
    }, 100);
  }),
};

export const aprilFoolsValidator = {
  validate(value: string) {
    return new Promise<void>((resolve, reject) => {
      const validator = new AsyncDateRestrictionValidator({
        converter: new IntlDateTimeConverter({
          formatType: "date",
          dateFormat: "short",
        }),
        dayFormatter(dateInfo: { month: number; date: number }) {
          if (dateInfo.month === 4 && dateInfo.date === 1) {
            return { disabled: true };
          }
          return null;
        },
        messageSummary: "Ha! Ha!",
        messageDetail: "You can't fool me! Try a different date.",
      });
      window.setTimeout(() => {
        validator.validate(value).then(resolve, reject);
      }, 1000);
    });
  },
  hint: new Promise((resolve) => {
    window.setTimeout(() => {
      resolve("Select April Fools Day to see an async validation error.");
    }, 100);
  }),
};

export function createUsernameValidators(pattern: string, placeholder: string) {
  return [
    new AsyncRegExpValidator({
      pattern,
      hint: `Enter ${placeholder}. No numbers are allowed.`,
      messageDetail: `You must enter ${placeholder}`,
    }),
  ];
}

export function createWeightValidators(min: number) {
  return [
    new AsyncNumberRangeValidator({
      hint: { min: "Enter a value greater than or equal to {min}" },
      messageDetail: {
        rangeUnderflow: "Your 'Target Weight' should be at least {min} lbs",
      },
      min,
    }),
  ];
}

export function createAgeValidators() {
  return [
    new AsyncNumberRangeValidator({
      hint: { min: "Enter a value greater than {min}" },
      messageDetail: {
        rangeUnderflow: "You must be at least {min} years or older",
      },
      min: 18,
    }),
  ];
}

export function createCompetitionWeightValidators() {
  return [
    new AsyncNumberRangeValidator({
      messageDetail: {
        rangeUnderflow: "You must be at least {min} lbs to qualify",
      },
      min: 150,
    }),
  ];
}

export function isWeekendDate(value: Date) {
  const start = LocaleData.getWeekendStart();
  const end = LocaleData.getWeekendEnd();
  return (value.getDay() + start + end) % 7 >= 5;
}

export function getClosestWeekdayDate(fromDate: Date) {
  const clone = new Date(fromDate ? fromDate.getTime() : Date.now());
  while (isWeekendDate(clone)) {
    clone.setDate(clone.getDate() + 1);
  }
  return clone;
}

export function getClosestWeekendDate(fromDate: Date, fallingBefore: boolean) {
  const clone = new Date(fromDate ? fromDate.getTime() : Date.now());
  while (!isWeekendDate(clone)) {
    clone.setDate(clone.getDate() + (fallingBefore ? -1 : 1));
  }
  return clone;
}

export function getEndDate(fromStartDate: string | null, numDays: number | null) {
  if (!fromStartDate) {
    return null;
  }
  let clone = IntlConverterUtils.isoToLocalDate(fromStartDate);
  const days = numDays ?? 0;
  for (let i = 0; i < days; i++) {
    clone.setDate(clone.getDate() + (i === 0 ? 0 : 1));
    clone = getClosestWeekdayDate(clone);
  }
  return IntlConverterUtils.dateToLocalIsoDateString(clone);
}

export const weekendDateValidator = {
  validate(value: string) {
    const valueDate = IntlConverterUtils.isoToLocalDate(value);
    if (isWeekendDate(valueDate)) {
      throw new Error("Weekend dates are not allowed.");
    }
  },
  getHint() {
    return null;
  },
};
