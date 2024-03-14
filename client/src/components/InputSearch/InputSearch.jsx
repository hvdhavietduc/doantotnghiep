import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { filetWordContain } from '~/services/lookupServices';
import useDebounce from '~/utils/useDebounce';
import styles from './InputSearch.module.scss';

const cx = classNames.bind(styles);

function InputSearch({ handleValue, action, className }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

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
            const result = await filetWordContain(debouncedValue);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleValueOnclick = (wordId) => {
        handleHideResult();
        handleValue(wordId);
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

    return (
        <div className={cx(`max-xl:flex-1 ${className}`)}>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div style={styleTagSearchResult} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('pb-2')}>
                            {searchResult.map((word, index) => (
                                <div
                                    key={index}
                                    className={cx('cursor-pointer px-4 py-[6px] flex justify-between', 'result-item')}
                                    onClick={() => handleValueOnclick(word.id)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <span className='hover:underline'>{word.name}</span>

                                    {hoveredIndex === index && action && <span className=' text-gray-300'>{action}</span>}
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
