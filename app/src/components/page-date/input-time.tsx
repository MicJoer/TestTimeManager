import React, { useState } from 'react';
import { InputTimeWrapper, Label, InputWrapper, TimeInput, StatusMessage } from './input-time.style'
import { Button } from '../shared-styles'

export default function InputTime( props: { cbInputTime: ( fromTime: string, toTime: string ) => void}) {
    const { cbInputTime } = props
    const [fromTime, setFromTime] = useState<string | undefined>(undefined);
    const [toTime, setToTime] = useState<string | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const formSubmit = () => {
        if( fromTime === undefined ) {
            setErrorMessage("From time not set");
            return;
        } 
        if( toTime === undefined ) {
            setErrorMessage("To time not set");
            return;
        }
        if( !validationFromBeforeTo( fromTime, toTime ) ) {
            setErrorMessage("From must be before to")
            return;
        }

        cbInputTime( fromTime, toTime )
    }

    return (
        <InputTimeWrapper>
            <InputWrapper>
                <Label>From:</Label> <TimeInput name="from-time" type="time" onChange={ ( event )=>{  setFromTime(event.target.value) }} />
            </InputWrapper>
            <InputWrapper>
                <Label>To:</Label> <TimeInput name="to-time" type="time" onChange={ ( event )=>{  setToTime(event.target.value) }} />
            </InputWrapper>
            <InputWrapper>
                <Button onClick={formSubmit}>Submit</Button>
            </InputWrapper>
            <InputWrapper>
                <StatusMessage>{errorMessage}</StatusMessage>
            </InputWrapper>
        </InputTimeWrapper>
    )
}

function validationFromBeforeTo( from: string, to: string) {
    const fromTotalMinutes = timeStringToTotalMinutes( from )
    const toTotalMinutes = timeStringToTotalMinutes( to )
    return toTotalMinutes > fromTotalMinutes
}

function timeStringToTotalMinutes( timeString: string ): number {
    const [ hours, minutes ] = timeString.split(':')
    return parseInt( hours ) * 60 + parseInt( minutes )
}