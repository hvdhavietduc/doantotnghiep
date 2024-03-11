import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import styles from './ItemNews.module.scss';
import Image from '~/components/Image';
import ImgNew from './imgVideo.jpg';

const cx = classNames.bind(styles);

function ItemNews({ inforNew }) {
    const navigate = useNavigate();

    const openNewDetail = () => {
        navigate(inforNew.id);
    };

    return (
        <div className={cx('flex items-center justify-center ')} onClick={openNewDetail}>
            <div className={cx(' w-[240px] cursor-pointer overflow-hidden rounded-lg', 'hover:text-text-color-link ')}>
                <Image className={cx('h-[150px] w-full')} src={ImgNew} />
                <div className={cx('mt-2 pb-4 font-semibold leading-4')}>
                    {inforNew.title || 'name is not avaiable'}
                </div>
            </div>
        </div>
    );
}

ItemNews.propTypes = { inforNew: PropTypes.object.isRequired };

export default ItemNews;
