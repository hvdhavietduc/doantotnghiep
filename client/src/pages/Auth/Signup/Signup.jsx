import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Input from '~/components/Input';
import styles from './Signup.module.scss';
import WrapperAuth from '../WrapperAuth';
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
        clearErrors,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

    const onSubmit = (data, e) => {
        e.preventDefault();

        const messeageNotify = config.errorMesseage.getMesseageNotify();
        //valid comfim password
        const isValid = data.password === data.passwordConfirm;
        if (isValid === false) {
            setError('passwordConfirm', {
                type: 'custom',
                message: messeageNotify.PASSWORD_NOT_MATCH,
            });
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
                notify.success(config.notification().SIGNUP_SUCCESS);
                navigate(config.routes.auth.VERIFYREGISTER);
                return;
            })
            .catch((error) => {
                setLoading(false);

                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }

                if (error.response.status === 400) {
                    const { message } = error.response.data;
                    const { messeageLogic } = config.errorMesseage;

                    if (message.includes(messeageLogic.USERNAME_EXIST)) {
                        setError('username', { type: 'custom', message: messeageNotify.USERNAME_EXIST });
                        notify.error(messeageNotify.USERNAME_EXIST);
                        return;
                    }
                    if (message.includes(messeageLogic.EMAIL_EXIST)) {
                        setError('email', { type: 'custom', message: messeageNotify.EMAIL_EXIST });
                        notify.error(messeageNotify.EMAIL_EXIST);
                        return;
                    }
                }
                notify.error(error.response.data.message);
                return;
            });
    };

    return (
        <Fragment>
            <WrapperAuth title={t('signup')} clearErrors={clearErrors}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder={t('full_name')}
                        name={'fullname'}
                        autoComplete={'name'}
                        {...register('fullname', valid.fullName)}
                        errolMesseage={errors.fullname?.message}
                    />

                    <Input
                        placeholder={t('username')}
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
                        placeholder={t('password')}
                        name={'password'}
                        type={'password'}
                        autoComplete={'new-password'}
                        {...register('password', valid.password)}
                        errolMesseage={errors.password?.message}
                    />

                    <Input
                        placeholder={t('repeat_password')}
                        name={'passwordConfirm'}
                        type={'password'}
                        autoComplete={'new-password'}
                        {...register('passwordConfirm', valid.passwordConfirm)}
                        errolMesseage={errors.passwordConfirm?.message}
                    />

                    <Button primary rounded>
                        {t('signup')}
                    </Button>
                </form>
                <div className={cx('mt-5 flex !justify-center ')}>
                    <Link className={cx('hover:underline')} to={config.routes.auth.LOGIN}>
                        {t('you_have_account_login')}
                    </Link>
                </div>
            </WrapperAuth>
            {loading && <Loading />}
        </Fragment>
    );
}

export default Signup;
