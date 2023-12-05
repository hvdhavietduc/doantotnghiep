import classNames from 'classnames/bind';
// import { Fragment, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// import Input from '~/components/Input';
import styles from './Wordbooks.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import avatar from '~/assets/img/avatarWordbooks.jpg';
// import Loading from '~/components/Loading';
// import Button from '~/components/Button';
// import { forgotPassword } from '~/services/authServices';
// import { addInforVerify } from '~/redux/userSlice';
// import notify from '~/utils/notify';
import config from '~/config';
import Itembox from './Itembox';

const cx = classNames.bind(styles);

function Wordbooks() {
    const paramater = config.getParamaterHeaderSecondnary().wordbooks;
    return (
        <div className={cx('wordbooks')}>
            <HeaderSecondnary
                iconTitle={paramater.iconTitle}
                title={paramater.title}
                backgroundColor={paramater.backgroundColor}
                menuFilter={paramater.menuFilter}
            />
            <div className={cx('wrapper')}>
                <div className={cx('item-box', 'create-folder')}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span className={cx('content')}>Create folder</span>
                </div>
                <Itembox className={cx('item-box')} />
                <Itembox className={cx('item-box')} />
                <Itembox className={cx('item-box')} />
                <Itembox className={cx('item-box')} />
                <Itembox className={cx('item-box')} />
                <Itembox className={cx('item-box')} />
                <Itembox className={cx('item-box')} />
            </div>
        </div>
    );
}

export default Wordbooks;
