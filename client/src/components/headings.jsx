import React from 'react';
import "./headings.scss";

export default function Headings(props) {
    return (
        <>
        <div className="headings">
            <h1 className="title" tabIndex="0">{props.title}</h1>
            <p className="muted" tabIndex="0">{props.text}</p> 
        </div>
       
        </>                                         
    )
}