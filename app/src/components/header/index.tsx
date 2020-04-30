import React from "react";
import {
    TopBar,
    CenteredContent,
    Logo,
    LogoWrapper,
    LogoTitle,
    Navigation,
    NavigationItem
} from "./index.style";
import LogoSrc from "./images/logo-time.svg";

export default function header() {
    return (
        <TopBar>
            <CenteredContent>
                <LogoWrapper>
                    <Logo src={LogoSrc} />
                    <LogoTitle>Time Manager</LogoTitle>
                </LogoWrapper>
                <Navigation>
                    <NavigationItem href="/">OVERVIEW</NavigationItem>
                    <NavigationItem href="/">ABOUT US</NavigationItem>
                    <NavigationItem href="/">CONTACT US</NavigationItem>
                </Navigation>
            </CenteredContent>
        </TopBar>
    );
}
