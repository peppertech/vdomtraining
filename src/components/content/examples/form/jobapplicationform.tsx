/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import { h } from 'preact';
import { useState, useCallback, useMemo } from 'preact/hooks';
import { IntlConverterUtils } from 'ojs/ojconverterutils-i18n';
import 'ojs/ojconverterutils-i18n';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import 'ojs/ojvalidation-base';
import 'ojs/ojdatetimepicker';
import 'ojs/ojtimezonedata';
import 'ojs/ojbutton';
import 'ojs/ojinputtext';
import 'ojs/ojlabelvalue';
import 'ojs/ojradioset';
import 'ojs/ojcheckboxset';
import 'ojs/ojselectcombobox';
import 'ojs/ojselectsingle';
import 'ojs/ojformlayout';

interface Datatype {
  firstname: string;
  lastname: string;
  address: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  job: string;
  experience: string;
  shift: string;
  country: string;
  employerName: string;
  position: string;
  startDate: string;
  endDate: string;
  reference: string;
  description: string;
  employerAddress: string;
  sponsorship: string[];
  sponsorshipType: string;
  employment: string;
}

export const JobApplicationForm = () => {
  const [formState, setFormState] = useState<'editable' | 'readonly' | 'mixed'>('editable');
  const [sendVal, setSendVal] = useState<string[]>(['']);
  const [agreeVal, setAgreeVal] = useState<string[]>(['']);
  const [sponsorshipVal, setSponsorshipVal] = useState<string[]>(['']);
  const [sponsorshipTypeVal, setSponsorshipTypeVal] = useState<string>('');
  const [sponsorshipTypeDisabled, setSponsorshipTypeDisabled] = useState(true);
  const [sponsorshipTypeReadOnly, setSponsorshipTypeReadOnly] = useState(true);
  const [employmentVal, setEmploymentVal] = useState<string>('');
  const [stateVal, setStateVal] = useState<string>('');
  const [expVal, setExpVal] = useState<string>('');
  const [jobTypeVal, setJobTypeVal] = useState<string[]>(['regular']);
  const [startDate, setStartDate] = useState(IntlConverterUtils.dateToLocalIsoDateString(new Date()));
  const [endDate, setEndDate] = useState(IntlConverterUtils.dateToLocalIsoDateString(new Date()));

  const [employee] = useState<Datatype>({
    firstname: 'Christine',
    lastname: 'Cooper',
    address: '123 Strasser Rd, San Francisco',
    state: 'CA',
    zip: '94014',
    phone: '+1 (202) 123-2234',
    email: 'christine.cooper@inspire.com',
    job: 'Sr. Marketing Specialist',
    experience: 'fiveten',
    shift: 'Day Shift',
    country: 'United States',
    employerName: 'Oracle Inc',
    position: 'Marketing Consultant',
    startDate: IntlConverterUtils.dateToLocalIsoDateString(new Date(2014, 1, 1)),
    endDate: IntlConverterUtils.dateToLocalIsoDateString(new Date(2019, 1, 3)),
    reference: 'Jacob Watts',
    description: 'To understand analysis and what motivates consumers and how to put strategies in place to improve business',
    employerAddress: '5000, Martin St, San Francisco CA 94016',
    sponsorship: ['yes'],
    sponsorshipType: 'H-1B',
    employment: 'yes'
  });

  // Computed readonly states
  const readonlyFormControlsPersonal = useMemo(() => {
    return formState !== 'editable';
  }, [formState]);

  const readonlyFormControls = useMemo(() => {
    if (formState === 'readonly') {
      setSendVal(['send']);
      setAgreeVal(['agree']);
      setSponsorshipVal(employee.sponsorship);
      setSponsorshipTypeVal(employee.sponsorshipType);
      setSponsorshipTypeDisabled(false);
      setSponsorshipTypeReadOnly(true);
      setEmploymentVal(employee.employment);
      setStateVal(employee.state);
      setExpVal(employee.experience);
      return true;
    } else {
      if (formState === 'mixed') {
        setStateVal(employee.state);
      } else {
        setStateVal('');
      }
      setSendVal(['']);
      setAgreeVal(['']);
      setSponsorshipVal(['']);
      setSponsorshipTypeVal('');
      setEmploymentVal('');
      setSponsorshipTypeDisabled(true);
      setSponsorshipTypeReadOnly(false);
      setExpVal('');
      return false;
    }
  }, [formState, employee]);

  // Data providers
  const experienceArray = useMemo(
    () => [
      { value: 'lessthanone', label: 'Less than 1 year' },
      { value: 'onefive', label: 'Between 1 and 5 years' },
      { value: 'fiveten', label: 'Between 5 and 10 years' },
      { value: 'tenfifteen', label: 'Between 10 and 15 Years' },
      { value: 'fifteentwenty', label: 'Between 15 and 20 Years' },
      { value: 'more20', label: 'More than 20 Years' }
    ],
    []
  );
  const expDP = useMemo(() => new ArrayDataProvider(experienceArray, { keyAttributes: 'value' }), [experienceArray]);

  const statesArray = useMemo(
    () => [
      { value: 'AL', label: 'AL' },
      { value: 'AK', label: 'AK' },
      { value: 'AR', label: 'AR' },
      { value: 'AZ', label: 'AZ' },
      { value: 'CA', label: 'CA' },
      { value: 'CO', label: 'CO' },
      { value: 'CT', label: 'CT' },
      { value: 'DC', label: 'DC' },
      { value: 'DE', label: 'DE' },
      { value: 'FL', label: 'FL' },
      { value: 'GA', label: 'GA' },
      { value: 'HI', label: 'HI' },
      { value: 'IA', label: 'IA' },
      { value: 'ID', label: 'ID' },
      { value: 'IL', label: 'IL' },
      { value: 'IN', label: 'IN' },
      { value: 'KS', label: 'KS' },
      { value: 'KY', label: 'KY' },
      { value: 'LA', label: 'LA' },
      { value: 'MA', label: 'MA' },
      { value: 'MD', label: 'MD' },
      { value: 'ME', label: 'ME' },
      { value: 'MI', label: 'MI' },
      { value: 'MN', label: 'MN' },
      { value: 'MO', label: 'MO' },
      { value: 'MS', label: 'MS' },
      { value: 'MT', label: 'MT' },
      { value: 'NC', label: 'NC' },
      { value: 'NE', label: 'NE' },
      { value: 'NH', label: 'NH' },
      { value: 'NJ', label: 'NJ' },
      { value: 'NM', label: 'NM' },
      { value: 'NV', label: 'NV' },
      { value: 'NY', label: 'NY' },
      { value: 'ND', label: 'ND' },
      { value: 'OH', label: 'OH' },
      { value: 'OK', label: 'OK' },
      { value: 'OR', label: 'OR' },
      { value: 'PA', label: 'PA' },
      { value: 'RI', label: 'RI' },
      { value: 'SC', label: 'SC' },
      { value: 'SD', label: 'SD' },
      { value: 'TN', label: 'TN' },
      { value: 'TX', label: 'TX' },
      { value: 'UT', label: 'UT' },
      { value: 'VT', label: 'VT' },
      { value: 'VA', label: 'VA' },
      { value: 'WA', label: 'WA' },
      { value: 'WI', label: 'WI' },
      { value: 'WV', label: 'WV' },
      { value: 'WY', label: 'WY' }
    ],
    []
  );
  const statesDP = useMemo(() => new ArrayDataProvider(statesArray, { keyAttributes: 'value' }), [statesArray]);

  const jobTypeArray = useMemo(
    () => [
      { value: 'ns', label: 'Not Specified' },
      { value: 'regular', label: 'Regular Employee' },
      { value: 'temporary', label: 'Temporary Employee' },
      { value: 'student', label: 'Student/Intern' },
      { value: 'contractor', label: 'Contractor' }
    ],
    []
  );
  const jobTypeDP = useMemo(() => new ArrayDataProvider(jobTypeArray, { keyAttributes: 'value' }), [jobTypeArray]);

  const sponsorshipOptionsArray = useMemo(
    () => [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' }
    ],
    []
  );
  const sponsorshipOptionsDP = useMemo(
    () => new ArrayDataProvider(sponsorshipOptionsArray, { keyAttributes: 'value' }),
    [sponsorshipOptionsArray]
  );

  const sponsorshipTypesArray = useMemo(
    () => [
      { value: 'H-1B', label: 'H-1B' },
      { value: 'L-1B', label: 'L-1B' },
      { value: 'O-1', label: 'O-1' },
      { value: 'TN', label: 'TN' }
    ],
    []
  );
  const sponsorshipTypesDP = useMemo(
    () => new ArrayDataProvider(sponsorshipTypesArray, { keyAttributes: 'value' }),
    [sponsorshipTypesArray]
  );

  const buttonClick = useCallback(() => {
    alert('Button is not functional, demo is to show layout only');
  }, []);

  const handleSponsorshipChange = useCallback((event: any) => {
    const value = event.detail.value;
    if (value === 'no') {
      setSponsorshipTypeDisabled(true);
      setSponsorshipTypeVal('');
      setSponsorshipVal(['no']);
    } else if (value === 'yes') {
      setSponsorshipTypeDisabled(false);
      setSponsorshipVal(['yes']);
    }
  }, []);

  return (
    <div class="oj-sm-padding-4x">
      <h3 class="oj-typography-heading-sm">Job Application Form</h3>

      <div class="oj-sm-margin-bottom-2x">
        <oj-button onojAction={() => setFormState('editable')}>Editable</oj-button>
        <oj-button onojAction={() => setFormState('readonly')} class="oj-sm-margin-start-1x">
          ReadOnly
        </oj-button>
        <oj-button onojAction={() => setFormState('mixed')} class="oj-sm-margin-start-1x">
          Mixed
        </oj-button>
      </div>

      {/* Personal Information Section */}
      <h4 class="oj-typography-heading-xs oj-sm-margin-top-2x oj-sm-margin-bottom-1x">Personal Information</h4>
      <oj-form-layout maxColumns={3} labelEdge="top" direction="row" class="oj-sm-margin-bottom-2x">
        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text
            labelHint="First Name"
            value={employee.firstname}
            readonly={readonlyFormControlsPersonal}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text
            labelHint="Last Name"
            value={employee.lastname}
            readonly={readonlyFormControlsPersonal}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text
            labelHint="Address"
            value={employee.address}
            readonly={readonlyFormControlsPersonal}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text labelHint="Zip" value={employee.zip} readonly={readonlyFormControlsPersonal} />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text labelHint="Phone" value={employee.phone} readonly={readonlyFormControlsPersonal} />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text labelHint="Email" value={employee.email} readonly={readonlyFormControlsPersonal} />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-select-single
            labelHint="State"
            value={stateVal}
            data={statesDP}
            readonly={readonlyFormControls}
            itemText={(itemContext: any) => itemContext.data.label}
          />
        </div>
      </oj-form-layout>

      {/* Employment Information Section */}
      <h4 class="oj-typography-heading-xs oj-sm-margin-top-2x oj-sm-margin-bottom-1x">Employment Information</h4>
      <oj-form-layout maxColumns={3} labelEdge="top" direction="row" class="oj-sm-margin-bottom-2x">
        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text
            labelHint="Job Title"
            value={employee.job}
            readonly={readonlyFormControls}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text
            labelHint="Shift"
            value={employee.shift}
            readonly={readonlyFormControls}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-select-single
            labelHint="Experience"
            value={expVal}
            data={expDP}
            readonly={readonlyFormControls}
            itemText={(itemContext: any) => itemContext.data.label}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-radioset
            labelHint="Employment Type"
            value={jobTypeVal}
            options={jobTypeDP}
            readonly={readonlyFormControls}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-checkboxset
            labelHint="Sponsorship"
            value={sponsorshipVal}
            onvalueChanged={handleSponsorshipChange}
            readonly={readonlyFormControls}
            options={sponsorshipOptionsDP}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-select-single
            labelHint="Sponsorship Type"
            value={sponsorshipTypeVal}
            data={sponsorshipTypesDP}
            disabled={sponsorshipTypeDisabled}
            readonly={sponsorshipTypeReadOnly}
            itemText={(itemContext: any) => itemContext.data.label}
          />
        </div>
      </oj-form-layout>

      {/* Previous Employment Section */}
      <h4 class="oj-typography-heading-xs oj-sm-margin-top-2x oj-sm-margin-bottom-1x">Previous Employment</h4>
      <oj-form-layout maxColumns={3} labelEdge="top" direction="row" class="oj-sm-margin-bottom-2x">
        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text
            labelHint="Employer Name"
            value={employee.employerName}
            readonly={readonlyFormControls}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text
            labelHint="Position"
            value={employee.position}
            readonly={readonlyFormControls}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text
            labelHint="Employer Address"
            value={employee.employerAddress}
            readonly={readonlyFormControls}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-date-time
            labelHint="Start Date"
            value={startDate}
            readonly={readonlyFormControls}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-date-time
            labelHint="End Date"
            value={endDate}
            readonly={readonlyFormControls}
          />
        </div>
      </oj-form-layout>

      {/* References and Description Section */}
      <h4 class="oj-typography-heading-xs oj-sm-margin-top-2x oj-sm-margin-bottom-1x">Additional Information</h4>
      <oj-form-layout maxColumns={3} labelEdge="top" direction="row" class="oj-sm-margin-bottom-2x">
        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text
            labelHint="Reference"
            value={employee.reference}
            readonly={readonlyFormControls}
          />
        </div>

        <div class="oj-sm-margin-bottom-2x">
          <oj-input-text
            labelHint="Description"
            value={employee.description}
            readonly={readonlyFormControls}
          />
        </div>
      </oj-form-layout>

      {/* Buttons */}
      <div class="oj-sm-margin-top-2x">
        <oj-button  chroming="outlined" onojAction={buttonClick}>Save Draft</oj-button>
        <oj-button   chroming="callToAction" onojAction={buttonClick} class="oj-sm-margin-start-1x">
          Continue
        </oj-button>
      </div>
    </div>
  );
};
