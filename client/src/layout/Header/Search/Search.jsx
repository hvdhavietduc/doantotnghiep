import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import * as searchServices from '~/services/lookupServices';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import useDebounce from '~/utils/useDebounce';
import styles from './Search.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Search({ showBoxSearch }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();
    const boxSearchRef = useRef();

    const styleTagSearchResult = { width: boxSearchRef.current?.clientWidth };

    // useEffect(() => {
    //     if (!debouncedValue.trim()) {
    //         setSearchResult([]);
    //         return;
    //     }

    //     const fetchApi = async () => {
    //         setLoading(true);

    //         const result = await searchServices.search(debouncedValue);

    //         setSearchResult(result);
    //         setLoading(false);
    //     };

    //     fetchApi();
    // }, [debouncedValue]);

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
    
    const search = ()=>{
        navigate(`/lookup/${searchValue}`)
    }

    return (
        // Using a wrapper <div> tag around the reference element solves
        // this by creating a new parentNode context.
        <div className={cx('wrapper')}>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} style={styleTagSearchResult} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('padding-wrapper')}>
                            {searchResult.map((result, index) => (
                                <div key={index} className={cx('result-item')}>
                                    {result}
                                </div>
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div
                    className={cx('search', {
                        'search-active': showBoxSearch,
                    })}
                    ref={boxSearchRef}
                >
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Search dictionary"
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

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} onClick={search} disabled={searchValue===''}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
