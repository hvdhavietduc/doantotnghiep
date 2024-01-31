import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '~/components/Loading';
import styles from './ManageWordFolder.module.scss';
import classNames from 'classnames/bind';

import { useTranslation } from 'react-i18next';
import notify from '~/utils/notify';

const cx = classNames.bind(styles);

function ManageWordFolder() {
    const [loading, setLoading] = useState(false);

    return <div className={cx('')}>Hello{loading && <Loading />}</div>;
}

export default ManageWordFolder;
