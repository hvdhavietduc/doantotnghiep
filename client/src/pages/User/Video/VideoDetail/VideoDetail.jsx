import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

import styles from './VideoDetail.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import ItemVideo from '../ItemVideo';
import Loading from '~/components/Loading';
import Image from '~/components/Image';
import ReactPlayer from 'react-player';
import { getDetailVideo } from '~/services/videoService';
import notify from '~/utils/notify';
import config from '~/config';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NewDetail() {
    const [loading, setLoading] = useState(false);
    const [inforVideo, setInforVideo] = useState({});

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['token']);

    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation('translation', { keyPrefix: 'News' });

    const paramater = config.getParamaterHeaderSecondnary().Video;

    const currentPath = location.pathname;
    const VideoId = String(currentPath.split('/')[3]);

    const listVideoSuggesion = [1, 2, 3, 4, 5, 6];

    useEffect(() => {
        setLoading(true);
        const token = cookies.token;
        getDetailVideo(VideoId, token)
            .then((result) => {
                setLoading(false);
                setInforVideo(result);
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
    }, [currentPath]);

    return (
        <div className={cx('mb-[80px] w-full')}>
            <HeaderSecondnary
                iconTitle={paramater.iconTitle}
                title={paramater.title}
                backgroundColor={paramater.backgroundColor}
                menuFilter={paramater.menuFilter}
            />
            <div
                className={cx(
                    'new-container mt-20  flex flex-wrap justify-between gap-y-4 px-[10%]',
                    'max-[1350px]:justify-center max-[1350px]:px-[5%]',
                )}
            >
                <div className={cx('w-[700px] overflow-hidden')}>
                    <ReactPlayer
                        url={inforVideo.url}
                        controls
                        className={cx(
                            '!h-[390px] !w-full overflow-hidden rounded-xl',
                            'max-md:h-[310px] max-md:w-[500px]',
                        )}
                    />
                    <div className={cx('mt-1 text-3xl font-medium')}>{inforVideo.title}</div>
                    <div className={cx('mt-4 flex flex-wrap items-center justify-start gap-2 text-base')}>
                        <Image src="" fallback={NoimageAvatar} className={cx(' h-5 w-5 rounded-full')} />
                        <div className={cx('font-semibold')}>Minh Phương</div>
                        <div className={cx('w-full font-medium')}>26.N view - 4 hours ago</div>
                    </div>
                    <Button primary rightIcon={faChevronCircleDown} className={cx('mt-10 rounded-full px-3')}>
                        Show transcripts
                    </Button>
                    <div className={cx('mt-3 text-justify')}>
                        Thanks for attending this management meeting. As you know, (89) despite our strategy of
                        positioning ourselves as a seller of high-quality furniture, (90) we've been losing business to
                        several secondhand stores selling used furniture in the area. There's one thing that we can
                        start doing that many other furniture stores aren't: offering free assembly. By developing
                        cross-functional delivery teams, we'll be able to gain a competitive edge. So (91) next month,
                        all of our delivery teams will attend sessions where they'll learn how to assemble our products
                        in customers' homes.
                    </div>
                </div>
                <div className={cx('w-[350px]')}>
                    {listVideoSuggesion.map((video, index) => (
                        <ItemVideo key={index} inforVideo={{}} pageDetail />
                    ))}
                </div>
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default NewDetail;
