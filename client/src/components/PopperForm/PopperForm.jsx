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
        <div className={cx('container-wrapper')}>
            <Wrapper className={cx('wrapper')}>
                <button className={cx('btn-close')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className={cx('title')}> {title}</div>
                <form className={cx('form')} onSubmit={handleSubmitForm(onSave)}>
                    {children}
                    <div className={cx('container-btn')}>
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
