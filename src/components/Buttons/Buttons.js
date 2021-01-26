import React from 'react'

export default function Buttons(props) {
    return (
        <button onClick={props.click} className={props.class} disabled={props.disable}>{props.children}</button>
    )
}
