import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Wrapper } from '../Popper';
import styles from './PopperConfirm.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function PopperConfirm({ children, onClose, onSave }) {
    const { t } = useTranslation('translation');
    return (
        <div className={cx('container-wrapper')}>
            <Wrapper className={cx('wrapper')}>
                <button className={cx('btn-close')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className={cx('text-confirm')}>{children}</div>
                <div className={cx('container-btn')}>
                    <Button type={'submit'} primary onClick={onSave}>
                        {t('WordBooks.yes')}
                    </Button>
                    <Button type={'WordBooks.button'} red onClick={onClose}>
                        {t('WordBooks.no')}
                    </Button>
                </div>
            </Wrapper>
        </div>
    );
}

PopperConfirm.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default PopperConfirm;
