import React from "react";
import classes from './StickyNavbar.module.css'

const StickyNavbar = () => {
    return (
        <nav className={classes.styckynav}>
            <ul>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">FAQ</a>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
            </ul>
        </nav>
    )
}

export default StickyNavbar;