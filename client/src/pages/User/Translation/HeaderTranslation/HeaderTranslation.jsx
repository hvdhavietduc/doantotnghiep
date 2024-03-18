import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

import styles from './HeaderTranslation.module.scss';
import SearchLanguage from './SearchLanguage';
import { updateInputLanguage, updateOutputLanguage } from '~/redux/translationSlice';

const cx = classNames.bind(styles);

function HeaderTranslation({ inputTranslation, setInputTranslation, outputTranslation, setOutputTranslation }) {
    const languageRedux = useSelector((state) => state.translate);
    const [inputLanguage, setInputLanguage] = useState(languageRedux.inputLanguage);
    const [ouputLanguage, setOutputLanguage] = useState(languageRedux.ouputLanguage);

    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation('translation', { keyPrefix: 'HeaderTranslation' });
    const dispatch = useDispatch();

    const handleSwitchLanguage = () => {
        const temp = inputLanguage;
        setInputLanguage(ouputLanguage);
        dispatch(updateInputLanguage(inputLanguage));
        setOutputLanguage(temp);
        dispatch(updateOutputLanguage(temp));
        const tempTranslate = inputTranslation;
        setInputTranslation(outputTranslation);
        setOutputTranslation(tempTranslate);
    };

    return (
        <div
            className={cx(
                'flex h-[55px] w-full items-center rounded-t-xl border-[1px] border-solid border-b-slate-400/50  ',
            )}
        >
            <SearchLanguage
                language={inputLanguage.title.toUpperCase()}
                setLanguage={setInputLanguage}
                updateLanguage={updateInputLanguage}
            />

            <FontAwesomeIcon
                icon={faRepeat}
                className={cx('cursor-pointer', 'hover:text-text-color-link')}
                onClick={handleSwitchLanguage}
            />
            <SearchLanguage
                language={ouputLanguage.title.toUpperCase()}
                setLanguage={setOutputLanguage}
                updateLanguage={updateOutputLanguage}
            />
        </div>
    );
}

SearchLanguage.propTypes = {
    inputTranslation: PropTypes.string.isRequired,
    setInputTranslation: PropTypes.func.isRequired,
    outputTranslation: PropTypes.string.isRequired,
    setOutputTranslation: PropTypes.func.isRequired,
};

export default HeaderTranslation;
