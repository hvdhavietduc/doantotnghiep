import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchLanguage.module.scss';
import Button from '~/components/Button';
import DropDown from '~/components/DropDown';

const cx = classNames.bind(styles);

const data = [];

function SearchLanguage({ language }) {
    const [isInputLanguage, setIsInputLanguage] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const inputRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation('translation', { keyPrefix: 'SearchLanguage' });

    const openInput = () => {
        if (isInputLanguage === false) {
            setIsInputLanguage(true);
            return;
        }
        if (isInputLanguage === true) {
            setIsInputLanguage(false);
            return;
        }
    };

    const handleClickOutSide = (e) => {
        if (!inputRef.current?.contains(e.target)) {
            setIsInputLanguage(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutSide, true);
        //return () => document.addEventListener('click', handleClickOutSide, true);
    }, []);

    return (
        <div className={cx('relative flex h-full flex-1 justify-center')}>
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
                    data={data}
                    className={cx('absolute left-0 top-[110%] z-10 h-full w-full border-b-[2px] border-solid ')}
                    showResult={showResult}
                    setShowResult={setShowResult}
                >
                    <input
                        className={cx('h-full w-full pl-4')}
                        placeholder="Search language"
                        onFocus={() => setShowResult(true)}
                        ref={inputRef}
                    />
                </DropDown>
            )}
        </div>
    );
}

export default SearchLanguage;
