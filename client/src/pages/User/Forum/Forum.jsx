import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useState, Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';

import HeaderSecondnary from '~/components/HeaderSecondnary';
import config from '~/config';
import MyPost from './MyPost';
import CreatePost from './CreatePost';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import Comunity from './Comunity';

const cx = classNames;

function Forum() {
    const [isPoperCreatePost, setIsPoperCreatePost] = useState(false);
    const [isBtnGoToTop, setIsBtnGoToTop] = useState(false);
    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });

    const location = useLocation();
    const navigate = useNavigate();

    const currentPageName = location.pathname.split('/')[2];
    const isMyPost = currentPageName === 'my_post';
    const isComunity = currentPageName === 'comunity';

    const avatar = localStorage.getItem('avatar');
    const paramater = config.getParamaterHeaderSecondnary().Forum;

    const showPoperAddPost = () => {
        setIsPoperCreatePost(true);
        document.body.style.overflow = 'hidden';
    };

    const onChangePage = (index) => {
        navigate(`/forum/${paramater.menuFilter[index].namePage}`);
    };

    const goToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop } = document.documentElement;
            if (scrollTop > 1000) {
                setIsBtnGoToTop(true);
            } else {
                setIsBtnGoToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Fragment>
            <div className={cx('relative mb-[100px] w-full ')}>
                <HeaderSecondnary
                    iconTitle={paramater.iconTitle}
                    title={paramater.title}
                    backgroundColor={paramater.backgroundColor}
                    menuFilter={paramater.menuFilter}
                    onChange={onChangePage}
                />
                <div className="mt-5 flex w-full justify-center">
                    <div
                        className={cx(
                            ' w-3/4 rounded-lg border border-gray-200 bg-white shadow',
                            ' hover:cursor-pointer dark:border-gray-700 dark:bg-gray-800 lg:w-1/2',
                        )}
                        onClick={showPoperAddPost}
                    >
                        <div className="flex items-center justify-center p-4">
                            <div className="flex-shrink-0">
                                <img
                                    className=" h-12 w-12 rounded-full"
                                    src={avatar ? avatar : NoimageAvatar}
                                    alt="Avatar"
                                />
                            </div>
                            <div
                                className={cx(
                                    'ms-4 min-w-0 flex-1 rounded-2xl border bg-gray-50 p-2 text-gray-400 outline-slate-100',
                                    'hover:bg-background-color-secondnary',
                                )}
                            >
                                {t('what_is_on_your_mind')}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex w-full flex-col items-center gap-6">
                    {isMyPost ? <MyPost /> : isComunity ? <Comunity /> : <></>}
                </div>
            </div>
            {isBtnGoToTop && (
                <Tippy content="Go to top">
                    <div
                        className={cx(
                            'fixed bottom-16 right-16 h-8 w-8  rounded-full bg-background-color-secondnary text-xl shadow-2xl',
                            'flex items-center justify-center',
                            'hover:cursor-pointer hover:bg-text-color-link hover:text-text-color-secondnary',
                        )}
                        onClick={goToTop}
                    >
                        <FontAwesomeIcon icon={faArrowUp} />
                    </div>
                </Tippy>
            )}

            {isPoperCreatePost && <CreatePost setIsPoperCreatePost={setIsPoperCreatePost} />}
        </Fragment>
    );
}

export default Forum;
