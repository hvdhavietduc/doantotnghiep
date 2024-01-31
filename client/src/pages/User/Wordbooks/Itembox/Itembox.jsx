import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Itembox.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import EditFolder from '../EditFolder';
import DeleteFolder from '../DeleteFolder';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Itembox({
    nameFolder,
    numberWords,
    nameAuthor,
    description,
    avatarAuthor,
    idFolder,
    className,
    onPageChange,
}) {
    const [isPoperEditFolder, setIsPoperEditFolder] = useState(false);
    const [isPoperDeleteFolder, setIsPoperDeleteFolder] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });
    const navigate = useNavigate();

    const inforFolder = { nameFolder, idFolder, description };

    const classes = cx({
        [className]: className,
    });

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('menu-item')} onClick={(e) => showPoperEditFolder(e)}>
                    {t('edit')}
                </div>
                <div className={cx('menu-item')} onClick={(e) => showPoperDeleteFolder(e)}>
                    {t('delete')}
                </div>
            </PopperWrapper>
        </div>
    );

    const showPoperEditFolder = (e) => {
        e.stopPropagation();
        setIsPoperEditFolder(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperDeleteFolder = (e) => {
        e.stopPropagation();
        setIsPoperDeleteFolder(true);
        document.body.style.overflow = 'hidden';
    };

    const openDetailFolder = () => {
        navigate(String(idFolder));
    };

    return (
        <Fragment>
            <div className={classes} onClick={openDetailFolder}>
                <div className={cx('title')}>{nameFolder || 'No name'}</div>
                <div className={cx('count-word')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faBookOpen} />
                    <span className={cx('content')}>{numberWords + t('words')}</span>
                </div>

                <div className={cx('description')}>
                    {description && (description.length < 50 ? description : description.substr(0, 50) + '...')}
                </div>

                <div className={cx('user')}>
                    <div className={cx('inner-user')}>
                        <Image className={cx('avatar')} src={avatarAuthor} />
                        <span className={cx('name-user')}>{nameAuthor}</span>
                    </div>
                </div>

                <Tippy
                    interactive
                    delay={[0, 700]}
                    offset={[12, 8]}
                    placement="top-end"
                    zIndex={9}
                    render={renderResult}
                >
                    <div className={cx('menu')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </Tippy>
            </div>
            {isPoperEditFolder && (
                <EditFolder
                    setIsPoperEditFolder={setIsPoperEditFolder}
                    inforFolder={inforFolder}
                    onPageChange={onPageChange}
                />
            )}
            {isPoperDeleteFolder && (
                <DeleteFolder
                    setIsPoperDeleteFolder={setIsPoperDeleteFolder}
                    inforFolder={inforFolder}
                    onPageChange={onPageChange}
                />
            )}
        </Fragment>
    );
}

Itembox.propTypes = {
    nameFolder: PropTypes.string.isRequired,
    numberWords: PropTypes.number.isRequired,
    nameAuthor: PropTypes.string.isRequired,
    description: PropTypes.string,
    avatarAuthor: PropTypes.string.isRequired,
    idFolder: PropTypes.string.isRequired,
    className: PropTypes.string,
    onPageChange: PropTypes.func.isRequired,
};

export default Itembox;
