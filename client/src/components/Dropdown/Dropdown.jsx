import React, { useState, useEffect, useRef } from 'react';

function Dropdown({ title, options, handleFunction }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

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
        <div className="relative inline-block text-left w-60">
            <div className="w-full">
                <span className="rounded-md w-full ">
                    <button
                        type="button"
                        className=" bg-blue-100 h-full text-2xl inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2  font-medium text-gray-700 hover:bg-blue-200 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-800 active:text-white transition ease-in-out duration-150"
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
                    className="origin-top-right absolute right-0 mt-2 w-56 max-h-80 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-1" role="none">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleFunction(option.id)}
                                className=" text-2xl block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
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
