import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import Feedback from '../Feedback';
import PopperMenu from '~/components/PopperMenu';
import getListItemInMenuPopper from '~/config/listItemInMenuPopper';
import { deleteCommentOfPost, deleteCommentOfComment } from '~/services/forumService';
import config from '~/config';
import handleError from '~/config/handleError';
import notify from '~/utils/notify';
import Spinner from '~/components/Spinner';

const cx = classNames;

function ItemComment({ inforComment, inforPost, setIsDeleted, setIsDeletedFeedback }) {
    const [isInputFeedback, setIsInputFeedback] = useState(false);
    const [focusInputComment, setFocusInputComment] = useState(0);
    const [isBtnOperationCmt, setIsBtnOperationCmt] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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

        return t('just_finished');
    };

    const showInputFeedback = () => {
        setIsInputFeedback(true);
        setFocusInputComment(focusInputComment + 1);
    };

    const showBtnOperationCMT = () => {
        setIsBtnOperationCmt(true);
    };

    const hideBtnOperationCMT = () => {
        setIsBtnOperationCmt(false);
    };

    const DeleteCommentOfPostAPI = async () => {
        const token = cookie.token;
        setIsDeleting(true);
        await deleteCommentOfPost(token, inforPost.id, inforComment.id)
            .then(() => {
                setIsDeleting(false);
                setIsDeleted(true);
            })
            .catch((error) => {
                setIsDeleting(false);
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

    const DeleteCommentOfCommentAPI = async () => {
        const token = cookie.token;
        setIsDeleting(true);
        await deleteCommentOfComment(token, inforComment.parentId, inforComment.id)
            .then(() => {
                setIsDeleting(false);
                setIsDeletedFeedback(true);
            })
            .catch((error) => {
                setIsDeleting(false);
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

    const handleClickItemToOperationCMT = (data) => {
        switch (data.code) {
            case 'delete':
                if (inforComment.parentId) {
                    DeleteCommentOfCommentAPI();
                } else {
                    DeleteCommentOfPostAPI();
                }

                break;
            default:
        }
    };

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
                <div className="pr-6" onMouseEnter={showBtnOperationCMT} onMouseLeave={hideBtnOperationCMT}>
                    <div className="relative inline-block rounded-2xl bg-background-color-secondnary px-3 py-2">
                        <div className="font-semibold">Trái Cà tím</div>
                        <div>{inforComment.content}</div>
                        {isBtnOperationCmt && !isDeleting && (
                            <PopperMenu
                                items={getListItemInMenuPopper().forum.ItemComment}
                                handleClick={handleClickItemToOperationCMT}
                            >
                                <FontAwesomeIcon
                                    className="absolute bottom-[50%] right-[-20px] translate-y-[50%] cursor-pointer"
                                    icon={faEllipsis}
                                />
                            </PopperMenu>
                        )}

                        {isDeleting && (
                            <div className="absolute bottom-[50%] right-[-20px] translate-y-[50%] cursor-pointer">
                                <Spinner className={'!h-4 !w-4'} />
                            </div>
                        )}
                    </div>
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

                <Feedback
                    inforPost={inforPost}
                    inforComment={inforComment}
                    isInputFeedback={isInputFeedback}
                    focusInputComment={focusInputComment}
                />
            </div>
        </div>
    );
}

ItemComment.propTypes = {
    inforPost: PropTypes.object,
    inforComment: PropTypes.object.isRequired,
    setIsDeleted: PropTypes.func,
    setIsDeletedFeedback: PropTypes.func,
};
export default ItemComment;
