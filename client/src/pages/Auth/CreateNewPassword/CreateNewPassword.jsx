import classNames from 'classnames/bind';

import Input from '~/components/Input';
import styles from './CreateNewPassword.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function CreateNewPasswordl() {
    return (
        <WrapperAuth title="Create New Password">
            <form>
                <Input placeholder={'New password'} />
                <Input placeholder={'Repeate new password'} />
                <Button className={cx('btn')} primary rounded>
                    Confirm
                </Button>
            </form>
        </WrapperAuth>
    );
}

export default CreateNewPasswordl;
