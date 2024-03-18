import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllPostForum } from '~/services/forumService';
import Post from '../Post';
import { useCookies } from 'react-cookie';
import Loading from '~/components/Loading';
import Spinner from '~/components/Spinner';
import { setAllPostReducer } from '~/redux/allPostForumSlice';
import config from '~/config';
import handleError from '~/config/handleError';
import notify from '~/utils/notify';

function MyPost() {
    const [loading, setLoading] = useState(false);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);

    const [cookie, setCookie] = useCookies(['token']);
    const [totalPage, setTotalPage] = useState(0);
    const [curentPage, setCurentPage] = useState(1);

    const dispatch = useDispatch();

    const allPost = useSelector((state) => state.comunityPost.allPost);

    const getAllPostForumAPI = async () => {
        setLoading(true);
        const token = cookie.token;
        await getAllPostForum(token)
            .then((result) => {
                dispatch(setAllPostReducer(result.listPost));
                setTotalPage(result.totalPage);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                const messeageNotify = config.forum.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
            });
    };

    useEffect(() => {
        getAllPostForumAPI();
    }, []);

    const handleScroll = async () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoadingSpinner) {
            const token = cookie.token;
            setCurentPage(curentPage + 1);
            if (curentPage < totalPage) {
                setIsLoadingSpinner(true);
                await getAllPostForum(token, curentPage)
                    .then((result) => {
                        dispatch(setAllPostReducer([...allPost, ...result.listPost]));
                        setTotalPage(result.totalPage);
                        setIsLoadingSpinner(false);
                    })
                    .catch((error) => {
                        setIsLoadingSpinner(false);
                    });
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <Fragment>
            {allPost.map((post, index) => (
                <Post key={index} post={post} />
            ))}
            {isLoadingSpinner && <Spinner />}

            {loading && <Loading />}
        </Fragment>
    );
}

export default MyPost;
