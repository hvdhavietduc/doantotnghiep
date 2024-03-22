import classNames from 'classnames';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import EditPost from '../EditPost';
import DeletePost from '../DeletePost';
import Comment from '../Comment';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';

const cx = classNames;

function Post({ post }) {
    const usernameUserCurrent = localStorage.getItem('username');
    const [isPoperEditPost, setIsPoperEditPost] = useState(false);
    const [isPoperDeletePost, setIsPoperDeletePost] = useState(false);
    const [isInputComment, setIsInputComment] = useState(false);
    const [focusInputComment, setFocusInputComment] = useState(0);
    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });

    const originalDate = new Date(post.createdAt);

    const formattedDate = `${originalDate.toLocaleString('en-US', { month: 'long' })} ${originalDate.getDate()}, ${originalDate.getFullYear()}, ${originalDate.getHours()}:${originalDate.getMinutes()}:${originalDate.getSeconds()} ${originalDate.getHours() >= 12 ? 'PM' : 'AM'}`;

    const showPoperEditPost = (e) => {
        e.stopPropagation();
        setIsPoperEditPost(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperDeletePost = (e) => {
        e.stopPropagation();
        setIsPoperDeletePost(true);
        document.body.style.overflow = 'hidden';
    };

    const showInputComment = () => {
        setIsInputComment(true);
        setFocusInputComment(focusInputComment + 1);
    };

    const renderResult = (attrs) => (
        <div className={'mr-2'} tabIndex="-1" {...attrs}>
            <PopperWrapper className={'menu-popper overflow-hidden py-[2px]'}>
                <div
                    className={cx(
                        'menu-item w-full justify-start px-4 py-[6px] font-semibold leading-[1.125rem]',
                        'hover:cursor-pointer hover:bg-background-color-secondnary',
                    )}
                    onClick={(e) => showPoperEditPost(e)}
                >
                    {t('edit_post')}
                </div>
                <div
                    className={cx(
                        'menu-item w-full justify-start px-4 py-[6px] font-semibold leading-[1.125rem]',
                        'hover:cursor-pointer hover:bg-background-color-secondnary',
                    )}
                    onClick={(e) => showPoperDeletePost(e)}
                >
                    {t('delete_post')}
                </div>
            </PopperWrapper>
        </div>
    );

    return (
        <Fragment>
            <div
                className={cx(
                    'w-3/4 rounded-lg border border-gray-200 bg-white pb-4 shadow',
                    'dark:border-gray-700 dark:bg-gray-800 lg:w-1/2',
                )}
            >
                <div className="relative flex items-center p-4">
                    {/* avatar */}
                    <div className="flex-shrink-0">
                        <img
                            className=" h-12 w-12 rounded-full"
                            src={post.author.avatar ? post.author.avatar : NoimageAvatar}
                            alt="Avatar"
                        />
                    </div>
                    {/* title */}
                    <div className="ms-4 min-w-0 flex-1">
                        <p className="truncate text-xl font-medium text-gray-900 dark:text-white">{post.author.name}</p>
                        <p className="text-sm font-normal text-gray-400 dark:text-gray-400">{formattedDate}</p>
                    </div>
                    {/* more */}
                    {usernameUserCurrent === post.author.username && (
                        <Tippy interactive delay={[0, 700]} offset={[12, 8]} zIndex={9} render={renderResult}>
                            <div className={'absolute right-[10px] top-[5px] cursor-pointer'}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </Tippy>
                    )}
                </div>
                {/* content post */}
                <div className="p-4">
                    <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">{post.title}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.content}</p>
                </div>
                <img className=" w-full" src={post.image} alt="" />
                {/* action to post */}
                <div className={cx('flex items-center justify-center border-b border-t font-normal text-gray-700')}>
                    <div
                        className={cx(
                            'flex h-full w-1/3 flex-1 cursor-pointer items-center justify-center py-2',
                            'hover:bg-background-color-secondnary',
                        )}
                    >
                        <p className=" dark:text-gray-400">{t('like')}</p>
                    </div>
                    <div
                        className={cx(
                            'flex h-full w-1/3 flex-1 cursor-pointer items-center justify-center py-2',
                            'hover:bg-background-color-secondnary',
                        )}
                        onClick={showInputComment}
                    >
                        <p className=" dark:text-gray-400">{t('comment')}</p>
                    </div>
                </div>
                {/* comment */}
                <Comment inforPost={post} isInputComment={isInputComment} focusInputComment={focusInputComment} />
            </div>
            {isPoperDeletePost && <DeletePost setIsPoperDeletePost={setIsPoperDeletePost} postId={post.id} />}
            {isPoperEditPost && <EditPost setIsPoperEditPost={setIsPoperEditPost} oldPost={post} />}
        </Fragment>
    );
}

export default Post;
