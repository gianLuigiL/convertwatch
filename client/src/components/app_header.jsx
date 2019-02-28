import React from 'react';
import { NavLink } from "react-router-dom";
import "./app_header.scss";

export default function AppHeader(props) {
    return (
        <header className="flex_r_nowrap align_center justify_start">
            <div className="branding">
                <NavLink to="/" className="flex_r_nowrap align-center flex_auto">
                    <span className="image">
                        <img src="./assets/images/goggles.svg" alt="Logo"/>
                    </span>
                    <span className="app_name flex_r_nowrap align_center">
                        <span>ConvertWatch</span>
                    </span>            
                </NavLink>
            </div>
            <div className="spacer"></div>
            <div className="flex_r_nowrap align-center">
                <button className="outline_contrast btn">
                    ABOUT
                </button>
            </div>
        </header>
    )
}