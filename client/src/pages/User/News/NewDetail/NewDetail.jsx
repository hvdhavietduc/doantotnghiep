import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import styles from './NewDetail.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import ItemNews from '../ItemNews';
import Loading from '~/components/Loading';
import Image from '~/components/Image';
import { getDetailNews } from '~/services/NewsServices';
import notify from '~/utils/notify';
import config from '~/config';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';

const cx = classNames.bind(styles);

function NewDetail() {
    const [loading, setLoading] = useState(false);
    const [inforNews, setInforNews] = useState({});

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['token']);

    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation('translation', { keyPrefix: 'News' });

    const paramater = config.getParamaterHeaderSecondnary().News;

    const currentPath = location.pathname;
    const NewsId = String(currentPath.split('/')[3]);

    const listNewsSuggesion = [1, 2, 3, 4, 5, 6];

    useEffect(() => {
        setLoading(true);
        const token = cookies.token;
        getDetailNews(NewsId, token)
            .then((result) => {
                setLoading(false);
                setInforNews(result);
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
            <div className={cx('new-container mt-20  px-[18%]', 'max-sm:px-[5%]')}>
                <div className={cx('text-3xl font-medium')}>{inforNews.title}</div>
                <div className={cx('mt-4 flex flex-wrap items-center justify-start gap-2 text-sm')}>
                    <Image src="" fallback={NoimageAvatar} className={cx(' h-5 w-5 rounded-full')} />
                    <div className={cx('font-semibold')}>Minh Phương</div>
                    <div className={cx('text-black/50')}>Wednesday, September 20, 2023 - 15:45</div>
                </div>
                <Image src="" className={cx('mt-12 w-full rounded-sm')} />

                <p className={cx('mt-4 text-lg')}>
                    Governor of Poltava province, Mr. Dmytro Lunin, said that on the night of September 19, Russia
                    raided the Ukrainian oil refinery in the city of Kremenchuk, causing a fire. The attack caused the
                    factory to temporarily suspend operations, but there are currently no reports of casualties.
                    <br />
                    <br />
                    "Last night, Russia continuously attacked Poltava. Our air defense system effectively blocked enemy
                    UAVs," Mr. Lunin said. According to the Ukrainian military, their air defense system shot down 17
                    out of 24 Russian UAVs in the raid. This is Ukraine's largest oil refinery. Since the conflict broke
                    out more than a year ago, Russia has continuously targeted this oil refinery facility.
                    <br />
                    <br />
                    On the same day, the Russian Ministry of Defense said Ukraine had attacked with UAVs in Russia's
                    Belgorod and Oryol border areas late on September 19. This morning, September 20, a UAV believed to
                    be from Ukraine also attacked a large oil tank near the airport in Sochi, Russia on the Black Sea
                    coast.
                    <br />
                    <br />
                    According to local media, the raided oil tank contained about 1,200 tons of oil. "Authorities are
                    continuing to investigate the cause of the fire," Krasnodar Region Governor Veniamin Kondratyev
                    said, adding that there were no casualties in the incident. In recent months, Ukraine has been
                    accused of increasing UAV and missile raids deep into Russian territory and Russian-controlled
                    areas. Ukrainian President Volodymyr Zelensky announced in July that war was gradually returning to
                    Russian territory and that this was "inevitable".
                </p>
                <div className={cx('mt-4 h-[2px] w-full bg-primary-color')}></div>
                <div className={cx('mt-6 text-xl font-semibold')}>{t('of_interesting')}</div>
                <div
                    className={cx(
                        'mt-[50px] grid w-full grid-cols-3 gap-y-6',
                        'max-xl:grid-cols-2',
                        'max-lg:grid-cols-1',
                        'wrapper',
                    )}
                >
                    {listNewsSuggesion.map((news, index) => (
                        <ItemNews key={index} inforNew={{}} />
                    ))}
                </div>
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default NewDetail;
