import styled from 'styled-components'

export const Button = styled.div`
    background-color: #607d8b;
    box-shadow: 0 2px 4px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    height: 36px;
    line-height: 36px;
    vertical-align: middle;
    text-align: center;
    font-family: Roboto;
    font-size: 14px;
    font-weight:bold;
    min-width: 60px;
    width: 0;
    color: #e5e8ea;
    padding-left: 8px;
    padding-right: 8px;
    white-space: nowrap;
    &:hover {
        cursor: pointer;
    }

`