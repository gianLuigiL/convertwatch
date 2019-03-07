//Base dependencies
import React from 'react';
//Styles
import "./app_header.scss";
//Components
import { NavLink } from "react-router-dom";

export default function AppHeader(props) {
    return (
        <header className="flex_r_nowrap align_center justify_start">
            <div className="branding">
                {/* Go to home */}
                <NavLink to="/" className="flex_r_nowrap align-center flex_auto" tabIndex="0">
                    <span className="image">
                        <img src="./assets/images/goggles.svg" alt="Logo of goggles"/>
                    </span>
                    <span className="app_name flex_r_nowrap align_center">
                        <span>ConvertWatch</span>
                    </span>            
                </NavLink>
            </div>
            <div className="spacer"></div>
            <div className="flex_r_nowrap align-center">
                {/* Display about button when not on home */}
                {window.location.pathname !== "/" ? <NavLink to="/about" className="outline_contrast btn" tabIndex="0">
                    ABOUT
                </NavLink> :
                ""
                }
            </div>
        </header>
    )
}