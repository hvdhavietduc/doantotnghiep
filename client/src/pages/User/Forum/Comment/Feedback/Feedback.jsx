import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Fragment, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import ItemComment from '../ItemComment';
import Spinner from '~/components/Spinner';
import { getCommentOfComment, createComment } from '~/services/forumService';
import config from '~/config';
import handleError from '~/config/handleError';
import notify from '~/utils/notify';

const cx = classNames;

function Feedback({ inforComment, inforPost, isInputFeedback, focusInputComment }) {
    const [totalPageFeedback, setTotalPageFeedback] = useState(0);
    const [curentPageFeedback, setCurentPageFeedback] = useState(0);
    const [listFeedback, setListFeedback] = useState([]);
    const [valueFeedBack, setValueFeedBack] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingCreateFeedback, setLoadingCreateFeedback] = useState(false);
    const [isDeletedFeedback, setIsDeletedFeedback] = useState(false);

    const inputRef = useRef();

    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });
    const [cookie] = useCookies(['token']);

    const getAllCommentOfCommentAPI = async (page = 0, size = 3) => {
        const token = cookie.token;

        await getCommentOfComment(token, inforComment.id, page, size)
            .then((result) => {
                setTotalPageFeedback(result.totalPage);
                setListFeedback(result.comments);
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

    const postFeedbackAPI = async () => {
        if (!valueFeedBack.trim()) {
            return;
        }
        setLoadingCreateFeedback(true);
        const token = cookie.token;
        const data = { postId: inforPost.id, content: valueFeedBack, parentId: inforComment.id };

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
        await getCommentOfComment(token, inforComment.id)
            .then((result) => {
                setListFeedback([result.comments[0], ...listFeedback]);
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
        setLoadingCreateFeedback(false);
        setValueFeedBack('');
    };

    const seeMoreFeedback = async () => {
        setLoading(true);
        setCurentPageFeedback(curentPageFeedback + 1);
        const token = cookie.token;
        await getCommentOfComment(token, inforComment.id, curentPageFeedback + 1)
            .then((result) => {
                setListFeedback([...listFeedback, ...result.comments]);
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
            postFeedbackAPI();
        }
    };

    useEffect(() => {
        if (inforComment.childIds.length > 0) {
            getAllCommentOfCommentAPI();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isDeletedFeedback === true) {
            getAllCommentOfCommentAPI(0, (curentPageFeedback + 1) * 3);
            setIsDeletedFeedback(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeletedFeedback]);

    useEffect(() => {
        if (isInputFeedback === true) {
            inputRef.current.focus();
        }
    }, [isInputFeedback, focusInputComment]);

    return (
        <Fragment>
            {/* content feedback */}
            {listFeedback.length > 0 && (
                <Fragment>
                    <div>
                        {listFeedback.map((feedback, index) => (
                            <ItemComment
                                key={index}
                                inforComment={feedback}
                                setIsDeletedFeedback={setIsDeletedFeedback}
                            />
                        ))}
                    </div>

                    {/* see more feef back */}
                    {totalPageFeedback !== 0 && totalPageFeedback !== curentPageFeedback + 1 && (
                        <div
                            className={cx('flex justify-start py-1 font-semibold text-black/50')}
                            onClick={seeMoreFeedback}
                        >
                            <span className={'cursor-pointer pr-4 hover:underline'}>{t('see_more_feedback')}</span>
                            {loading && (
                                <span>
                                    <Spinner className={'!h-4 !w-4'} />
                                </span>
                            )}
                        </div>
                    )}
                </Fragment>
            )}
            {/* input feedback */}
            {isInputFeedback && (
                <div className={cx('relative mt-4 flex items-center justify-start')}>
                    <div className="flex-shrink-0">
                        <img
                            className={cx(' h-6 w-6 rounded-full')}
                            src={inforPost?.author?.avatar ? inforPost?.author?.avatar : NoimageAvatar}
                            alt="Avatar"
                        />
                    </div>
                    <input
                        className="ml-4 w-full rounded-xl bg-background-color-secondnary px-4 py-2"
                        placeholder={t('write_feedback')}
                        ref={inputRef}
                        value={valueFeedBack}
                        onChange={(e) => setValueFeedBack(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="absolute right-3">
                        {loadingCreateFeedback ? (
                            <span>
                                <Spinner className={'!h-4 !w-4'} />
                            </span>
                        ) : (
                            <FontAwesomeIcon
                                className="cursor-pointer hover:text-text-color-link"
                                icon={faPaperPlane}
                                onClick={postFeedbackAPI}
                            />
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    );
}

Feedback.propTypes = {
    inforPost: PropTypes.object,
    inforComment: PropTypes.object.isRequired,
    isInputFeedback: PropTypes.bool.isRequired,
    focusInputComment: PropTypes.number.isRequired,
};
export default Feedback;
