import classNames from 'classnames';
import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import NoimageAvatar from '~/assets/img/noImageAvatar.png';

const cx = classNames;

function ItemComment({ inforComment, inforPost, isHaveChild }) {
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
                    <div>
                        Quá tuyệt vời a ơi, nữa đi a ơi e rung động mất rồi Quá tuyệt vời a ơi, nữa đi a ơi e rung động
                        mất rồi
                    </div>
                </div>
                <div className="flex justify-start gap-2 pl-4 text-[12px] font-semibold text-black/70">
                    <span className="font-medium">1 tuần</span>
                    <span>Thích</span>
                    <span>Phản hồi</span>
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
                                placeholder={'Viết bình luận'}
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
