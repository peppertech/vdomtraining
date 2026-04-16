import { ComponentProps } from "preact";
import { useState } from "preact/hooks";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import "ojs/ojbutton";
import "ojs/ojcheckboxset";
import "ojs/ojdatetimepicker";
import "ojs/ojformlayout";
import "ojs/ojinputtext";
import "ojs/ojlabel";
import "ojs/ojlabelvalue";
import "ojs/ojoption";
import "ojs/ojradioset";
import "ojs/ojselectsingle";
import "css!./form-layout.css";

type InputTextProps = ComponentProps<"oj-input-text">;
type SelectSingleProps = ComponentProps<"oj-select-single">;
type RadioSetProps = ComponentProps<"oj-radioset">;
type CheckboxSetProps = ComponentProps<"oj-checkboxset">;
type InputDateProps = ComponentProps<"oj-input-date">;

type InputTextValueChangedEvent = Parameters<
  NonNullable<InputTextProps["onvalueChanged"]>
>[0];
type SelectSingleValueChangedEvent = Parameters<
  NonNullable<SelectSingleProps["onvalueChanged"]>
>[0];
type RadioSetValueChangedEvent = Parameters<
  NonNullable<RadioSetProps["onvalueChanged"]>
>[0];
type CheckboxSetValueChangedEvent = Parameters<
  NonNullable<CheckboxSetProps["onvalueChanged"]>
>[0];
type InputDateValueChangedEvent = Parameters<
  NonNullable<InputDateProps["onvalueChanged"]>
>[0];

const stateOptions = new MutableArrayDataProvider(
  [
    { value: "CA", label: "California" },
    { value: "NY", label: "New York" },
    { value: "TX", label: "Texas" },
    { value: "WA", label: "Washington" },
  ],
  { keyAttributes: "value" },
);

