import classNames from 'classnames/bind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

import styles from './HeaderTranslation.module.scss';
import SearchLanguage from './SearchLanguage';

const cx = classNames.bind(styles);

function HeaderTranslation() {
    const [inputLanguage, setInputLanguage] = useState({ title: 'English', code: 'en' });
    const [ouputLanguage, setOutputLanguage] = useState({ title: 'Vietnamese', code: 'vi' });

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
                'flex h-[55px] w-full items-center rounded-t-xl border-[1px] border-solid border-b-slate-400/50  ',
            )}
        >
            <SearchLanguage language={inputLanguage.title.toUpperCase()} setLanguage={setInputLanguage} />

            <FontAwesomeIcon
                icon={faRepeat}
                className={cx('cursor-pointer', 'hover:text-text-color-link')}
                onClick={handleSwitchLanguage}
            />
            <SearchLanguage language={ouputLanguage.title.toUpperCase()} setLanguage={setOutputLanguage} />
        </div>
    );
}

export default HeaderTranslation;
