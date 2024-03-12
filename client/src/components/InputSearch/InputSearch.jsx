import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import useDebounce from '~/utils/useDebounce';
import styles from './InputSearch.module.scss';

const cx = classNames.bind(styles);

function InputSearch() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();
    const boxSearchRef = useRef();

    const { t } = useTranslation('translation', { keyPrefix: 'Header' });

    const styleTagSearchResult = { width: boxSearchRef.current?.clientWidth };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            //call api
            //const result = await searchServices.filetWordContain(debouncedValue);
            //setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleKeyDown = (event) => {
        // Check if the keycode is 13 (Enter)
        if (event.keyCode === 13) {
            handleValue(searchValue);
        }
    };

    const handleValue = (value) => {};

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div className={cx('max-xl:flex-1')}>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div style={styleTagSearchResult} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('pb-2')}>
                            {searchResult.map((result, index) => (
                                <div
                                    key={index}
                                    className={cx('cursor-pointer px-4 py-[6px] hover:underline', 'result-item')}
                                    onClick={() => handleValue(result)}
                                >
                                    {result}
                                </div>
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div
                    className={cx(
                        'relative ml-4 flex w-[300px] border-[1.5px] border-solid border-transparent pl-4 text-base',
                        'max-md:invisible max-md:!absolute max-md:!left-0 max-md:!ml-0 max-md:!w-full',
                        'search',
                    )}
                    ref={boxSearchRef}
                >
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder={t('search_dictionary')}
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                        onKeyDown={handleKeyDown}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default InputSearch;
