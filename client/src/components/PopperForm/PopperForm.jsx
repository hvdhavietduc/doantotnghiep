import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Wrapper } from '../Popper';
import styles from './PopperForm.module.scss';
import Button from '../Button';

const cx = classNames.bind(styles);

function PopperForm({ children, onClose, onSave, handleSubmitForm, title }) {
    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });
    return (
        <div className={cx('fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-slate-600/50')}>
            <Wrapper
                className={cx(
                    'relative !w-[700px] px-[70px] py-10',
                    'max-md:!w-[500px] max-md:px-12 max-md:py-10',
                    'wrapper',
                )}
            >
                <button className={cx('absolute right-[10px] top-[6px] text-2xl font-semibold')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className={cx('mb-3 mt-5 text-3xl font-semibold')}> {title}</div>
                <form onSubmit={handleSubmitForm(onSave)}>
                    {children}
                    <div className={cx('flex justify-between')}>
                        <Button type={'submit'} primary>
                            {t('save')}
                        </Button>
                        <Button type={'button'} red onClick={onClose}>
                            {t('cancel')}
                        </Button>
                    </div>
                </form>
            </Wrapper>
        </div>
    );
}

PopperForm.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    handleSubmitForm: PropTypes.func.isRequired,
};

export default PopperForm;
