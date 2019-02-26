import React from 'react';
import "./headings.scss";

export default function Headings(props) {
    return (
        <>
        <div className="headings">
            <h1 className="title">{props.title}</h1>
            <p className="muted">{props.text}</p> 
        </div>
       
        </>
    )
}