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
        <div className={cx('fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-slate-600/50')}>
            <Wrapper
                className={cx(
                    'relative !w-auto translate-y-[-100px] px-[70px] !pt-10 pb-5',
                    'max-md:!w-[500px] max-md:px-12 max-md:py-10',
                    'wrapper',
                )}
            >
                <button className={cx('absolute right-[10px] top-[6px] text-2xl font-semibold')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>

                <div className={cx('mb-5 text-center')}>{children}</div>
                <div className={cx('flex justify-between')}>
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
