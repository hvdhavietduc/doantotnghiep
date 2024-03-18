import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeLow, faCopy } from '@fortawesome/free-solid-svg-icons';

import styles from './Translation.module.scss';
import HeaderTranslation from './HeaderTranslation';
import useDebounce from '~/utils/useDebounce';
import { setTranslate, translate } from '~/services/translationSevice';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames.bind(styles);

function Translation() {
    const [inputTranslation, setInputTranslation] = useState('');
    const [outputTranslation, setOutputTranslation] = useState('');

    const [cookies] = useCookies(['token']);
    // eslint-disable-next-line no-unused-vars
    const { inputLanguage, ouputLanguage } = useSelector((state) => state.translate);
    const { t } = useTranslation('translation', { keyPrefix: 'Translation' });

    const debouncedValue = useDebounce(inputTranslation, 500);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setOutputTranslation('');
            return;
        }

        const handleTranslate = async () => {
            const token = cookies.token;
            setOutputTranslation(t('translating'));
            await setTranslate({ isRelease: true }, token);
            const data = {
                text: debouncedValue,
                to: ouputLanguage.code,
            };
            const resultTranslate = await translate(data, token);
            setOutputTranslation(resultTranslate);
            await setTranslate({ isRelease: false }, token);
        };

        handleTranslate().catch((error) => {
            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }
            console.log(error);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, inputLanguage, ouputLanguage]);

    return (
        <div className={cx('mb-[150px] mt-[50px] flex w-full justify-center')}>
            <div
                className={cx(
                    'flex h-[250px] w-[1260px] flex-col overflow-hidden rounded-xl border-[1px] border-solid border-slate-400/50 shadow-xl',
                    'max-xl:!w-[90%]',
                )}
            >
                <HeaderTranslation
                    inputTranslation={inputTranslation}
                    outputTranslation={outputTranslation}
                    setInputTranslation={setInputTranslation}
                    setOutputTranslation={setOutputTranslation}
                />
                <div className={cx('flex w-full flex-1 flex-wrap ')}>
                    <div
                        className={cx(
                            'relative w-1/2  border-[1px] border-solid border-r-slate-400/50 ',
                            'max-md:!w-full',
                        )}
                    >
                        <textarea
                            className={cx('h-[200px] w-full border-none pl-5 pt-5 text-lg outline-none')}
                            ref={inputRef}
                            value={inputTranslation}
                            onChange={(e) => setInputTranslation(e.target.value)}
                        />
                        <div>
                            <FontAwesomeIcon
                                className={cx(
                                    'absolute bottom-5 left-5 cursor-pointer text-2xl',
                                    'hover:text-text-color-link',
                                )}
                                icon={faVolumeLow}
                            />
                        </div>
                        <div>
                            <CopyToClipboard text={inputTranslation} onCopy={() => notify.success('coppied')}>
                                <FontAwesomeIcon
                                    className={cx(
                                        'absolute bottom-5 left-[60px] cursor-pointer text-2xl',
                                        'hover:text-text-color-link',
                                    )}
                                    icon={faCopy}
                                />
                            </CopyToClipboard>
                        </div>
                    </div>
                    <div className={cx('relative w-1/2 bg-background-color-secondnary', 'max-md:!w-full')}>
                        <div className={cx('h-[200px] w-full pl-5 pt-5 text-lg ')}> {outputTranslation}</div>
                        <div>
                            <FontAwesomeIcon
                                className={cx(
                                    'absolute bottom-5 left-5 cursor-pointer text-2xl',
                                    'hover:text-text-color-link',
                                )}
                                icon={faVolumeLow}
                            />
                        </div>
                        <div>
                            <CopyToClipboard text={outputTranslation} onCopy={() => notify.success('coppied')}>
                                <FontAwesomeIcon
                                    className={cx(
                                        'absolute bottom-5 left-[60px] cursor-pointer text-2xl',
                                        'hover:text-text-color-link',
                                    )}
                                    icon={faCopy}
                                />
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Translation;
