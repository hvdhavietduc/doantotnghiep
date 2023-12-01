import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Input from '~/components/Input';
import styles from './CreateNewPassword.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { resetPassword } from '~/services/authServices';
import { deleteInforVerify } from '~/redux/userSlice';
import notify from '~/utils/notify';
import valid from '../validateAuth';
import config from '~/config';

const cx = classNames.bind(styles);

function CreateNewPassword() {
    const { inforVerify } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const hideEmail = (email) => {
        const atIndex = email.indexOf('@');
        const visibleSuffix = email.slice(atIndex - 3);
        const hiddenEmail = '*'.repeat(10) + visibleSuffix;
        return hiddenEmail;
    };

    const onSubmit = (formData, e) => {
        e.preventDefault();

        //valid comfim password
        const isValid = formData.password === formData.passwordConfirm;
        if (isValid === false) {
            setError('passwordConfirm', { type: 'custom', message: config.errorMesseage.PASSWORD_NOT_MATCH });
            return;
        }

        const data = {
            email: inforVerify.email,
            code: formData.code,
            password: formData.password,
        };
        setLoading(true);
        resetPassword(data)
            .then(() => {
                setLoading(false);
                notify.success(config.notification.CREATE_NEW_PASSWORD_SUCCESS);
                dispatch(deleteInforVerify());
                navigate(config.routes.auth.LOGIN);
                return true;
            })
            .catch((error) => {
                setLoading(false);
                if (!error.response) {
                    notify.error(config.errorMesseage.ERROR_NETWORD);
                    return;
                }
                notify.error(error.response.data.message);
            });
    };

    if (!inforVerify) return <div>Cannot access this page</div>;

    return (
        <Fragment>
            <WrapperAuth title="Create New Password" BackLoginPage>
                <div className={cx('message')}>We have send code to {hideEmail(inforVerify.email)} successfully</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        name={'code'}
                        placeholder={'Enter code'}
                        autoComplete={'one-time-code'}
                        {...register('code', valid.code)}
                        errolMesseage={errors.code?.message}
                    />

                    <Input
                        placeholder={'New password'}
                        name={'password'}
                        type={'password'}
                        autoComplete={'new-password'}
                        {...register('password', valid.password)}
                        errolMesseage={errors.password?.message}
                    />

                    <Input
                        placeholder={'Repeate new password'}
                        name={'passwordConfirm'}
                        type={'password'}
                        autoComplete={'new-password'}
                        {...register('passwordConfirm', valid.passwordConfirm)}
                        errolMesseage={errors.passwordConfirm?.message}
                    />
                    <Button className={cx('btn')} primary rounded>
                        Confirm
                    </Button>
                </form>
            </WrapperAuth>
            {loading && <Loading />}
        </Fragment>
    );
}

export default CreateNewPassword;
