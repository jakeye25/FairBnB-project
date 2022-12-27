import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import {ImMail2} from "react-icons/im";
import {TiSocialLinkedin} from "react-icons/ti";
import {FiGithub} from "react-icons/fi";
import {AiOutlineMail} from "react-icons/ai"
import "./sociallinks.css"

const SocialLinks = () => {

    return (
        <div className="sociallinks-container">
            <div className="top-to-btm">
                <a
                    className="more_info_text"
                    href="https://www.linkedin.com/in/jake-ye-a2365250/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <TiSocialLinkedin  className="icon-position1 icon-style2"/>
                </a>
            </div>
            <div className="top-to-btm">
                <a
                    className="more_info_text"
                    href="https://github.com/jakeye25"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FiGithub  className="icon-position2 icon-style2" />
                </a>
            </div>
            <div className="top-to-btm">
                <a
                    className="email_link"
                    href="mailto:kebonkim@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <AiOutlineMail className="icon-position3 icon-style2"/>
                </a>
            </div>
        </div>
    )
}

export default SocialLinks
