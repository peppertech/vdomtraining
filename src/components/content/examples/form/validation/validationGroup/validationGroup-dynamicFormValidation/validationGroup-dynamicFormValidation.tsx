import 'oj-c/input-text';
import 'oj-c/select-single';
import 'ojs/ojbutton';
import 'ojs/ojformlayout';
import 'ojs/ojvalidationgroup';
import type { ojValidationGroup } from 'ojs/ojvalidationgroup';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useRef,useState } from 'preact/hooks';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import AsyncRegExpValidator = require('ojs/ojasyncvalidator-regexp');

type InputTextChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-input-text'>['onvalueChanged']>
>[0];
type SelectSingleChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-c-select-single'>['onvalueChanged']>
>[0];
type ValidationGroupValidChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-validation-group'>['onvalidChanged']>
>[0];
type InputTextValue = ComponentProps<'oj-c-input-text'>['value'];
type SelectSingleValue = ComponentProps<'oj-c-select-single'>['value'];
type ButtonActionEvent = Parameters<NonNullable<ComponentProps<'oj-button'>['onojAction']>>[0];
type ValidationGroupValid = ComponentProps<'oj-validation-group'>['valid'];

type ContactTypeOption = {
  value: string;
  label: string;
};

type ContactNumber = {
  type: SelectSingleValue;
  telNumber: InputTextValue;
  id: number;
};

type ContactRowRendererProps = {
  contact: ContactNumber;
  contactDP: ArrayDataProvider<ContactTypeOption['value'], ContactTypeOption>;
  phoneValidators: ComponentProps<'oj-c-input-text'>['validators'];
  onContactTypeChanged: (event: SelectSingleChangedEvent) => void;
  onContactNumberChanged: (event: InputTextChangedEvent) => void;
  onRemoveContactNumber: (event: ButtonActionEvent) => void;
};

const CONTACT_TYPES: ContactTypeOption[] = [
  { value: 'home', label: 'Home' },
  { value: 'cell', label: 'Mobile' },
  { value: 'work', label: 'Work' },
  { value: 'other', label: 'Other' }
];

const renderContactRow = ({
  contact,
  contactDP,
  phoneValidators,
  onContactTypeChanged,
  onContactNumberChanged,
  onRemoveContactNumber
}: ContactRowRendererProps) => (
  <div key={contact.id}>
    <oj-c-select-single
      id={`${contact.id}selectcomp`}
      data-contact-id={String(contact.id)}
      value={contact.type}
      required
      data={contactDP}
      itemText="label"
      labelEdge="inside"
      labelHint="Location"
      onvalueChanged={onContactTypeChanged}
    />
    <oj-c-input-text
      id={`${contact.id}input`}
      data-contact-id={String(contact.id)}
      placeholder="enter 10 digit number"
      value={contact.telNumber}
      validators={phoneValidators}
      labelEdge="inside"
      labelHint="Phone Number"
      class="oj-sm-padding-5x-top oj-sm-padding-2x-bottom"
      onvalueChanged={onContactNumberChanged}
    />
    <oj-button
      data-contact-id={String(contact.id)}
      onojAction={onRemoveContactNumber}
      class="oj-sm-padding-12x-bottom oj-sm-padding-7x-top"
    >
      Remove
    </oj-button>
    <br />
  </div>
);

const getContactId = (target: EventTarget | null): number | null => {
  if (!(target instanceof Element)) {
    return null;
  }

  const id = target.getAttribute('data-contact-id');
  if (!id) {
    return null;
  }

  const parsedId = Number(id);
  return Number.isNaN(parsedId) ? null : parsedId;
};

