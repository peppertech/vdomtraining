import 'ojs/ojbutton';
import 'ojs/ojdatetimepicker';
import 'ojs/ojformlayout';
import 'ojs/ojinputnumber';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';
import type Message = require('ojs/ojmessaging');

type InputDateChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-date'>['onvalueChanged']>
>[0];
type InputNumberChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-input-number'>['onvalueChanged']>
>[0];
type InputNumberValue = ComponentProps<'oj-input-number'>['value'];
type InputDateValue = ComponentProps<'oj-input-date'>['value'];
type InputDateMessagesCustom = ComponentProps<'oj-input-date'>['messagesCustom'];
type InputDateMessage = NonNullable<InputDateMessagesCustom>[number];

const toIsoDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const fromIsoDateString = (value: string | undefined | null) => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const isWeekendDate = (date: Date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const getClosestWeekdayDate = (fromDate: Date) => {
  const clone = new Date(fromDate.getTime());
  while (isWeekendDate(clone)) {
    clone.setDate(clone.getDate() + 1);
  }
  return clone;
};

const getClosestWeekendDate = (fromDate: Date, fallingBefore: boolean) => {
  const clone = new Date(fromDate.getTime());
  while (!isWeekendDate(clone)) {
    clone.setDate(clone.getDate() + (fallingBefore ? -1 : 1));
  }
  return clone;
};

const getEndDate = (
  fromStartDate: string | undefined | null,
  numDays: number | null | undefined
) => {
  const start = fromIsoDateString(fromStartDate);
  if (!start) {
    return undefined;
  }

  const clone = new Date(start.getTime());
  const totalDays = numDays ?? 0;
  for (let index = 0; index < totalDays; index++) {
    clone.setDate(clone.getDate() + (index === 0 ? 0 : 1));
    const weekday = getClosestWeekdayDate(clone);
    clone.setTime(weekday.getTime());
  }

  return toIsoDateString(clone);
};

export const ValidationUsecasesValueOption = () => {
  const initialStartDate = useMemo(
    () => toIsoDateString(getClosestWeekdayDate(new Date())),
    []
  );
  const [days, setDays] = useState<InputNumberValue>(1);
  const [startDate, setStartDate] = useState<InputDateValue>(initialStartDate);
  const [startDateCustomMessages, setStartDateCustomMessages] =
    useState<InputDateMessagesCustom>([]);
  const [endDate, setEndDate] = useState<InputDateValue>(getEndDate(initialStartDate, 1));
  const [endDateCustomMessages, setEndDateCustomMessages] =
    useState<InputDateMessagesCustom>([]);

  const weekendDateValidator = useMemo(
    () => ({
      validate: (value: string) => {
        const date = fromIsoDateString(value);
        if (date && isWeekendDate(date)) {
          throw new Error('Date cannot fall on a weekend.');
        }
      },
      getHint: () => null
    }),
    []
  );

  const endDateValidator = useMemo(
    () => ({
      validate: (value: string) => {
        const valueDate = fromIsoDateString(value);
        const start = fromIsoDateString(startDate);
        if (!valueDate || !start) {
          return;
        }

        if (valueDate.getTime() < start.getTime()) {
          throw new Error('End Date cannot be less than Start Date');
        }

        weekendDateValidator.validate(value);
      },
      getHint: () => null
    }),
    [startDate, weekendDateValidator]
  );

  const handleDaysChanged = (event: InputNumberChangedEvent) => {
    const nextDays = event.detail.value ?? null;
    setDays(nextDays);
    setEndDate(getEndDate(startDate, nextDays));
  };

  const handleStartDateChanged = (event: InputDateChangedEvent) => {
    const nextStartDate = event.detail.value ?? null;
    setStartDate(nextStartDate ?? undefined);
    setEndDate(getEndDate(nextStartDate, days));
  };

  const handleEndDateChanged = (event: InputDateChangedEvent) => {
    setEndDate((event.detail.value as InputDateValue | null | undefined) ?? undefined);
  };

  const handleSetWeekendStartDate = () => {
    const start = fromIsoDateString(startDate) ?? new Date();
    const weekendDateIso = toIsoDateString(getClosestWeekendDate(start, true));
    setStartDate(weekendDateIso);
    setEndDate(getEndDate(weekendDateIso, days));
  };

  const handleSetWeekendEndDate = () => {
    const start = fromIsoDateString(startDate) ?? new Date();
    setEndDate(toIsoDateString(getClosestWeekendDate(start, false)));
  };

  const handleCreateNewTask = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setDays(null);
  };

  const handleAddCustomMessage = () => {
    const msg: InputDateMessage = {
      summary: 'App Error',
      detail: 'App Error Detail',
      severity: 'error'
    };
    setStartDateCustomMessages([msg]);
    setEndDateCustomMessages([msg]);
  };

  return (
    <div id="value-option-usecase">
      <h3>Task Details</h3>
      <hr />

      <oj-form-layout id="fl">
        <oj-input-number
          id="numDays"
          labelHint="Number of Days"
          value={days}
          onvalueChanged={handleDaysChanged}
          min={1}
          max={3}
          step={1}
        />

        <oj-input-date
          id="day"
          required
          labelHint="Start Date"
          value={startDate}
          onvalueChanged={handleStartDateChanged}
          validators={[weekendDateValidator]}
          messagesCustom={startDateCustomMessages}
        />

        <oj-input-date
          id="nextday"
          labelHint="End Date"
          value={endDate}
          onvalueChanged={handleEndDateChanged}
          validators={[endDateValidator]}
          messagesCustom={endDateCustomMessages}
          help={{ instruction: 'Enter an End Date that is after the Start Date.' }}
        />
      </oj-form-layout>
      <span id="dayval">[Start Date Component Value: {String(startDate)}]</span>
      <span id="nextdayval">[End DateComponent Value: {String(endDate)}]</span>
      <div>
        <oj-button id="setWeekendBtn" onojAction={handleSetWeekendStartDate}>
          Set Weekend Start Date!!
        </oj-button>
        <oj-button id="setWeekendBtn2" onojAction={handleSetWeekendEndDate}>
          Set Weekend End Date!!
        </oj-button>
        <oj-button id="createNewTaskBtn" onojAction={handleCreateNewTask}>
          Create New Task
        </oj-button>
        <oj-button id="addCustomMsgBtn" onojAction={handleAddCustomMessage}>
          Add Custom Message
        </oj-button>
      </div>
    </div>
  );
};

export default ValidationUsecasesValueOption;
