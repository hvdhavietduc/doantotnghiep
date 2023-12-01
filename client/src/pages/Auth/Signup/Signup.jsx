import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Input from '~/components/Input';
import styles from './Signup.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import valid from '../validateAuth';
import config from '~/config';
import { addInforVerify } from '~/redux/userSlice';
import { signup } from '~/services/authServices';
import notify from '~/utils/notify';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function Signup() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data, e) => {
        e.preventDefault();

        //valid comfim password
        const isValid = data.password === data.passwordConfirm;
        if (isValid === false) {
            setError('passwordConfirm', { type: 'custom', message: config.errorMesseage.PASSWORD_NOT_MATCH });
            return;
        }

        const formData = {
            name: data.fullname,
            username: data.username,
            password: data.password,
            email: data.email,
        };

        setLoading(true);
        signup(formData)
            .then(() => {
                setLoading(false);
                dispatch(addInforVerify(data));
                notify.success(config.notification.SIGNUP_SUCCESS);
                navigate(config.routes.auth.VERIFYREGISTER);
                return;
            })
            .catch((error) => {
                setLoading(false);

                if (!error.response) {
                    notify.error(config.errorMesseage.ERROR_NETWORD);
                    return;
                }

                notify.error(error.response.data.message);
                if (error.response.status === 400) {
                    const { message } = error.response.data;

                    if (message.includes(config.errorMesseage.USERNAME_EXIST)) {
                        setError('username', { type: 'custom', message: message });
                        return;
                    }
                    if (message.includes(config.errorMesseage.EMAIL_EXIST)) {
                        setError('email', { type: 'custom', message: message });
                        return;
                    }
                }
                return;
            });
    };

    return (
        <Fragment>
            <WrapperAuth title="Sign up">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder={'Full name'}
                        name={'fullname'}
                        autoComplete={'name'}
                        {...register('fullname', valid.fullName)}
                        errolMesseage={errors.fullname?.message}
                    />

                    <Input
                        placeholder={'Username'}
                        name={'username'}
                        autoComplete={'username'}
                        {...register('username', valid.userName)}
                        errolMesseage={errors.username?.message}
                    />

                    <Input
                        placeholder={'Email'}
                        name={'email'}
                        autoComplete={'email'}
                        {...register('email', valid.email)}
                        errolMesseage={errors.email?.message}
                    />

                    <Input
                        placeholder={'Password'}
                        name={'password'}
                        type={'password'}
                        autoComplete={'new-password'}
                        {...register('password', valid.password)}
                        errolMesseage={errors.password?.message}
                    />

                    <Input
                        placeholder={'Repeat Password'}
                        name={'passwordConfirm'}
                        type={'password'}
                        autoComplete={'new-password'}
                        {...register('passwordConfirm', valid.passwordConfirm)}
                        errolMesseage={errors.passwordConfirm?.message}
                    />

                    <Button className={cx('btn')} primary rounded>
                        Sign up
                    </Button>
                </form>
                <div className={cx('modifer')} id="modifer">
                    <Link to={config.routes.auth.LOGIN}>You have account? Login</Link>
                </div>
            </WrapperAuth>
            {loading && <Loading />}
        </Fragment>
    );
}

export default Signup;
