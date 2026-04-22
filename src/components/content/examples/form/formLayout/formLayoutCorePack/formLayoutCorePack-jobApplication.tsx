import { h } from "preact";
import { useMemo, useState } from "preact/hooks";
import "oj-c/button";
import "oj-c/checkbox";
import "oj-c/checkboxset";
import "oj-c/form-layout";
import "oj-c/input-date-text";
import "oj-c/input-text";
import "oj-c/radioset";
import "oj-c/select-single";
import "oj-c/text-area";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");

const experienceData = [
  { value: "lessthanone", label: "Less than 1 year" },
  { value: "onefive", label: "Between 1 and 5 years" },
  { value: "fiveten", label: "Between 5 and 10 years" },
  { value: "tenfifteen", label: "Between 10 and 15 years" },
  { value: "fifteentwenty", label: "Between 15 and 20 years" },
  { value: "more20", label: "More than 20 years" },
];

const statesData = [
  "AL",
  "AK",
  "AZ",
  "CA",
  "CO",
  "FL",
  "GA",
  "IL",
  "MA",
  "NC",
  "NJ",
  "NY",
  "OR",
  "TX",
  "UT",
  "VA",
  "WA",
].map((value) => ({ value, label: value }));

const jobTypeData = [
  { value: "regular", label: "Regular Employee" },
  { value: "temporary", label: "Temporary Employee" },
  { value: "student", label: "Student/Intern" },
  { value: "contractor", label: "Contractor" },
];

const employmentData = [
  { value: "yes", label: "Yes, I am authorized" },
  { value: "no", label: "No, I am not authorized" },
];

const sponsorshipData = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const sponsorshipTypeData = [
  { value: "H-1B", label: "H-1B" },
  { value: "L-1B", label: "L-1B" },
  { value: "O-1", label: "O-1" },
  { value: "TN", label: "TN" },
];

