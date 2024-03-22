import classNames from 'classnames';
import { Fragment, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import ItemComment from './ItemComment';
import Spinner from '~/components/Spinner';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import { getAllCommentByPostId } from '~/services/forumService';
import config from '~/config';
import handleError from '~/config/handleError';
import notify from '~/utils/notify';

const cx = classNames;

function Comment({ inforPost, isInputComment }) {
    const [totalPage, setTotalPage] = useState(0);
    const [curentPage, setCurentPage] = useState(0);
    const [listComment, setListComment] = useState([]);
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });
    const [cookie] = useCookies(['token']);
    const inputRef = useRef();

    const getAllCommentByPostIdAPI = async () => {
        const token = cookie.token;
        await getAllCommentByPostId(token, inforPost.id)
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

    useEffect(() => {
        getAllCommentByPostIdAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isInputComment === true) {
            inputRef.current.focus();
        }
    }, [isInputComment]);

    return (
        <Fragment>
            <div className={cx('mt-2 w-full px-4')}>
                <div className={cx('mt-2')}>
                    {listComment.map((comment, index) => (
                        <ItemComment inforComment={comment} key={index} />
                    ))}
                </div>

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
                        />
                        <div className="absolute right-3 cursor-pointer hover:text-text-color-link">
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </div>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default Comment;
