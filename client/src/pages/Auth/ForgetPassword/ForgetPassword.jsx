import classNames from 'classnames/bind';
import { useForm } from 'react-hook-form';

import Input from '~/components/Input';
import styles from './ForgetPassword.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import { valid } from '../logicAuth';
const cx = classNames.bind(styles);

function ForgetPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault();
    };

    return (
        <WrapperAuth title="Forget Password">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder={'Email'}
                    name={'email'}
                    {...register('email', valid.email)}
                    errolMesseage={errors.email?.message}
                />
                <Button className={cx('btn')} primary rounded>
                    Send email
                </Button>
            </form>
        </WrapperAuth>
    );
}

export default ForgetPassword;
