import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import styles from './Video.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import ItemVideo from './ItemVideo';
import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import { getAllNews } from '~/services/NewsServices';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames.bind(styles);

function Video() {
    const [loading, setLoading] = useState(false);
    const [listVideo, setListVideo] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [totalPage, setTotalPage] = useState(1);

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['token']);
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation('translation', { keyPrefix: 'News' });

    const location = useLocation();
    const navigate = useNavigate();

    const currentPath = location.pathname;
    const currentPage = Number(currentPath.split('/')[2]);

    const paramater = config.getParamaterHeaderSecondnary().Video;

    const onPageChange = (value) => {
        const index = currentPath.lastIndexOf('/');
        const pathToPageChanged = currentPath.slice(0, index + 1) + String(value);
        navigate(pathToPageChanged);
    };

    useEffect(() => {
        // setLoading(true);
        // const token = cookies.token;
        // getAllNews(token, currentPage - 1, listVideo.size)
        //     .then((result) => {
        //         console.log(result);
        //         setLoading(false);
        //         setListVideo(result.listVideo);
        //         setTotalPage(result.totalPage);
        //         return;
        //     })
        //     .catch((error) => {
        //         setLoading(false);
        //         const messeageNotify = config.errorMesseage.getMesseageNotify();
        //         if (!error.response) {
        //             notify.error(messeageNotify.ERROR_NETWORD);
        //             return;
        //         }
        //     });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
    return (
        <div className={cx('mb-[40px] w-full')}>
            <HeaderSecondnary
                iconTitle={paramater.iconTitle}
                title={paramater.title}
                backgroundColor={paramater.backgroundColor}
                menuFilter={paramater.menuFilter}
            />
            <div
                className={cx(
                    'mt-[50px] grid w-full grid-cols-4 gap-y-6 px-[10%]',
                    'max-xl:grid-cols-3',
                    'max-lg:grid-cols-2',
                    'max-sm:grid-cols-1',
                    'wrapper',
                )}
            >
                {listVideo.map((news, index) => (
                    <ItemVideo key={index} inforNew={news} />
                ))}
            </div>
            <div>
                <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default Video;
