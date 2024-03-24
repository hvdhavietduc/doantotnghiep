import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import ItemComment from './ItemComment';
import Spinner from '~/components/Spinner';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import { getAllCommentByPostId, createComment } from '~/services/forumService';
import config from '~/config';
import handleError from '~/config/handleError';
import notify from '~/utils/notify';

const cx = classNames;

function Comment({ inforPost, isInputComment, focusInputComment }) {
    const [totalPage, setTotalPage] = useState(0);
    const [curentPage, setCurentPage] = useState(0);
    const [listComment, setListComment] = useState([]);
    const [valueComment, setValueComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingCreateComment, setLoadingCreateComment] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });
    const [cookie] = useCookies(['token']);
    const inputRef = useRef();

    const getAllCommentByPostIdAPI = async (page = 0, size = 3) => {
        const token = cookie.token;
        await getAllCommentByPostId(token, inforPost.id, page, size)
            .then((result) => {
                setTotalPage(result.totalPage);
                setListComment(result.comments);
            })
            .catch((error) => {
                const messeageNotify = config.forum.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
                const { message } = error.response.data;
                const configLogic = config.forum;
                handleError(configLogic, message);
            });
    };

    const postCommentAPI = async () => {
        if (!valueComment.trim()) {
            return;
        }
        setLoadingCreateComment(true);
        const token = cookie.token;
        const data = { postId: inforPost.id, content: valueComment, parentId: null };

        await createComment(data, token).catch((error) => {
            const messeageNotify = config.forum.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }
            const { message } = error.response.data;
            const configLogic = config.forum;
            handleError(configLogic, message);
        });
        await getAllCommentByPostId(token, inforPost.id)
            .then((result) => {
                setListComment([result.comments[0], ...listComment]);
            })
            .catch((error) => {
                const messeageNotify = config.forum.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
                const { message } = error.response.data;
                const configLogic = config.forum;
                handleError(configLogic, message);
            });
        setLoadingCreateComment(false);
        setValueComment('');
    };

    const seeMoreComment = async () => {
        setLoading(true);
        setCurentPage(curentPage + 1);
        const token = cookie.token;
        await getAllCommentByPostId(token, inforPost.id, curentPage + 1)
            .then((result) => {
                setListComment([...listComment, ...result.comments]);
                setLoading(false);
            })
            .catch((error) => {
                const messeageNotify = config.forum.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
                const { message } = error.response.data;
                const configLogic = config.forum;
                handleError(configLogic, message);
            });
    };

    const handleKeyDown = (event) => {
        // Check if the keycode is 13 (Enter)
        if (event.keyCode === 13) {
            postCommentAPI();
        }
    };

    useEffect(() => {
        getAllCommentByPostIdAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isInputComment === true) {
            inputRef.current.focus();
        }
    }, [isInputComment, focusInputComment]);

    useEffect(() => {
        if (isDeleted === true) {
            getAllCommentByPostIdAPI(0, (curentPage + 1) * 3);
            setIsDeleted(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleted]);

    return (
        <div className={cx('mt-2 w-full px-4')}>
            {/* item comment */}
            <div className={cx('mt-2')}>
                {listComment.map((comment, index) => (
                    <ItemComment inforPost={inforPost} inforComment={comment} setIsDeleted={setIsDeleted} key={index} />
                ))}
            </div>

            {/* buttom see more cmt */}
            {totalPage !== 0 && totalPage !== curentPage + 1 && (
                <div className={cx('flex justify-start py-1 font-semibold text-black/50')} onClick={seeMoreComment}>
                    <span className={'cursor-pointer pr-4 hover:underline'}>{t('see_more')}</span>
                    {loading && (
                        <span>
                            <Spinner className={'!h-4 !w-4'} />
                        </span>
                    )}
                </div>
            )}

            {/* input write cmt */}
            {isInputComment && (
                <div className={cx('relative mt-6 flex items-center justify-start')}>
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
                        ref={inputRef}
                        value={valueComment}
                        onChange={(e) => setValueComment(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="absolute right-3 " onClick={postCommentAPI}>
                        {loadingCreateComment ? (
                            <span>
                                <Spinner className={'!h-4 !w-4'} />
                            </span>
                        ) : (
                            <FontAwesomeIcon
                                className="cursor-pointer hover:text-text-color-link"
                                icon={faPaperPlane}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

Comment.propTypes = {
    inforPost: PropTypes.object.isRequired,
    isInputComment: PropTypes.bool.isRequired,
    focusInputComment: PropTypes.number.isRequired,
};

export default Comment;
