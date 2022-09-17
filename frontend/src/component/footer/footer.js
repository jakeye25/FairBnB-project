import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';


export default function Footer(){


    return (
        <>
            {/* <h1>Footer</h1> */}
            <div id="footer_wrapper">
                <p id='footer__text'>
                    © 2022 Fairbnb, Inc.
                </p>
                <span>Contact: </span>
            <NavLink
            className="footer__logo"
            to="https://www.linkedin.com/in/jake-ye-a2365250/" >
                <img src='https://img.icons8.com/fluency/452/linkedin-circled.png'
                alt='linkedin logo'></img>
                <span>LinkedIn</span>
            </NavLink>
            <NavLink
                className="footer__logo"
            to="https://github.com/jakeye25/FairBnB-project">
                <img src='https://img.icons8.com/glyph-neue/452/github.png'
                alt='github logo'></img>
                <span>Github</span>
            </NavLink>
            </div>
        </>
    )
}
