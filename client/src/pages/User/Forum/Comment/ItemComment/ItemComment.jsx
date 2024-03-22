import classNames from 'classnames';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import NoimageAvatar from '~/assets/img/noImageAvatar.png';

const cx = classNames;

function ItemComment({ inforComment, inforPost, isHaveChild }) {
    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });

    const nowDate = new Date();
    const commentDate = new Date(inforComment.createdAt);
    const differenceInTime = nowDate.getTime() - commentDate.getTime();

    const convertTime = (time) => {
        let timeconverted = time / (1000 * 3600 * 24 * 365);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('year');
        }

        timeconverted = time / (1000 * 3600 * 24 * 30);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('month');
        }

        timeconverted = time / (1000 * 3600 * 24 * 7);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('week');
        }

        timeconverted = time / (1000 * 3600 * 24);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('day');
        }

        timeconverted = time / (1000 * 3600);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('hour');
        }

        timeconverted = time / (1000 * 60);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('minutes');
        }

        return String(Math.floor(timeconverted)) + ' ' + t('just_finished');
    };
    return (
        <div className={cx('mt-3 flex')}>
            <div className="flex-shrink-0">
                <img
                    className={cx(' rounded-full', {
                        'h-8 w-8': isHaveChild,
                        'h-6 w-6': !isHaveChild,
                    })}
                    src={inforPost?.author?.avatar ? inforPost?.author?.avatar : NoimageAvatar}
                    alt="Avatar"
                />
            </div>

            <div className="ml-2 text-sm">
                <div className="rounded-2xl bg-background-color-secondnary px-3 py-2">
                    <div className="font-semibold">Trái Cà tím</div>
                    <div>{inforComment.content}</div>
                </div>
                <div className="flex justify-start gap-2 pl-4 text-[12px] font-semibold text-black/70">
                    <span className="font-medium">{convertTime(differenceInTime)}</span>
                    <span className={'cursor-pointer hover:underline'}>{t('like')}</span>
                    <span className={'cursor-pointer hover:underline'}>{t('feedback')}</span>
                </div>
                {isHaveChild && (
                    <Fragment>
                        <div>
                            <ItemComment isHaveChild={false} />
                            <ItemComment isHaveChild={false} />
                        </div>
                        <div className={cx('relative mt-4 flex items-center justify-start')}>
                            <div className="flex-shrink-0">
                                <img
                                    className={cx(' h-8 w-8 rounded-full')}
                                    src={inforPost?.author?.avatar ? inforPost?.author?.avatar : NoimageAvatar}
                                    alt="Avatar"
                                />
                            </div>
                            <input
                                className="ml-4 w-full rounded-xl bg-background-color-secondnary px-4 py-2"
                                placeholder={t('write_feedback')}
                            />
                            <div className="absolute right-3 cursor-pointer hover:text-text-color-link">
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default ItemComment;
