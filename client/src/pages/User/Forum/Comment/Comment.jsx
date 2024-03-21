import classNames from 'classnames';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import ItemComment from './ItemComment';
import Spinner from '~/components/Spinner';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';

const cx = classNames;

function Comment({ inforPost, isInputComment }) {
    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });
    return (
        <Fragment>
            <div className={cx('mt-2 w-full px-4')}>
                <div className={cx('flex justify-start py-1 font-semibold text-black/50')}>
                    <span className={'cursor-pointer pr-4 hover:underline'}>{t('see_more')}</span>
                    {/* <span>
                        <Spinner className={'!h-4 !w-4'} />
                    </span> */}
                </div>
                <div className={cx('mt-2')}>
                    <ItemComment isHaveChild={true} />
                    <ItemComment isHaveChild={true} />
                    <ItemComment isHaveChild={true} />
                </div>
                <div className={cx('relative mt-8 flex items-center justify-start')}>
                    <div className="flex-shrink-0">
                        <img
                            className={cx(' h-8 w-8 rounded-full')}
                            src={inforPost?.author?.avatar ? inforPost?.author?.avatar : NoimageAvatar}
                            alt="Avatar"
                        />
                    </div>
                    <input
                        className="ml-4 w-full rounded-xl bg-background-color-secondnary px-4 py-2"
                        placeholder={t('write_cmt')}
                    />
                    <div className="absolute right-3 cursor-pointer hover:text-text-color-link">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Comment;
