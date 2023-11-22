import classNames from 'classnames/bind';

import Input from '~/components/Input';
import styles from './ConfirmEmail.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ConfirmEmail() {
    return (
        <WrapperAuth title="Confirm Email">
            <form>
                <div className={cx('message')}>We have send code to your email successfully</div>
                <Input placeholder={'Enter code'} />
                <Button className={cx('btn')} primary rounded>
                    Confirm
                </Button>
            </form>
        </WrapperAuth>
    );
}

export default ConfirmEmail;
