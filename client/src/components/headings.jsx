import React from 'react'

export default function Headings(props) {
    return (
        <>
            <h1 className="title">{props.title}</h1>
            <p className="muted">{props.text}</p>        
        </>
    )
}