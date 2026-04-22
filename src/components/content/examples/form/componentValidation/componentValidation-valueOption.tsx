import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "ojs/ojbutton";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import "ojs/ojinputnumber";
import { IntlConverterUtils } from "ojs/ojconverterutils-i18n";
import {
  getClosestWeekdayDate,
  getClosestWeekendDate,
  getEndDate,
  weekendDateValidator,
} from "./componentValidation-shared";

export default function ValidationUsecasesValueOptionExample() {
  const initialStartIso = useMemo(
    () => IntlConverterUtils.dateToLocalIsoDateString(getClosestWeekdayDate(new Date())),
    [],
  );
  const [days, setDays] = useState<number | null>(1);
  const [startDate, setStartDate] = useState<string | null>(initialStartIso);
  const [startDateCustomMessages, setStartDateCustomMessages] = useState<any[]>([]);
  const [endDate, setEndDate] = useState<string | null>(
    getEndDate(initialStartIso, 1),
  );
  const [endDateCustomMessages, setEndDateCustomMessages] = useState<any[]>([]);

  const endDateValidator = {
    validate(value: string) {
      if (!startDate) {
        return;
      }
      const valueDate = IntlConverterUtils.isoToLocalDate(value);
      const start = IntlConverterUtils.isoToLocalDate(startDate);
      if (valueDate.getTime() < start.getTime()) {
        throw new Error("End Date cannot be less than Start Date");
      }
      weekendDateValidator.validate(value);
    },
    getHint() {
      return null;
    },
  };

  return (
    <div id="value-option-usecase">
      <h3>Task Details</h3>
      <hr />

      <oj-form-layout>
        <oj-input-number
          labelHint="Number of Days"
          value={days as any}
          min={1}
          max={3}
          step={1}
          onvalueChanged={(event: any) => {
            const nextDays = event.detail.value == null ? null : Number(event.detail.value);
            setDays(nextDays);
            setEndDate(getEndDate(startDate, nextDays));
          }}
        />

        <oj-input-date
          required={true}
          labelHint="Start Date"
          value={startDate as any}
          validators={[[weekendDateValidator]] as any}
          messagesCustom={startDateCustomMessages as any}
          onvalueChanged={(event: any) => {
            const nextValue = (event.detail.value as string | null) ?? null;
            setStartDate(nextValue);
            setEndDate(getEndDate(nextValue, days));
          }}
        />

        <oj-input-date
          labelHint="End Date"
          value={endDate as any}
          validators={[[endDateValidator]] as any}
          messagesCustom={endDateCustomMessages as any}
          help={{ instruction: "Enter an End Date that is after the Start Date." } as any}
          onvalueChanged={(event: any) => {
            setEndDate((event.detail.value as string | null) ?? null);
          }}
        />
      </oj-form-layout>
      <span>[Start Date Component Value: {String(startDate)}]</span>
      <span>[End Date Component Value: {String(endDate)}]</span>
      <div>
        <oj-button
          onojAction={() => {
            if (startDate) {
              const start = IntlConverterUtils.isoToLocalDate(startDate);
              setStartDate(
                IntlConverterUtils.dateToLocalIsoDateString(
                  getClosestWeekendDate(start, true),
                ),
              );
            }
          }}
        >
          Set Weekend Start Date!!
        </oj-button>
        <oj-button
          onojAction={() => {
            const baseDate = startDate
              ? IntlConverterUtils.isoToLocalDate(startDate)
              : new Date();
            setEndDate(
              IntlConverterUtils.dateToLocalIsoDateString(
                getClosestWeekendDate(baseDate, false),
              ),
            );
          }}
        >
          Set Weekend End Date!!
        </oj-button>
        <oj-button
          onojAction={() => {
            setStartDate(null);
            setEndDate(null);
            setDays(null);
          }}
        >
          Create New Task
        </oj-button>
        <oj-button
          onojAction={() => {
            const msg = {
              summary: "App Error",
              detail: "App Error Detail",
              severity: "error",
            };
            setStartDateCustomMessages([msg]);
            setEndDateCustomMessages([msg]);
          }}
        >
          Add Custom Message
        </oj-button>
      </div>
    </div>
  );
}
