import "preact"
import { useState } from 'preact/hooks';
import "oj-c/form-layout";
import "oj-c/input-text";


/* This code came from an AI generation.  It should not have inline event handlers */

export const Test7 = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    return (
        <>
            <h2>Test7 Content</h2>
            <oj-c-form-layout>
                <oj-c-input-text
                    labelHint="First Name"
                    value={firstName}
                    onvalueChanged={(event: any) => setFirstName(event.detail.value)}
                ></oj-c-input-text>
                <oj-c-input-text
                    labelHint="Last Name"
                    value={lastName}
                    onvalueChanged={(event: any) => setLastName(event.detail.value)}
                ></oj-c-input-text>
                <oj-c-input-text
                    labelHint="Date of Birth"
                    value={dateOfBirth}
                    onvalueChanged={(event: any) => setDateOfBirth(event.detail.value)}
                ></oj-c-input-text>
            </oj-c-form-layout>
        </>

    );
};

export default Test7;