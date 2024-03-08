import classNames from 'classnames/bind';
//import PropTypes from 'prop-types';

import styles from './ItemNews.module.scss';
import Image from '~/components/Image';
import ImgNew from './imgVideo.jpg';

const cx = classNames.bind(styles);

function ItemNews() {
    return (
        <div className={cx('flex items-center justify-center ')}>
            <div className={cx(' w-[240px] cursor-pointer overflow-hidden rounded-lg', 'hover:text-text-color-link ')}>
                <Image className={cx('h-[150px] w-full')} src={ImgNew} />
                <div className={cx('mt-2 pb-4 font-semibold leading-4')}>
                    Defend and buy time: Russia's new Ukraine strategy?
                </div>
            </div>
        </div>
    );
}

ItemNews.propTypes = {};

export default ItemNews;
