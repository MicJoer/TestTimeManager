import styled from 'styled-components'

const topBarHeight = 48;

export const TopBar = styled.div`
    width: 100%;
    height: ${topBarHeight}px;
    background-color: #5d7fa2;
    margin: 0;
`

export const CenteredContent = styled.div`
    width: 100%;
    max-width: 920px;
    height: ${topBarHeight}px;
    float: center;
    margin-left: auto;
    margin-right: auto;
`

const logoClearance = 4;

export const LogoWrapper = styled.div`
    display: inline-block;
    height: ${topBarHeight}px;
    width: 220px;
    vertical-align: top;
`

export const Logo = styled.img`
    display: inline-block;
    height: ${topBarHeight - 2 * logoClearance}px;
    margin-top: ${logoClearance}px;
    margin-bottom: ${logoClearance}px;
    vertical-align: top;
`

export const LogoTitle = styled.div`
    display: inline-block;
    margin-left: 10px;
    height: ${topBarHeight}px;
    line-height: ${topBarHeight}px;
    color: #e5e8ea;
    font-family: Roboto;
    font-weight: 300;
    vertical-align: top;
    font-size: 22px;

`

export const Navigation = styled.div`
    display: inline-block;
    height: ${topBarHeight}px;
    line-height: ${topBarHeight}px;
    vertical-align: top;

`

export const NavigationItem = styled.a`
    display: inline-block;
    margin-left: 16px;
    height: ${topBarHeight}px;
    line-height: ${topBarHeight}px;
    color: #e5e8ea;
    font-family: Roboto;
    font-size: 16px;
`