const experienceOptions = new MutableArrayDataProvider(
  [
    { value: "0-2", label: "0-2 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "6-9", label: "6-9 years" },
    { value: "10+", label: "10+ years" },
  ],
  { keyAttributes: "value" },
);

const sponsorshipTypeOptions = new MutableArrayDataProvider(
  [
    { value: "h1b", label: "H-1B" },
    { value: "l1", label: "L-1" },
    { value: "f1opt", label: "F-1 OPT" },
    { value: "other", label: "Other" },
  ],
  { keyAttributes: "value" },
);

export const FormLayoutBasic = () => {
  const [firstName, setFirstName] = useState("Avery");
  const [lastName, setLastName] = useState("Johnson");
  const [address, setAddress] = useState("500 Oracle Parkway");
  const [stateVal, setStateVal] = useState("CA");
  const [zip, setZip] = useState("94065");
  const [phone, setPhone] = useState("(650) 555-0147");
  const [email, setEmail] = useState("avery.johnson@example.com");

  const [workAuthorization, setWorkAuthorization] = useState("yes");
  const [sponsorship, setSponsorship] = useState("no");
  const [sponsorshipType, setSponsorshipType] = useState("");
  const [jobTitle, setJobTitle] = useState("Senior UI Engineer");
  const [experience, setExperience] = useState("6-9");
  const [shift, setShift] = useState("Day Shift");
  const [jobType, setJobType] = useState<string[]>(["fulltime", "remote"]);

  const [employer, setEmployer] = useState("Blue Horizon Systems");
  const [position, setPosition] = useState("Frontend Developer");
  const [startDate, setStartDate] = useState("2021-06-01");
  const [endDate, setEndDate] = useState("2026-03-01");
  const [reference, setReference] = useState("Morgan Lee");
  const [description, setDescription] = useState(
    "Led accessibility and design-system modernization across customer-facing enterprise applications.",
  );
  const [employerAddress, setEmployerAddress] = useState(
    "100 Innovation Drive, Redwood City, CA",
  );

  const [agreeVal, setAgreeVal] = useState<string[]>(["agree"]);
  const [sendVal, setSendVal] = useState<string[]>(["send"]);
  const [statusMessage, setStatusMessage] = useState(
    "Draft saved locally in the form state.",
  );
  const [historyCount, setHistoryCount] = useState(1);

  const handleAddMore = () => {
    setHistoryCount((count) => count + 1);
    setStatusMessage("Added another employment history entry placeholder.");
  };

  const handleSaveDraft = () => {
    setStatusMessage("Draft saved. You can continue editing before submission.");
  };

  const handleContinue = () => {
    setStatusMessage("Application moved to the next review step.");
  };

  return (
    <div class="form-layout-demo">
      <div class="form-layout-demo__hero">
        <div>
          <p class="form-layout-demo__eyebrow">Job Application Form</p>
          <h3 class="oj-typography-heading-md oj-sm-margin-0">
            oj-form-layout Job Application
          </h3>
          <p class="oj-typography-body-sm oj-sm-margin-2x-top oj-sm-margin-0-bottom">
            A cookbook-style employment application using nested form layouts,
            generated labels, spanning fields, and grouped actions.
          </p>
        </div>
        <div class="form-layout-demo__status oj-typography-body-sm">
          <strong>Status:</strong> {statusMessage}
        </div>
      </div>

      <section class="form-layout-demo__section">
        <h4 class="oj-typography-heading-sm oj-sm-margin-0">Profile Information</h4>
        <p class="form-layout-demo__subheading">Personal Information</p>
        <oj-form-layout
          id="personal-information"
          direction="row"
          maxColumns={2}
          class="oj-formlayout-full-width"
        >
          <oj-input-text
            id="firstname"
            labelHint="First Name"
            required={true}
            value={firstName}
            onvalueChanged={(event: InputTextValueChangedEvent) =>
              setFirstName(event.detail.value ?? "")
            }
          />
          <oj-input-text
            id="lastname"
            labelHint="Last Name"
            required={true}
            value={lastName}
            onvalueChanged={(event: InputTextValueChangedEvent) =>
              setLastName(event.detail.value ?? "")
            }
          />
          <oj-input-text
            id="address"
            labelHint="Address"
            value={address}
            onvalueChanged={(event: InputTextValueChangedEvent) =>
              setAddress(event.detail.value ?? "")
            }
          />
          <oj-form-layout direction="row" columns={2}>
            <oj-select-single
              id="state"
              labelHint="State"
              data={stateOptions}
              required={true}
              value={stateVal}
              onvalueChanged={(event: SelectSingleValueChangedEvent) =>
                setStateVal((event.detail.value as string) ?? "")
              }
            />
            <oj-input-text
              id="zip"
              labelHint="Zip"
              value={zip}
              onvalueChanged={(event: InputTextValueChangedEvent) =>
                setZip(event.detail.value ?? "")
              }
            />
          </oj-form-layout>
          <oj-input-text
            id="phone"
            labelHint="Phone"
            value={phone}
            onvalueChanged={(event: InputTextValueChangedEvent) =>
              setPhone(event.detail.value ?? "")
            }
          />
          <oj-input-text
            id="email"
            labelHint="Email"
            value={email}
            onvalueChanged={(event: InputTextValueChangedEvent) =>
              setEmail(event.detail.value ?? "")
            }
          />
        </oj-form-layout>
      </section>

      <section class="form-layout-demo__section">
        <h4 class="oj-typography-heading-sm oj-sm-margin-0">Employment</h4>
        <p class="form-layout-demo__subheading">Employment Eligibility</p>
        <oj-form-layout
          id="employment-eligibility"
          direction="row"
          maxColumns={2}
          class="oj-formlayout-full-width"
        >
          <oj-radioset
            id="work-authorization"
            labelHint="Are you authorized to work in the United States?"
            value={workAuthorization}
            onvalueChanged={(event: RadioSetValueChangedEvent) =>
              setWorkAuthorization((event.detail.value as string) ?? "")
            }
          >
            <oj-option value="yes">Yes, I am authorized</oj-option>
            <oj-option value="no">No, I am not authorized</oj-option>
          </oj-radioset>

          <oj-form-layout direction="row" columns={1}>
            <oj-radioset
              id="sponsorship"
              labelHint="Do you require sponsorship for employment visa status?"
              value={sponsorship}
              onvalueChanged={(event: RadioSetValueChangedEvent) =>
                setSponsorship((event.detail.value as string) ?? "")
              }
            >
              <oj-option value="yes">Yes</oj-option>
              <oj-option value="no">No</oj-option>
            </oj-radioset>
            <oj-select-single
              id="sponsorship-type"
              labelHint="Visa Type"
              data={sponsorshipTypeOptions}
              disabled={sponsorship !== "yes"}
              value={sponsorshipType}
              onvalueChanged={(event: SelectSingleValueChangedEvent) =>
                setSponsorshipType((event.detail.value as string) ?? "")
              }
            />
          </oj-form-layout>
        </oj-form-layout>

        <p class="form-layout-demo__subheading">
          Employment Preferences and Conditions
        </p>
        <oj-form-layout
          id="employment-preferences"
          direction="row"
          maxColumns={2}
          class="oj-formlayout-full-width"
        >
          <oj-input-text
            id="job-title"
            labelHint="Job Title"
            value={jobTitle}
            onvalueChanged={(event: InputTextValueChangedEvent) =>
              setJobTitle(event.detail.value ?? "")
            }
          />
          <oj-form-layout direction="row" columns={2}>
            <oj-select-single
              id="experience"
              labelHint="Experience"
              data={experienceOptions}
              value={experience}
              onvalueChanged={(event: SelectSingleValueChangedEvent) =>
                setExperience((event.detail.value as string) ?? "")
              }
            />
            <oj-input-text
              id="shift"
              labelHint="Shift"
              value={shift}
              onvalueChanged={(event: InputTextValueChangedEvent) =>
                setShift(event.detail.value ?? "")
              }
            />
          </oj-form-layout>
          <oj-checkboxset
            id="job-type"
            labelHint="Job Type"
            value={jobType}
            onvalueChanged={(event: CheckboxSetValueChangedEvent) =>
              setJobType((event.detail.value as string[]) ?? [])
            }
          >
            <oj-option value="fulltime">Full-time</oj-option>
            <oj-option value="contract">Contract</oj-option>
            <oj-option value="remote">Remote</oj-option>
            <oj-option value="hybrid">Hybrid</oj-option>
          </oj-checkboxset>
        </oj-form-layout>
      </section>

      <section class="form-layout-demo__section">
        <h4 class="oj-typography-heading-sm oj-sm-margin-0">Employment History</h4>
        <p class="oj-typography-body-sm oj-sm-margin-2x-top">
          List employment starting with your most recent position.
        </p>
        <oj-form-layout
          id="employment-history"
          direction="row"
          maxColumns={2}
          colspanWrap="wrap"
          class="oj-formlayout-full-width"
        >
          <oj-input-text
            id="employer"
            labelHint="Employer Name"
            value={employer}
            onvalueChanged={(event: InputTextValueChangedEvent) =>
              setEmployer(event.detail.value ?? "")
            }
          />
          <oj-input-text
            id="position"
            labelHint="Position/Job Title"
            value={position}
            onvalueChanged={(event: InputTextValueChangedEvent) =>
              setPosition(event.detail.value ?? "")
            }
          />
          <oj-form-layout direction="row" columns={2}>
            <oj-input-date
              id="start-date"
              labelHint="Start Date"
              value={startDate}
              onvalueChanged={(event: InputDateValueChangedEvent) =>
                setStartDate((event.detail.value as string) ?? "")
              }
            />
            <oj-input-date
              id="end-date"
              labelHint="End Date"
              value={endDate}
              onvalueChanged={(event: InputDateValueChangedEvent) =>
                setEndDate((event.detail.value as string) ?? "")
              }
            />
          </oj-form-layout>
          <oj-input-text
            id="reference"
            labelHint="Contact Reference"
            value={reference}
            onvalueChanged={(event: InputTextValueChangedEvent) =>
              setReference(event.detail.value ?? "")
            }
          />

          <oj-label-value colspan={2}>
            <oj-label slot="label" for="description">
              Description
            </oj-label>
            <oj-text-area
              id="description"
              slot="value"
              rows={5}
              value={description}
              onvalueChanged={(event: InputTextValueChangedEvent) =>
                setDescription(event.detail.value ?? "")
              }
            />
          </oj-label-value>

          <oj-label-value colspan={2}>
            <oj-input-text
              id="employer-address"
              slot="value"
              labelHint="Employer Address"
              value={employerAddress}
              onvalueChanged={(event: InputTextValueChangedEvent) =>
                setEmployerAddress(event.detail.value ?? "")
              }
            />
          </oj-label-value>

          <oj-label-value colspan={2}>
            <oj-button slot="value" onojAction={handleAddMore}>
              Add More
            </oj-button>
          </oj-label-value>
        </oj-form-layout>
      </section>

      <section class="form-layout-demo__section">
        <h4 class="oj-typography-heading-sm oj-sm-margin-0">Data Privacy</h4>
        <oj-form-layout direction="row" class="oj-formlayout-full-width">
          <oj-checkboxset
            id="app-details"
            value={agreeVal}
            onvalueChanged={(event: CheckboxSetValueChangedEvent) =>
              setAgreeVal((event.detail.value as string[]) ?? [])
            }
          >
            <oj-option value="agree">
              I agree my application details may be stored in the Oracle Global
              Recruiting database for 24 months.
            </oj-option>
          </oj-checkboxset>
        </oj-form-layout>

        <p class="form-layout-demo__subheading">Job Posting Notification</p>
        <oj-form-layout direction="row" class="oj-formlayout-full-width">
          <oj-checkboxset
            id="notification"
            value={sendVal}
            onvalueChanged={(event: CheckboxSetValueChangedEvent) =>
              setSendVal((event.detail.value as string[]) ?? [])
            }
          >
            <oj-option value="send">
              Send an email notification whenever a new position matching this
              profile is posted.
            </oj-option>
          </oj-checkboxset>
        </oj-form-layout>
      </section>

      <div class="form-layout-demo__actions">
        <oj-button chroming="outlined" onojAction={handleSaveDraft}>
          Save Draft
        </oj-button>
        <oj-button chroming="callToAction" onojAction={handleContinue}>
          Continue
        </oj-button>
      </div>

      <dl class="form-layout-demo__summary oj-typography-body-sm">
        <dt>Applicant</dt>
        <dd>{`${firstName} ${lastName}`}</dd>

        <dt>Preferred Role</dt>
        <dd>{jobTitle}</dd>

        <dt>Work Authorization</dt>
        <dd>{workAuthorization === "yes" ? "Authorized" : "Not authorized"}</dd>

        <dt>History Entries</dt>
        <dd>{historyCount}</dd>

        <dt>Notifications</dt>
        <dd>{sendVal.includes("send") ? "Enabled" : "Disabled"}</dd>
      </dl>
    </div>
  );
};

export default FormLayoutBasic;
