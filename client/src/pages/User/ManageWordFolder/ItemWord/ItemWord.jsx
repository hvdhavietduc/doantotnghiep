import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSound from 'use-sound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './ItemWord.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import EditWord from '../EditWord';
import DeleteWord from '../DeleteWord';
//import Image from '~/components/Image';

const cx = classNames.bind(styles);

function ItemWord({ inforWord, onPageChange }) {
    const [isPoperEditWord, setIsPoperEditWord] = useState(false);
    const [isPoperDeleteWord, setIsPoperDeleteWord] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordFolder' });
    const [playSoundUK] = useSound(inforWord.pronunciationUKAudio);
    const [playSoundUS] = useSound(inforWord.pronunciationUSAudio);

    const renderResult = (attrs) => (
        <div className={cx('mr-2')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper', 'overflow-hidden !py-[2px]')}>
                <div
                    className={cx(
                        'menu-item',
                        'w-full cursor-pointer justify-start px-4 py-[6px] font-semibold leading-[1.125rem]',
                    )}
                    onClick={(e) => showPoperEditWord(e)}
                >
                    {t('edit')}
                </div>
                <div
                    className={cx(
                        'menu-item',
                        'w-full cursor-pointer justify-start px-4 py-[6px] font-semibold leading-[1.125rem]',
                    )}
                    onClick={(e) => showPoperDeleteWord(e)}
                >
                    {t('delete')}
                </div>
            </PopperWrapper>
        </div>
    );

    const showPoperEditWord = (e) => {
        e.stopPropagation();
        setIsPoperEditWord(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperDeleteWord = (e) => {
        e.stopPropagation();
        setIsPoperDeleteWord(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <Fragment>
            <div className={cx('itemWord', 'relative mb-6 w-full rounded-lg border-[1px] border-solid p-7 ')}>
                <div className={cx('flex justify-between')}>
                    <div>
                        <div className={cx('flex')}>
                            <div className={cx('mr-2 text-xl font-semibold')}>
                                {inforWord.name + ' '}
                                {inforWord.pronunciationUK}
                            </div>
                            <div className={cx('flex items-center font-normal ')}>
                                <span className={cx('my-0 ml-[10px] mr-1 !text-black')}>US</span>
                                <FontAwesomeIcon icon={faVolumeLow} onClick={playSoundUS} />
                                <span className={cx('my-0 ml-[10px] mr-1 !text-black')}>UK</span>
                                <FontAwesomeIcon icon={faVolumeLow} onClick={playSoundUK} />
                            </div>
                        </div>
                        <div className={cx('mt-[10px]')}>
                            <div className={cx('font-semibold')}>{t('definition')}</div>
                            <div>
                                <div>{inforWord?.types[0]?.means[0]?.conceptEnglish.slice(0, -1)}</div>
                                <div className={cx('bg-blue-200')}>
                                    {inforWord?.types[0]?.means[0]?.conceptVietnamese || 'Sẽ có khi có API'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <Image
                            className={cx('w-[160px] rounded-lg')}
                            src="https://tse4.mm.bing.net/th?id=OIP.RgAVXeYE3WsnWQFzNkf2RwHaEK&pid=Api&P=0&h=220"
                        /> */}
                    </div>
                </div>
                {inforWord?.types[0]?.means[0]?.examples?.length !== 0 && (
                    <div className={cx('mt-[10px]')}>
                        <div className={cx('font-semibold ')}>{t('example')}</div>
                        <ul className={cx('list-inside')}>
                            {inforWord?.types[0]?.means[0]?.examples.map((value, index) => (
                                <li key={index}>{value.example}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <Tippy
                    interactive
                    delay={[0, 700]}
                    offset={[12, 8]}
                    placement="top-end"
                    zIndex={9}
                    render={renderResult}
                >
                    <div className={cx('absolute bottom-[5px] right-[10px] cursor-pointer')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </Tippy>
            </div>
            {isPoperEditWord && (
                <EditWord setIsPoperEditWord={setIsPoperEditWord} inforWord={inforWord} onPageChange={onPageChange} />
            )}
            {isPoperDeleteWord && (
                <DeleteWord
                    setIsPoperDeleteWord={setIsPoperDeleteWord}
                    inforWord={inforWord}
                    onPageChange={onPageChange}
                />
            )}
        </Fragment>
    );
}

ItemWord.propTypes = {
    inforWord: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default ItemWord;
