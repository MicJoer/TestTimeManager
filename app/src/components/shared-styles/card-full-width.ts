import styled from 'styled-components'

export const CardFullWidth = styled.div<{clickable: boolean}>`
    background-color: #e5e8ea;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding: 12px;
    margin-top: 6px;
    margin-bottom: 6px;
    ${ props => props.clickable ? `&:hover { cursor: pointer; background-color: #c3c7ca; }` : '' }
`