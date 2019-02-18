import React from 'react';
import "./app_header.scss";

export default function AppHeader(props) {
    return (
        <header className="flex_r_nowrap align_center justify_start">
            <div className="branding flex_r_nowrap align-center flex_auto">
                <span className="image">
                    <img src="./assets/images/goggles.svg" alt="Logo"/>
                </span>
                <span className="app_name">
                    <span>ConvertWatch</span>
                </span>
            </div>
            <div className="spacer"></div>
            <div className="flex_r_nowrap align-center">
                <button className="outline_navi btn">
                    ABOUT
                </button>
            </div>
        </header>
    )
}