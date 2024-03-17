import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import styles from './Video.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import ItemVideo from './ItemVideo';
import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import { getAllVideos } from '~/services/videoService';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames.bind(styles);

function Video() {
    const [loading, setLoading] = useState(false);
    const [listVideo, setListVideo] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    const [cookies] = useCookies(['token']);

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
        setLoading(true);
        const token = cookies.token;
        getAllVideos(token, currentPage - 1, listVideo.size)
            .then((result) => {
                setLoading(false);
                setListVideo(result.videos);
                setTotalPage(result.totalPage);
                return;
            })
            .catch((error) => {
                setLoading(false);
                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
            });
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
                {listVideo.map((video, index) => (
                    <ItemVideo key={index} inforVideo={video} />
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
