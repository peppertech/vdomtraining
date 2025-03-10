import { ComponentProps } from "preact"
import { useRef, useState } from "preact/hooks"
import "ojs/ojdatetimepicker"
import "ojs/ojinputnumber"
import "ojs/ojformlayout"
import "ojs/ojbutton"
import "ojs/ojinputtext"
import "oj-c/input-text"
import { ojInputNumber } from "ojs/ojinputnumber"
import AsyncNumberRangeValidator = require("ojs/ojasyncvalidator-numberrange")
import { IntlDateTimeConverter } from 'ojs/ojconverter-datetime';
import 'ojs/ojconverterutils-i18n';
type Props = {
    minPage: number,
    maxPage: number,
    onPageChange: (val: number) => void
}

type InputNumberProps = ComponentProps<'oj-input-number'>;
const displayOptions: InputNumberProps["displayOptions"] = { validatorHint: "display", messages: "display" };

const Test5 = (props: Props) => {

    const [page, setPage] = useState<number>(props.minPage);
    const [timeVal, setTimeVal] = useState();
    const [inputVal, setInputVal] = useState<string>();
    const inputRef = useRef(null);

    const timeConverter: IntlDateTimeConverter = new IntlDateTimeConverter({
        formatType: 'time',
        timeFormat: 'short'
    });


    const validators = [
        new AsyncNumberRangeValidator({
            min: props.minPage,
            max: props.maxPage,
            hint: { inRange: `Enter a value between ${props.minPage} and ${props.maxPage}.` }
        })
    ];

    const handlePageInputChange = (event: ojInputNumber.valueChanged) => {

    }

    const validStateHandler = (e: ojInputNumber.validChanged) => {
        console.log('Valid: ', e.detail)

    }

    const updateinputVal = () => {
        setInputVal("something new")
    }

    return (
        <oj-form-layout>
            <oj-input-number
                ref={inputRef}
                style={{ maxWidth: "3.125rem" }}
                value={page}
                userAssistanceDensity={'compact'}
                validators={validators}
                displayOptions={displayOptions}
                onvalidChanged={validStateHandler}
                onvalueChanged={handlePageInputChange}>
            </oj-input-number>
            <oj-c-input-text labelHint={"Testing CorePack"} value={inputVal}></oj-c-input-text>
            <oj-input-text labelHint={"Testing Legacy"} value={inputVal}></oj-input-text>
            <oj-input-time value={timeVal} labelHint="Enter start time" converter={timeConverter}></oj-input-time>
            <oj-button onojAction={updateinputVal}>Update Input Value</oj-button>
        </oj-form-layout>
    )
}
export default Test5
