import styled from 'styled-components'

export const SubSection = styled.div<{ width: number, height: number }>`
    display: inline-block;
    width: ${ props => props.width }px;
    height: ${ props => props.height }px;
    line-height: ${ props => props.height }px;
    vertical-align: middle;
    margin: 0;
    padding: 0;
`