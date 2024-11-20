import React, { useState, useEffect, useRef } from 'react';
import "./moreIcon.scss";


function MoreIcon({ Icon }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuBarRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuBarRef.current && !menuBarRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <button className="moreIcon" onClick={handleToggle} ref={menuBarRef}>
                {Icon}
                {isOpen && (
                    <ul className="dropdown-content">
                        <li>Download</li>
                        <li>Import</li>
                        <li>Export</li>
                    </ul>
                )}
            </button>
        </>)
};

export default MoreIcon;
