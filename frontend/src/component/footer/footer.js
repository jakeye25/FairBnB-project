import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';


export default function Footer(){


    return (
        <>
            {/* <h1>Footer</h1> */}
            <div id="footer_wrapper">
                <div id='footer__text'>
                    © 2022 FairBnB, Inc.
                </div>
                <div id='footer__contact'>
                <span id='footer__des'>Contact: </span>
                <NavLink
                to="https://www.linkedin.com/in/jake-ye-a2365250/" >
                    <img className="footer__logo"
                    src='https://img.icons8.com/fluency/452/linkedin-circled.png'
                    alt='linkedin logo'></img>
                    <span>LinkedIn</span>
                </NavLink>
                <NavLink
                to="https://github.com/jakeye25/FairBnB-project">
                    <img className="footer__logo"
                    src='https://img.icons8.com/glyph-neue/452/github.png'
                    alt='github logo'></img>
                    <span>Github</span>
                </NavLink>
                </div>
            </div>
        </>
    )
}
