import "preact"
import { useState, useRef } from 'preact/hooks';
import "oj-c/form-layout";
import "oj-c/input-text";
import "oj-c/select-single";
import "oj-c/button";
import "oj-c/checkboxset";
import MutableArrayDataProvider = require("ojs/ojmutablearraydataprovider");
import { CSelectSingleElement } from "oj-c/select-single";


/* This code came from an AI generation.  It should not have inline event handlers */

type Browser = {
    value:string,
    label:string
}


const browsers = [
    { value: 'IE', label: 'Internet Explorer' },
    { value: 'FF', label: 'Firefox' },
    { value: 'CH', label: 'Chrome' },
    { value: 'OP', label: 'Opera' },
    { value: 'SA', label: 'Safari' },
];
const browsersDP = new MutableArrayDataProvider(browsers, {
    keyAttributes: 'value',
});


export const Test7 = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    // const selectedItem = useRef(null);
    // const selectRef = useRef(null)

    const defaultItem = { key: "CH", data: browsers[0] };
    const [selectedItem, setSelectedItem] = useState<typeof defaultItem | null>(defaultItem);
    const [valueItem, setValueItem] = useState<typeof defaultItem | null>(defaultItem);

    const clearSelect = () => {
        setSelectedItem(null);
    }


    const valueChangeHandler = () => {
        console.log('value changed')
    }
    const options = [
        { value: 'safari', label: 'Safari' },
        { value: 'edge', label: 'Edge' },
        {
            value: 'chrome',
            label: 'Chrome',
            assistiveText: 'More Info',
            helpSourceLink: 'http://oracle.com',
            helpSourceText: 'help link'
        },
        { value: 'firefox', label: 'Firefox' }
    ];

const itemTemplateRenderer = (itemCtx:CSelectSingleElement.ItemTemplateContext<Browser['value'],Browser>) => {
    return (
        <div>
            {itemCtx.item.data.label};
        </div>
    )
}

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

                <oj-c-select-single
                    id="selectTest2"
                    labelHint="Browsers"
                    data={browsersDP}
                    itemText="label"
                    valueItem={selectedItem}
                    onvalueChanged={valueChangeHandler}>
                        <template slot="itemTemplate" render={itemTemplateRenderer}></template>
                </oj-c-select-single>
                <oj-c-button label="Clear selection" onojAction={clearSelect}></oj-c-button>

                {/* never user inline methods as shown below */}
                <oj-c-select-single
                    data={browsersDP}
                    valueItem={valueItem}
                    itemText="label"
                    labelHint="Browser"
                    required={true}
                    onvalueChanged={(e) => console.log("Value changed from", e.detail.updatedFrom)}
                    onvalueItemChanged={(e) => {
                        if (e.detail.updatedFrom === "internal") {
                            setValueItem(e.detail.value ?? null);
                        }
                    }}
                    onvalidChanged={(e) => {
                        console.log("VALID:", e.detail.value);
                    }}
                />
                <oj-button label={"Clear"} onojAction={() => setValueItem(null)} />
                <oj-c-checkboxset
                    id="enabledCheckboxset"
                    value={["chrome", "edge"]}
                    options={options}
                    labelHint="Enabled"></oj-c-checkboxset>
            </oj-c-form-layout>
        </>

    );
};

export default Test7;