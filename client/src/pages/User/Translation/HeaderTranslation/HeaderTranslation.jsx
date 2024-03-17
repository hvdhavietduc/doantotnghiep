import classNames from 'classnames/bind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

import styles from './HeaderTranslation.module.scss';
import SearchLanguage from './SearchLanguage';

const cx = classNames.bind(styles);

//const data = [];

function HeaderTranslation() {
    const [inputLanguage, setInputLanguage] = useState('ENGLISH');
    const [ouputLanguage, setOutputLanguage] = useState('VIETNAMESE');

    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation('translation', { keyPrefix: 'HeaderTranslation' });

    const handleSwitchLanguage = () => {
        const temp = inputLanguage;
        setInputLanguage(ouputLanguage);
        setOutputLanguage(temp);
    };

    return (
        <div
            className={cx(
                'flex h-[50px] w-full items-center rounded-t-xl border-[1px] border-solid border-b-slate-400/50  ',
            )}
        >
            <SearchLanguage language={inputLanguage} />

            <FontAwesomeIcon
                icon={faRepeat}
                className={cx('cursor-pointer', 'hover:text-text-color-link')}
                onClick={handleSwitchLanguage}
            />
            <SearchLanguage language={ouputLanguage} />
        </div>
    );
}

export default HeaderTranslation;
