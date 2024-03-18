import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

import styles from './SearchLanguage.module.scss';
import Button from '~/components/Button';
import DropDown from '~/components/DropDown';

const cx = classNames.bind(styles);

const data = [
    { title: 'Afrikaans', code: 'af' },
    { title: 'Albanian', code: 'sq' },
    { title: 'Amharic', code: 'am' },
    { title: 'Arabic', code: 'ar' },
    { title: 'Armenian', code: 'hy' },
    { title: 'Assamese', code: 'as' },
    { title: 'Aymara', code: 'ay' },
    { title: 'Azerbaijani', code: 'az' },
    { title: 'Bambara', code: 'bm' },
    { title: 'Basque', code: 'eu' },
    { title: 'Belarusian', code: 'be' },
    { title: 'Bengali', code: 'bn' },
    { title: 'Bhojpuri', code: 'bho' },
    { title: 'Bosnian', code: 'bs' },
    { title: 'Bulgarian', code: 'bg' },
    { title: 'Catalan', code: 'ca' },
    { title: 'Cebuano', code: 'ceb' },
    { title: 'Chinese (Simplified)', code: 'zh-CN' },
    { title: 'Chinese (Simplified)', code: 'zh' },
    { title: 'Chinese (Traditional)', code: 'zh-TW' },
    { title: 'Corsican', code: 'co' },
    { title: 'Croatian', code: 'hr' },
    { title: 'Czech', code: 'cs' },
    { title: 'Danish', code: 'da' },
    { title: 'Dhivehi', code: 'dv' },
    { title: 'Dogri', code: 'doi' },
    { title: 'Dutch', code: 'nl' },
    { title: 'English', code: 'en' },
    { title: 'Esperanto', code: 'eo' },
    { title: 'Estonian', code: 'et' },
    { title: 'Ewe', code: 'ee' },
    { title: 'Filipino (Tagalog)', code: 'fil' },
    { title: 'Finnish', code: 'fi' },
    { title: 'French', code: 'fr' },
    { title: 'Frisian', code: 'fy' },
    { title: 'Galician', code: 'gl' },
    { title: 'Georgian', code: 'ka' },
    { title: 'German', code: 'de' },
    { title: 'Greek', code: 'el' },
    { title: 'Guarani', code: 'gn' },
    { title: 'Gujarati', code: 'gu' },
    { title: 'Haitian Creole', code: 'ht' },
    { title: 'Hausa', code: 'ha' },
    { title: 'Hawaiian', code: 'haw' },
    { title: 'Hebrew', code: 'he' },
    { title: 'Hebrew', code: 'iw' },
    { title: 'Hindi', code: 'hi' },
    { title: 'Hmong', code: 'hmn' },
    { title: 'Hungarian', code: 'hu' },
    { title: 'Icelandic', code: 'is' },
    { title: 'Igbo', code: 'ig' },
    { title: 'Ilocano', code: 'ilo' },
    { title: 'Indonesian', code: 'id' },
    { title: 'Irish', code: 'ga' },
    { title: 'Italian', code: 'it' },
    { title: 'Japanese', code: 'ja' },
    { title: 'Javanese', code: 'jv' },
    { title: 'Javanese', code: 'jw' },
    { title: 'Kannada', code: 'kn' },
    { title: 'Kazakh', code: 'kk' },
    { title: 'Khmer', code: 'km' },
    { title: 'Kinyarwanda', code: 'rw' },
    { title: 'Konkani', code: 'gom' },
    { title: 'Korean', code: 'ko' },
    { title: 'Krio', code: 'kri' },
    { title: 'Kurdish', code: 'ku' },
    { title: 'Kurdish (Sorani)', code: 'ckb' },
    { title: 'Kyrgyz', code: 'ky' },
    { title: 'Lao', code: 'lo' },
    { title: 'Latin', code: 'la' },
    { title: 'Latvian', code: 'lv' },
    { title: 'Lingala', code: 'ln' },
    { title: 'Lithuanian', code: 'lt' },
    { title: 'Luganda', code: 'lg' },
    { title: 'Luxembourgish', code: 'lb' },
    { title: 'Macedonian', code: 'mk' },
    { title: 'Maithili', code: 'mai' },
    { title: 'Malagasy', code: 'mg' },
    { title: 'Malay', code: 'ms' },
    { title: 'Malayalam', code: 'ml' },
    { title: 'Maltese', code: 'mt' },
    { title: 'Maori', code: 'mi' },
    { title: 'Marathi', code: 'mr' },
    { title: 'Meiteilon (Manipuri)', code: 'mni-Mtei' },
    { title: 'Mizo', code: 'lus' },
    { title: 'Mongolian', code: 'mn' },
    { title: 'Myanmar (Burmese)', code: 'my' },
    { title: 'Nepali', code: 'ne' },
    { title: 'Norwegian', code: 'no' },
    { title: 'Nyanja (Chichewa)', code: 'ny' },
    { title: 'Odia (Oriya)', code: 'or' },
    { title: 'Oromo', code: 'om' },
    { title: 'Pashto', code: 'ps' },
    { title: 'Persian', code: 'fa' },
    { title: 'Polish', code: 'pl' },
    { title: 'Portuguese (Portugal, Brazil)', code: 'pt' },
    { title: 'Punjabi', code: 'pa' },
    { title: 'Quechua', code: 'qu' },
    { title: 'Romanian', code: 'ro' },
    { title: 'Russian', code: 'ru' },
    { title: 'Samoan', code: 'sm' },
    { title: 'Sanskrit', code: 'sa' },
    { title: 'Scots Gaelic', code: 'gd' },
    { title: 'Sepedi', code: 'nso' },
    { title: 'Serbian', code: 'sr' },
    { title: 'Sesotho', code: 'st' },
    { title: 'Shona', code: 'sn' },
    { title: 'Sindhi', code: 'sd' },
    { title: 'Sinhala (Sinhalese)', code: 'si' },
    { title: 'Slovak', code: 'sk' },
    { title: 'Slovenian', code: 'sl' },
    { title: 'Somali', code: 'so' },
    { title: 'Spanish', code: 'es' },
    { title: 'Sundanese', code: 'su' },
    { title: 'Swahili', code: 'sw' },
    { title: 'Swedish', code: 'sv' },
    { title: 'Tagalog (Filipino)', code: 'tl' },
    { title: 'Tajik', code: 'tg' },
    { title: 'Tamil', code: 'ta' },
    { title: 'Tatar', code: 'tt' },
    { title: 'Telugu', code: 'te' },
    { title: 'Thai', code: 'th' },
    { title: 'Tigrinya', code: 'ti' },
    { title: 'Tsonga', code: 'ts' },
    { title: 'Turkish', code: 'tr' },
    { title: 'Turkmen', code: 'tk' },
    { title: 'Twi (Akan)', code: 'ak' },
    { title: 'Ukrainian', code: 'uk' },
    { title: 'Urdu', code: 'ur' },
    { title: 'Uyghur', code: 'ug' },
    { title: 'Uzbek', code: 'uz' },
    { title: 'Vietnamese', code: 'vi' },
    { title: 'Welsh', code: 'cy' },
    { title: 'Xhosa', code: 'xh' },
    { title: 'Yiddish', code: 'yi' },
    { title: 'Yoruba', code: 'yo' },
    { title: 'Zulu', code: 'zu' },
];

function SearchLanguage({ language, setLanguage, updateLanguage }) {
    const [isInputLanguage, setIsInputLanguage] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [dataShow, setDataShow] = useState(data.map((item) => item.title).sort());
    const [valueInput, setValueInput] = useState('');

    const inputRef = useRef(null);
    const boxRef = useRef(null);

    const dispatch = useDispatch();

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
        dispatch(updateLanguage(objectLa));
        setIsInputLanguage(false);
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
