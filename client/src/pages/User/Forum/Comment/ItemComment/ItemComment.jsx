import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Fragment, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import Spinner from '~/components/Spinner';
import Loading from '~/components/Loading';
import { getCommentOfComment, createComment } from '~/services/forumService';
import config from '~/config';
import handleError from '~/config/handleError';
import notify from '~/utils/notify';

const cx = classNames;

function ItemComment({ inforComment, inforPost }) {
    const [totalPageFeedback, setTotalPageFeedback] = useState(0);
    const [curentPageFeedback, setCurentPageFeedback] = useState(0);
    const [listFeedback, setListFeedback] = useState([]);
    const [valueFeedBack, setValueFeedBack] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingGeneral, setLoadingGeneral] = useState(false);
    const [isInputFeedback, setIsInputFeedback] = useState(false);
    const [loadingCreateFeedback, setLoadingCreateFeedback] = useState(false);
    const inputRef = useRef();

    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });
    const [cookie] = useCookies(['token']);

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
            return String(Math.floor(timeconverted)) + ' ' + t('minute');
        }

        return String(Math.floor(timeconverted)) + ' ' + t('just_finished');
    };

    const getAllCommentOfCommentAPI = async () => {
        const token = cookie.token;
        setLoadingGeneral(true);
        await getCommentOfComment(token, inforComment.id)
            .then((result) => {
                setTotalPageFeedback(result.totalPage);
                setListFeedback(result.comments);
                setLoadingGeneral(false);
            })
            .catch((error) => {
                setLoadingGeneral(false);
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

    const seeMoreComment = async () => {
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

    const showInputFeedback = () => {
        setIsInputFeedback(true);
        inputRef?.current?.focus();
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
        if (isInputFeedback === true) {
            inputRef.current.focus();
        }
    }, [isInputFeedback]);

    return (
        <div className={cx('mt-3 flex')}>
            <div className="flex-shrink-0">
                {/* content avatar */}
                <img
                    className={cx(' rounded-full', {
                        'h-8 w-8': inforComment.childIds.length > 0,
                        'h-6 w-6': inforComment.childIds.length === 0,
                    })}
                    src={inforPost?.author?.avatar ? inforPost?.author?.avatar : NoimageAvatar}
                    alt="Avatar"
                />
            </div>

            <div className="ml-2 text-sm">
                {/* content comment */}
                <div className="rounded-2xl bg-background-color-secondnary px-3 py-2">
                    <div className="font-semibold">Trái Cà tím</div>
                    <div>{inforComment.content}</div>
                </div>
                {/* action to comment */}
                <div className="flex justify-start gap-2 pl-4 text-[12px] font-semibold text-black/70">
                    <span className="font-medium">{convertTime(differenceInTime)}</span>
                    <span className={'cursor-pointer hover:underline'}>{t('like')}</span>
                    {!inforComment.parentId && (
                        <span className={'cursor-pointer hover:underline'} onClick={showInputFeedback}>
                            {t('feedback')}
                        </span>
                    )}
                </div>

                {/* content feedback */}
                {listFeedback.length > 0 && (
                    <Fragment>
                        <div>
                            {listFeedback.map((feedback, index) => (
                                <ItemComment key={index} inforComment={feedback} />
                            ))}
                        </div>

                        {/* see more feef back */}
                        {totalPageFeedback !== 0 && totalPageFeedback !== curentPageFeedback + 1 && (
                            <div
                                className={cx('flex justify-start py-1 font-semibold text-black/50')}
                                onClick={seeMoreComment}
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
            </div>

            {loadingGeneral && <Loading />}
        </div>
    );
}

ItemComment.propTypes = {
    inforPost: PropTypes.object,
    inforComment: PropTypes.object.isRequired,
};
export default ItemComment;
