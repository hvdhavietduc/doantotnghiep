import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import * as searchServices from '~/services/lookupServices';
import useDebounce from '~/utils/useDebounce';
import { useNavigate } from 'react-router-dom';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import HeadlessTippy from '@tippyjs/react/headless';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

            const result = await searchServices.filetWordContain(debouncedValue);
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
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div style={styleTagSearchResult} tabIndex="-1" {...attrs}>
                        <PopperWrapper className='pb-2'>
                            {searchResult.map((result, index) => (
                                <div
                                    key={index}
                                    className='cursor-pointer px-4 py-[6px] hover:underline result-item'
                                >
                                    {result}
                                </div>
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <form class="mx-auto flex max-w-sm items-center">
                    <label for="simple-search" class="sr-only">
                        Search
                    </label>
                    <div class="relative w-full">
                        <input
                            type="text"
                            id="simple-search"
                            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            placeholder="Search branch name..."
                            required
                        />
                    </div>
                </form>
            </HeadlessTippy>
        </div>
    );
}
export default Search;
