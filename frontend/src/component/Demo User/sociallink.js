import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import {ImMail2} from "react-icons/im";

import "./sociallinks.css"

const SocialLinks = () => {

    return (
        <>
            <div className="top-to-btm">
                <a
                    className="more_info_text"
                    href="https://www.linkedin.com/in/jake-ye-a2365250/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin  className="icon-position icon-style"/>
                </a>
            </div>
            <div className="top-to-btm">
                <a
                    className="more_info_text"
                    href="https://github.com/jakeye25"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaGithub  className="icon-position icon-style" />
                </a>
            </div>
            <div className="top-to-btm">
                <a
                    className="email_link"
                    href="mailto:kebonkim@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ImMail2 className="icon-position icon-style"/>
                </a>
            </div>
        </>
    )
}

export default SocialLinks