export const ValidationGroupDynamicFormValidation = () => {
  const trackerRef = useRef<ojValidationGroup | null>(null);
  const nextContactIdRef = useRef(1);
  const [groupValid, setGroupValid] = useState<ValidationGroupValid>('invalidHidden');
  const [contactNumbers, setContactNumbers] = useState<ContactNumber[]>([
    { type: 'home', telNumber: '', id: 0 }
  ]);
  const [firstName, setFirstName] = useState<InputTextValue>('');
  const [lastName, setLastName] = useState<InputTextValue>('');

  const contactNumbersDataProvider = useMemo(
    () => new ArrayDataProvider<ContactNumber['id'], ContactNumber>(contactNumbers, { keyAttributes: 'id' }),
    [contactNumbers]
  );
  const contactDP = useMemo(
    () => new ArrayDataProvider<ContactTypeOption['value'], ContactTypeOption>(CONTACT_TYPES, { keyAttributes: 'value' }),
    []
  );
  const phoneValidators = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '\\d{10}',
        hint: 'enter a ten digit phone number including area code with no spaces or special characters',
        messageSummary: "Value '{value}' Invalid",
        messageDetail: 'You must enter a 10 digit phone number starting with area code.'
      })
    ],
    []
  );
  const nameValidators = useMemo(
    () => [
      new AsyncRegExpValidator({
        pattern: '[a-zA-Z0-9]{3,}',
        hint: '3 or more letters or numbers',
        messageDetail: 'You must enter at least 3 letters or numbers'
      })
    ],
    []
  );

  const handleValidChanged = (event: ValidationGroupValidChangedEvent) => {
    setGroupValid((event.detail.value as ValidationGroupValid));
  };

  const handleAddContactNumber = () => {
    setContactNumbers((currentContactNumbers) => [
      { type: null, telNumber: '', id: nextContactIdRef.current++ },
      ...currentContactNumbers
    ]);
  };

  const handleRemoveContactNumber = (event: ButtonActionEvent) => {
    const contactId = getContactId(event.currentTarget ?? event.target);
    if (contactId === null) {
      return;
    }

    setContactNumbers((currentContactNumbers) =>
      currentContactNumbers.filter((contact) => contact.id !== contactId)
    );
  };

  const handleContactTypeChanged = (event: SelectSingleChangedEvent) => {
    const contactId = getContactId(event.currentTarget ?? event.target);
    if (contactId === null) {
      return;
    }

    const nextType = event.detail.value;
    setContactNumbers((currentContactNumbers) =>
      currentContactNumbers.map((contact) =>
        contact.id === contactId ? { ...contact, type: nextType } : contact
      )
    );
  };

  const handleContactNumberChanged = (event: InputTextChangedEvent) => {
    const contactId = getContactId(event.currentTarget ?? event.target);
    if (contactId === null) {
      return;
    }

    const nextPhoneNumber = event.detail.value ?? '';
    setContactNumbers((currentContactNumbers) =>
      currentContactNumbers.map((contact) =>
        contact.id === contactId ? { ...contact, telNumber: nextPhoneNumber } : contact
      )
    );
  };

  const handleFirstNameChanged = (event: InputTextChangedEvent) => {
    setFirstName((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  const handleLastNameChanged = (event: InputTextChangedEvent) => {
    setLastName((event.detail.value as InputTextValue | null | undefined) ?? '');
  };

  const checkValidationGroup = () => {
    const tracker = trackerRef.current;
    if (!tracker) {
      return false;
    }

    if (tracker.valid === 'valid') {
      return true;
    }

    tracker.showMessages();
    tracker.focusOn('@firstInvalidShown');
    return false;
  };

  const handleCreateNewMember = () => {
    checkValidationGroup();
  };

  return (
    <div id="dynamic-example">
      <oj-validation-group
        ref={trackerRef}
        id="tracker"
        onvalidChanged={handleValidChanged}
      >
        <h4 class="oj-header-border">Contact Numbers</h4>
        <div class="oj-sm-width-2/5">
          {contactNumbers.map((contact) =>
            renderContactRow({
              contact,
              contactDP,
              phoneValidators,
              onContactTypeChanged: handleContactTypeChanged,
              onContactNumberChanged: handleContactNumberChanged,
              onRemoveContactNumber: handleRemoveContactNumber
            })
          )}
        </div>
        <h4 class="oj-header-border">Contact Info</h4>
        <oj-form-layout id="fl2">
          <oj-c-input-text
            id="firstname"
            autocomplete="off"
            required
            placeholder="at least 3 alphanumeric characters"
            validators={nameValidators}
            value={firstName}
            labelHint="First Name"
            onvalueChanged={handleFirstNameChanged}
          />
          <oj-c-input-text
            id="lastname"
            autocomplete="off"
            required
            placeholder="at least 3 alphanumeric characters"
            validators={nameValidators}
            value={lastName}
            labelHint="Last Name"
            onvalueChanged={handleLastNameChanged}
          />
        </oj-form-layout>
      </oj-validation-group>
      <hr />
      <oj-button id="add" onojAction={handleAddContactNumber}>
        Add Contact Number
      </oj-button>
      <oj-button id="create" onojAction={handleCreateNewMember}>
        Create
      </oj-button>
      <span id="namevalid">[oj-validation-group's valid property: {groupValid}]</span>
    </div>
  );
};

export default ValidationGroupDynamicFormValidation;
