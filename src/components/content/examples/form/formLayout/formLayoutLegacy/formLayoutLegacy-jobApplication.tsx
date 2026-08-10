import "ojs/ojbutton";
import "ojs/ojcheckboxset";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlabelvalue";
import "ojs/ojoption";
import "ojs/ojradioset";
import "ojs/ojselectcombobox";
import "ojs/ojselectsingle";
import 'preact';
import { useMemo,useState } from "preact/hooks";

import {
  createDataProvider,
  experienceOptions,
  sponsorshipTypeOptions,
  stateOptions,
  todayIsoDate,
} from "./formLayoutLegacy-shared";

export default function FormLayoutLegacyJobApplicationExample() {
  const statesProvider = useMemo(() => createDataProvider(stateOptions), []);
  const experienceProvider = useMemo(
    () => createDataProvider(experienceOptions),
    [],
  );
  const sponsorshipTypesProvider = useMemo(
    () => createDataProvider(sponsorshipTypeOptions),
    [],
  );

  const [mode, setMode] = useState<"editable" | "readonly" | "mixed">(
    "editable",
  );
  const readonlyFormControls = mode === "readonly";
  const readonlyPersonalControls = mode !== "editable";
  const [stateVal, setStateVal] = useState("CA");
  const [employmentVal, setEmploymentVal] = useState("yes");
  const [sponsorshipVal, setSponsorshipVal] = useState("no");
  const [sponsorshipTypeVal, setSponsorshipTypeVal] = useState("");
  const [experienceVal, setExperienceVal] = useState("fiveten");
  const sponsorshipTypeDisabled = sponsorshipVal !== "yes";

  return (
    <div id="form-container" class="oj-flex oj-sm-flex-direction-column oj-sm-gap-4x">
      <div class="oj-panel oj-bg-info-30 oj-sm-margin-4x-bottom">
        <oj-form-layout maxColumns={3} direction="row">
          <oj-radioset
            labelHint="State"
            value={mode}
            onvalueChanged={(event) => {
              setMode(String(event.detail.value) as "editable" | "readonly" | "mixed");
            }}
          >
            <oj-option value="editable">Editable</oj-option>
            <oj-option value="readonly">Read Only</oj-option>
            <oj-option value="mixed">Mixed</oj-option>
          </oj-radioset>
        </oj-form-layout>
      </div>

      <div>
        <h1 class="oj-typography-heading-xs">Profile Information</h1>
        <h2 class="oj-typography-subheading-xs">Personal Information</h2>
        <oj-form-layout direction="row" maxColumns={2}>
          <oj-input-text
            labelHint="First Name"
            required={true}
            readonly={readonlyFormControls}
            value={readonlyFormControls ? "Christine" : ""}
          />
          <oj-input-text
            labelHint="Last Name"
            required={true}
            readonly={readonlyFormControls}
            value={readonlyFormControls ? "Cooper" : ""}
          />
          <oj-input-text
            labelHint="Address"
            readonly={readonlyFormControls}
            value={readonlyFormControls ? "123 Strasser Rd, San Francisco" : ""}
          />
          <oj-form-layout direction="row" columns={2}>
            <oj-select-single
              labelHint="State"
              value={stateVal}
              data={statesProvider}
              required={true}
              readonly={readonlyPersonalControls}
              onvalueChanged={(event) => {
                setStateVal(String(event.detail.value ?? ""));
              }}
            />
            <oj-input-text
              labelHint="Zip"
              readonly={readonlyFormControls}
              value={readonlyFormControls ? "94014" : ""}
            />
          </oj-form-layout>
          <oj-input-text
            labelHint="Phone"
            readonly={readonlyFormControls}
            value={readonlyFormControls ? "+1 (202) 123-2234" : ""}
          />
          <oj-input-text
            labelHint="Email"
            readonly={readonlyFormControls}
            value={readonlyFormControls ? "christine.cooper@inspire.com" : ""}
          />
        </oj-form-layout>
      </div>

      <div>
        <h1 class="oj-typography-heading-xs">Employment</h1>
        <h2 class="oj-typography-subheading-xs">Employment Eligibility</h2>
        <oj-form-layout direction="row" maxColumns={2}>
          <oj-radioset
            labelHint="Are you authorized to work in the United States?"
            value={employmentVal}
            readonly={readonlyFormControls}
            onvalueChanged={(event) => {
              setEmploymentVal(String(event.detail.value ?? ""));
            }}
          >
            <oj-option value="yes">Yes, I am authorized</oj-option>
            <oj-option value="no">No, I am not authorized</oj-option>
          </oj-radioset>

          <oj-form-layout direction="column">
            <oj-radioset
              labelHint="Do you require sponsorship for employment visa status?"
              value={sponsorshipVal}
              readonly={readonlyFormControls}
              onvalueChanged={(event) => {
                const next = String(event.detail.value ?? "");
                setSponsorshipVal(next);
                if (next !== "yes") {
                  setSponsorshipTypeVal("");
                }
              }}
            >
              <oj-option value="yes">Yes</oj-option>
              <oj-option value="no">No</oj-option>
            </oj-radioset>
            <oj-combobox-one
              labelHint="Visa Type"
              options={sponsorshipTypesProvider}
              value={sponsorshipTypeVal}
              disabled={sponsorshipTypeDisabled}
              readonly={readonlyFormControls}
              onvalueChanged={(event) => {
                setSponsorshipTypeVal(String(event.detail.value ?? ""));
              }}
            />
          </oj-form-layout>
        </oj-form-layout>

        <h2 class="oj-typography-subheading-xs">Employment Preferences and Conditions</h2>
        <oj-form-layout direction="row" maxColumns={2}>
          <oj-input-text
            labelHint="Job Title"
            readonly={readonlyFormControls}
            value={readonlyFormControls ? "Sr. Marketing Specialist" : ""}
          />
          <oj-form-layout direction="row" columns={2}>
            <oj-select-single
              labelHint="Experience"
              data={experienceProvider}
              value={experienceVal}
              readonly={readonlyFormControls}
              onvalueChanged={(event) => {
                setExperienceVal(String(event.detail.value ?? ""));
              }}
            />
            <oj-input-text
              labelHint="Shift"
              readonly={readonlyFormControls}
              value={readonlyFormControls ? "Day Shift" : ""}
            />
          </oj-form-layout>
          <oj-checkboxset readonly={readonlyFormControls} labelHint="Job Type" value={["regular"]}>
            <oj-option value="regular">Regular Employee</oj-option>
            <oj-option value="temporary">Temporary Employee</oj-option>
            <oj-option value="student">Student/Intern</oj-option>
            <oj-option value="contractor">Contractor</oj-option>
          </oj-checkboxset>
        </oj-form-layout>
      </div>

      <div>
        <h2 class="oj-typography-subheading-xs">Employment History</h2>
        <p>List employment starting with your most recent position.</p>
        <oj-form-layout direction="row" maxColumns={2} colspanWrap="wrap">
          <oj-input-text
            labelHint="Employer Name"
            readonly={readonlyFormControls}
            value={readonlyFormControls ? "Oracle Inc" : ""}
          />
          <oj-input-text
            labelHint="Position/Job Title"
            readonly={readonlyFormControls}
            value={readonlyFormControls ? "Marketing Consultant" : ""}
          />
          <oj-form-layout direction="row" columns={2}>
            <oj-input-date
              labelHint="Start Date"
              readonly={readonlyFormControls}
              value={todayIsoDate}
            />
            <oj-input-date
              labelHint="End Date"
              readonly={readonlyFormControls}
              value={todayIsoDate}
            />
          </oj-form-layout>
          <oj-input-text
            labelHint="Contact Reference"
            readonly={readonlyFormControls}
            value={readonlyFormControls ? "Jacob Watts" : ""}
          />
          <oj-label-value colspan={2}>
            <oj-text-area
              slot="value"
              labelHint="Description"
              rows={6}
              readonly={readonlyFormControls}
              value={
                readonlyFormControls
                  ? "To understand analysis and what motivates consumers and how to put strategies in place to improve business."
                  : ""
              }
            />
          </oj-label-value>
          <oj-label-value colspan={2}>
            <oj-input-text
              slot="value"
              labelHint="Employer Address"
              readonly={readonlyFormControls}
              value={readonlyFormControls ? "5000 Martin St, San Francisco CA 94016" : ""}
            />
          </oj-label-value>
          <oj-label-value colspan={2}>
            <oj-button
              slot="value"
              disabled={readonlyFormControls}
              onojAction={() => {
                window.alert("Button is not functional, demo is to show layout only");
              }}
            >
              Add More
            </oj-button>
          </oj-label-value>
        </oj-form-layout>
      </div>

      <div>
        <h1 class="oj-typography-heading-xs">Data Privacy</h1>
        <oj-form-layout direction="row">
          <oj-checkboxset readonly={readonlyFormControls} value={["agree"]}>
            <oj-option value="agree">
              I agree my application details may be stored in the Oracle Global Recruiting database for 24 months.
            </oj-option>
          </oj-checkboxset>
        </oj-form-layout>
      </div>

      <div>
        <h2 class="oj-typography-subheading-xs">Job Posting Notification</h2>
        <oj-form-layout direction="row">
          <oj-checkboxset readonly={readonlyFormControls} value={["send"]}>
            <oj-option value="send">
              Send an email notification whenever a new position matching this profile is posted.
            </oj-option>
          </oj-checkboxset>
        </oj-form-layout>
        <div
          class="oj-flex oj-sm-flex-wrap-wrap oj-sm-margin-2x-top"
          style={{ gap: "1rem" }}
        >
          <oj-button chroming="outlined">Save Draft</oj-button>
          <oj-button chroming="callToAction">Continue</oj-button>
        </div>
      </div>
    </div>
  );
}
