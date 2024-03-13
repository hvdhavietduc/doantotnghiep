import React, { useState, useEffect, useRef } from 'react';

function Dropdown({ title, options, handleFunction }) {
    // eslint-disable-next-line no-unused-vars
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    // eslint-disable-next-line no-unused-vars
    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="relative inline-block w-60 text-left">
            <div className="w-full">
                <span className="w-full rounded-md ">
                    <button
                        type="button"
                        className=" inline-flex h-full w-full justify-center rounded-md border border-gray-300 bg-blue-100 px-4 py-2 text-base font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-blue-200 focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-200 active:bg-gray-800 active:text-white"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {title}
                    </button>
                </span>
            </div>

            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 max-h-80 w-56 origin-top-right overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleFunction(option.id)}
                                className=" block w-full px-4 py-2 text-left text-base text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none"
                                role="menuitem"
                            >
                                {option.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dropdown;
