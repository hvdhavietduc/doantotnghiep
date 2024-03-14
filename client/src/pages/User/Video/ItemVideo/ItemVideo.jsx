import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import styles from './ItemVideo.module.scss';
import Image from '~/components/Image';
import ImgVideo from './imgVideo.jpg';
import noImageAvatar from '~/assets/img/noImageAvatar.png';
import config from '~/config';

const cx = classNames.bind(styles);

function ItemVideo({ inforVideo, pageDetail }) {
    const navigate = useNavigate();

    const openNewDetail = () => {
        navigate(config.routes.video.VIDEO + '/*/' + inforVideo.id);
    };

    return (
        <div
            className={cx('flex items-center justify-center ', { 'h-[120px] !items-start': pageDetail })}
            onClick={openNewDetail}
        >
            <div
                className={cx(
                    'flex w-[240px] cursor-pointer flex-wrap overflow-hidden rounded-lg',
                    'hover:!text-text-color-link ',
                    { 'w-full justify-between': pageDetail },
                )}
            >
                <Image className={cx('h-[150px] w-full', { 'h-[92px] !w-[170px]': pageDetail })} src={ImgVideo} />
                <div className={cx({ 'w-[170px] text-sm': pageDetail })}>
                    <div className={cx('mt-2 font-semibold leading-4', { '!mt-0': pageDetail })}>
                        {inforVideo?.title || 'name is not avaiable'}
                    </div>
                    <div className={cx('mt-1 flex items-center font-medium', { 'mt-2': pageDetail })}>
                        <Image
                            className={cx('mr-3 h-[25px] w-[25px] rounded-full')}
                            src={''}
                            fallback={noImageAvatar}
                        />
                        <div>{inforVideo?.nameAuthor || 'Pen channel'}</div>
                    </div>
                    <div className={cx('mt-1 flex items-center pb-4 font-medium')}>26.N view - 4 hours ago</div>
                </div>
            </div>
        </div>
    );
}

ItemVideo.propTypes = { inforVideo: PropTypes.object.isRequired };

export default ItemVideo;
