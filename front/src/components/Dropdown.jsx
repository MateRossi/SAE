/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import './dropdown.css'

// eslint-disable-next-line react/prop-types
function Dropdown({ options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (!divEl.current) {
                return;
            }

            if (!divEl.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handler, true);

        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);

    const handleClick = () => {
        setIsOpen((currentIsOpen) => !currentIsOpen);
    };

    const handleOptionClick = (option) => {
        setIsOpen(false);
        onChange(option);
    };

    // eslint-disable-next-line react/prop-types
    const renderedOptions = options.map((option) => {
        return (
            <div className="SelectOption" onClick={() => handleOptionClick(option)} key={option.name || option.id}>
                {option.name || option.description}
            </div>
        );
    });

    return (
        <div ref={divEl} className="Dropdown">
            <div className="DropdownPanel" onClick={handleClick} >
                {value?.name || value?.description || value || 'Selecione...'}
                <GoChevronDown className="ChevronDown" />      
            </div>
            {isOpen && (
                <div className="DropdownOptions">
                    {renderedOptions}
                </div>
            )}
        </div>
    );
}

export default Dropdown;