export default function FormLayoutCorePackJobApplicationExample() {
  const experienceProvider = useMemo(
    () => new MutableArrayDataProvider(experienceData, { keyAttributes: "value" }),
    [],
  );
  const statesProvider = useMemo(
    () => new MutableArrayDataProvider(statesData, { keyAttributes: "value" }),
    [],
  );
  const jobTypeProvider = useMemo(
    () => new MutableArrayDataProvider(jobTypeData, { keyAttributes: "value" }),
    [],
  );
  const employmentProvider = useMemo(
    () => new MutableArrayDataProvider(employmentData, { keyAttributes: "value" }),
    [],
  );
  const sponsorshipProvider = useMemo(
    () => new MutableArrayDataProvider(sponsorshipData, { keyAttributes: "value" }),
    [],
  );
  const sponsorshipTypesProvider = useMemo(
    () =>
      new MutableArrayDataProvider(sponsorshipTypeData, {
        keyAttributes: "value",
      }),
    [],
  );

  const [stateVal, setStateVal] = useState<string | null>(null);
  const [employmentVal, setEmploymentVal] = useState<string | null>(null);
  const [sponsorshipVal, setSponsorshipVal] = useState<string | null>(null);
  const [sponsorshipTypeVal, setSponsorshipTypeVal] = useState("H-1B");
  const [experienceVal, setExperienceVal] = useState<string | null>(null);
  const [jobTypeVal, setJobTypeVal] = useState<string[]>(["regular"]);
  const sponsorshipTypeDisabled = sponsorshipVal !== "yes";

  return (
    <div class="oj-flex oj-sm-flex-direction-column oj-sm-gap-4x">
      <div>
        <h1 class="oj-typography-heading-xs">Profile Information</h1>
        <h2 class="oj-typography-subheading-xs">Personal Information</h2>
        <oj-c-form-layout direction="row" maxColumns={2}>
          <oj-c-input-text labelHint="First Name" required={true} />
          <oj-c-input-text labelHint="Last Name" required={true} />
          <oj-c-input-text labelHint="Address" autocomplete="off" />
          <oj-c-form-layout direction="row" columns={2}>
            <oj-c-select-single
              labelHint="State"
              data={statesProvider}
              itemText="label"
              required={true}
              value={stateVal}
              onvalueChanged={(event) => {
                setStateVal((event.detail.value as string | null) ?? null);
              }}
            />
            <oj-c-input-text labelHint="Zip" />
          </oj-c-form-layout>
          <oj-c-input-text labelHint="Phone" />
          <oj-c-input-text labelHint="Email" />
        </oj-c-form-layout>
      </div>

      <div>
        <h1 class="oj-typography-heading-xs">Employment</h1>
        <h2 class="oj-typography-subheading-xs">Employment Eligibility</h2>
        <oj-c-form-layout direction="row" maxColumns={2}>
          <oj-c-radioset
            labelHint="Are you authorized to work in the United States?"
            options={employmentProvider}
            value={employmentVal}
            onvalueChanged={(event) => {
              setEmploymentVal((event.detail.value as string | null) ?? null);
            }}
          />
          <oj-c-form-layout direction="column">
            <oj-c-radioset
              direction="row"
              labelHint="Do you require sponsorship for employment visa status?"
              options={sponsorshipProvider}
              value={sponsorshipVal}
              onvalueChanged={(event) => {
                setSponsorshipVal((event.detail.value as string | null) ?? null);
              }}
            />
            <oj-c-select-single
              labelHint="Visa Type"
              data={sponsorshipTypesProvider}
              itemText="label"
              disabled={sponsorshipTypeDisabled}
              value={sponsorshipTypeVal}
              onvalueChanged={(event) => {
                setSponsorshipTypeVal(String(event.detail.value ?? "H-1B"));
              }}
            />
          </oj-c-form-layout>
        </oj-c-form-layout>

        <h2 class="oj-typography-subheading-xs">
          Employment Preferences and Conditions
        </h2>
        <oj-c-form-layout direction="row" maxColumns={2}>
          <oj-c-input-text labelHint="Job Title" />
          <oj-c-form-layout direction="row" columns={2}>
            <oj-c-select-single
              labelHint="Experience"
              data={experienceProvider}
              itemText="label"
              value={experienceVal}
              onvalueChanged={(event) => {
                setExperienceVal((event.detail.value as string | null) ?? null);
              }}
            />
            <oj-c-input-text labelHint="Shift" />
          </oj-c-form-layout>
          <oj-c-checkboxset
            labelHint="Job Type"
            options={jobTypeProvider}
            value={jobTypeVal}
            onvalueChanged={(event) => {
              setJobTypeVal((event.detail.value as string[]) ?? []);
            }}
          />
        </oj-c-form-layout>
      </div>

      <div>
        <h2 class="oj-typography-subheading-xs">Employment History</h2>
        <p>List employment starting with your most recent position.</p>
        <oj-c-form-layout direction="row" maxColumns={2}>
          <oj-c-input-text labelHint="Employer Name" />
          <oj-c-input-text labelHint="Position/Job Title" />
          <oj-c-form-layout direction="row" columns={2}>
            <oj-c-input-date-text labelHint="Start Date" autocomplete="off" />
            <oj-c-input-date-text labelHint="End Date" autocomplete="off" />
          </oj-c-form-layout>
          <oj-c-input-text labelHint="Contact Reference" />
          <oj-c-text-area
            labelHint="Description"
            rows={6}
            columnSpan={2}
            value=""
          />
          <oj-c-input-text labelHint="Employer Address" columnSpan={2} />
        </oj-c-form-layout>
        <div class="oj-sm-margin-2x-top">
          <oj-c-button label="Add More" />
        </div>
      </div>

      <div>
        <h1 class="oj-typography-heading-xs">Data Privacy</h1>
        <oj-c-form-layout direction="row">
          <oj-c-checkbox required={true}>
            I agree my application details may be stored in the Oracle Global
            Recruiting database for 24 months.
          </oj-c-checkbox>
        </oj-c-form-layout>
      </div>

      <div>
        <h2 class="oj-typography-subheading-xs">Job Posting Notification</h2>
        <oj-c-form-layout direction="row">
          <oj-c-checkbox>
            Send an email notification whenever a new position matching this
            profile is posted.
          </oj-c-checkbox>
        </oj-c-form-layout>
      </div>

      <div class="oj-flex oj-sm-flex-wrap-wrap oj-sm-gap-2x">
        <oj-c-button chroming="outlined" label="Save Draft" />
        <oj-c-button chroming="callToAction" label="Continue" />
      </div>
    </div>
  );
}
