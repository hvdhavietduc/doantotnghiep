import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchLanguage.module.scss';
import Button from '~/components/Button';
import DropDown from '~/components/DropDown';

const cx = classNames.bind(styles);

const data = [
    { title: 'Venezuela', code: 'es' },
    { title: 'Uruguay', code: 'es' },
    { title: 'United States', code: 'es' },
    { title: 'United Kingdom', code: 'cy' },
    { title: 'Thailand', code: 'th' },
    { title: 'Hong Kong', code: 'yue' },
    { title: 'Hungary', code: 'hu' },
    { title: 'Iceland', code: 'is' },
    { title: 'India', code: 'as' },
    { title: 'Israel', code: 'ar' },
    { title: 'Italy', code: 'it' },
    { title: 'Vietnamese', code: 'vi' },
    { title: 'English', code: 'en' },
    { title: 'Japan', code: 'ja' },
    { title: 'Malaysia', code: 'ms' },
    { title: 'Philippines', code: 'fil' },
];

function SearchLanguage({ language, setLanguage }) {
    const [isInputLanguage, setIsInputLanguage] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [dataShow, setDataShow] = useState(data.map((item) => item.title).sort());
    const [valueInput, setValueInput] = useState('');

    const inputRef = useRef(null);
    const boxRef = useRef(null);

    const openInput = () => {
        if (isInputLanguage === false) {
            setIsInputLanguage(true);
            setValueInput('');
            return;
        }
        if (isInputLanguage === true) {
            setIsInputLanguage(false);
            return;
        }
    };

    const handleClickOutSide = (e) => {
        if (!boxRef.current?.contains(e.target)) {
            setIsInputLanguage(false);
        }
    };

    const handleChangeLanguage = (la) => {
        const objectLa = data.filter((item) => item.title === la)[0];
        setLanguage(objectLa);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide, true);
    }, []);

    useEffect(() => {
        if (isInputLanguage === true) {
            inputRef.current.focus();
        }
    }, [isInputLanguage]);

    useEffect(() => {
        const dataFilder = data.filter((item) => {
            const itemLowerCase = item.title?.toLowerCase();
            const valueInputLowerCase = valueInput?.toLowerCase();
            return itemLowerCase.startsWith(valueInputLowerCase);
        });
        const dataSort = dataFilder.map((item) => item.title).sort();
        setDataShow(dataSort);
    }, [valueInput]);

    return (
        <div className={cx('relative flex h-[90%] flex-1 justify-center')} ref={boxRef}>
            <Button
                className={cx('cursor-pointer  ', 'hover:text-text-color-link')}
                rightIcon={faChevronCircleDown}
                onClick={() => {
                    openInput();
                }}
            >
                {language}
            </Button>
            {isInputLanguage && (
                <DropDown
                    data={dataShow}
                    className={cx('absolute left-0 top-[110%] z-10 h-full w-full border-b-[2px] border-solid ')}
                    showResult={showResult}
                    setShowResult={setShowResult}
                    handleChange={handleChangeLanguage}
                >
                    <input
                        className={cx('h-full w-full pl-4')}
                        placeholder="Search language"
                        onFocus={() => setShowResult(true)}
                        ref={inputRef}
                        value={valueInput}
                        onChange={(e) => setValueInput(e.target.value)}
                    />
                </DropDown>
            )}
        </div>
    );
}

SearchLanguage.propTypes = {
    language: PropTypes.string.isRequired,
    setLanguage: PropTypes.func.isRequired,
};

export default SearchLanguage;
