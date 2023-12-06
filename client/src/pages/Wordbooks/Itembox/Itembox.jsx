import classNames from 'classnames/bind';
// import { Fragment, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Itembox.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
// import Loading from '~/components/Loading';
// import { forgotPassword } from '~/services/authServices';
// import config from '~/config';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function Itembox({ nameFolder, numberWords, nameAuthor, avatarAuthor, idFolder, className }) {
    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });

    const classes = cx({
        [className]: className,
    });

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('menu-item')}>{t('edit')}</div>
                <div className={cx('menu-item')}>{t('delete')}</div>
            </PopperWrapper>
        </div>
    );
    return (
        <Fragment>
            <div className={classes}>
                <div className={cx('title')}>{nameFolder || 'No name'}</div>
                <div className={cx('count-word')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faBookOpen} />
                    <span className={cx('content')}>{numberWords + t('words')}</span>
                </div>
                <div className={cx('user')}>
                    <div className={cx('inner-user')}>
                        <img className={cx('avatar')} alt={'NoImage'} src={avatarAuthor} />
                        <span className={cx('name-user')}>{nameAuthor}</span>
                    </div>
                </div>
                <Tippy interactive delay={[0, 700]} offset={[12, 8]} placement="top-end" render={renderResult}>
                    <div className={cx('menu')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </Tippy>
            </div>
        </Fragment>
    );
}

export default Itembox;
