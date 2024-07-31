import React from "react";

export default function ToggleThemeBtn({ srcImage, toggleTheme }) {
    return(
        <button onClick={toggleTheme} className='toggle-btn'>
            <img src={srcImage} alt="theme-icon" />
        </button>
    )
}