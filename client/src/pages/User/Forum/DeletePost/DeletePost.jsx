import PropTypes from 'prop-types';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

import Loading from '~/components/Loading';
import PopperConfirm from '~/components/PopperConfirm';
import { deletePost } from '~/services/forumService';
import notify from '~/utils/notify';
import config from '~/config';
import { deletePostByIdReducer } from '~/redux/myPostSlice';
import { deletePostByIdReducer as deletePostByIdForumReducer } from '~/redux/allPostForumSlice';
import handleError from '~/config/handleError';

function DeletePost({ setIsPoperDeletePost, postId }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const dispatch = useDispatch();

    const closePoper = () => {
        setIsPoperDeletePost(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleDeletetPost = async () => {
        await deletePost(cookies.token, postId);
        dispatch(deletePostByIdReducer(postId));
        dispatch(deletePostByIdForumReducer(postId));
        setIsPoperDeletePost(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.forum.notification().DELETE_POST_SUCCESS);
    };

    const handleDeletetPost = async () => {
        setLoading(true);
        handleMiddleDeletetPost().catch((error) => {
            setLoading(false);
            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }
            const { message } = error.response.data;
            const configLogic = config.forum;
            handleError(configLogic, message);
        });
    };

    return (
        <Fragment>
            <PopperConfirm onClose={closePoper} onSave={handleDeletetPost}>
                {t('are_you_sure_to_delete_post')}
            </PopperConfirm>

            {loading && <Loading />}
        </Fragment>
    );
}

DeletePost.propTypes = {
    setIsPoperDeletePost: PropTypes.func.isRequired,
    inforFolder: PropTypes.object.isRequired,
};

export default DeletePost;
