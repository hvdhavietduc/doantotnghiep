import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import styles from './Login.module.scss';
import Input from '~/components/Input';
import WrapperAuth from '../WrapperAuth';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { login } from '~/services/authServices';
import { getMe } from '~/services/userServices';
import valid from '../validateAuth';
import config from '~/config';
import { deleteInforVerify, addInforVerify } from '~/redux/userSlice';
import notify from '~/utils/notify';

const cx = classNames.bind(styles);

function Login() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['token']);
    const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

    const onSubmit = (formData, e) => {
        e.preventDefault();

        const data = {
            username: formData.username,
            password: formData.password,
        };

        setLoading(true);
        const handleLogin = async () => {
            const response = await login(data).then((response) => {
                return response;
            });
            setLoading(false);
            const { token } = response;
            const user = await getMe(token);
            setCookies('token', response.token, { path: '/', expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
            localStorage.setItem('email', user.email);
            localStorage.setItem('name', user.name);
            localStorage.setItem('username', user.username);
            localStorage.setItem('avatar', user.avatar);
            localStorage.setItem('role', user.role);
            dispatch(deleteInforVerify());
            notify.success(config.notification().LOGIN_SUCCESS);
            if (user.role === 'USER') navigate(config.routes.HOME);
            if (user.role === 'ADMIN') navigate('/manage_user/1');
        };
        handleLogin().catch((error) => {
            setLoading(false);

            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            if (error.response.status === 400) {
                const { message } = error.response.data;
                const { messeageLogic } = config.errorMesseage;

                if (message.includes(messeageLogic.USER_NOT_VERIFY)) {
                    setError('code', { type: 'custom', message: messeageNotify.USER_NOT_VERIFY });
                    notify.error(messeageNotify.USER_NOT_VERIFY);
                    dispatch(addInforVerify(data));
                    navigate(config.routes.auth.VERIFYREGISTER);
                    return;
                }

                if (message.includes(messeageLogic.WRONG_NAME_OR_PASSWORD)) {
                    setError('username', { type: 'custom', message: messeageNotify.WRONG_NAME_OR_PASSWORD });
                    setError('password', { type: 'custom', message: messeageNotify.WRONG_NAME_OR_PASSWORD });
                    notify.error(messeageNotify.WRONG_NAME_OR_PASSWORD);
                    return;
                }
            }
            notify.error(error.response.data?.message);
            return;
        });
    };

    return (
        <Fragment>
            <WrapperAuth title={t('login')} clearErrors={clearErrors}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        name={'username'}
                        placeholder={t('username')}
                        autoComplete={'username'}
                        {...register('username', valid.userName)}
                        errolMesseage={errors.username?.message}
                    />
                    <Input
                        name={'password'}
                        placeholder={t('password')}
                        type={'password'}
                        autoComplete={'current-password'}
                        {...register('password', valid.password)}
                        errolMesseage={errors.password?.message}
                    />
                    <Button primary rounded>
                        {t('login')}
                    </Button>
                </form>
                <Button className={cx('mt-5')} red rounded leftIcon={faGoogle}>
                    {t('login_with_google')}
                </Button>
                <div className={cx('mt-5 flex justify-between ')}>
                    <Link className={cx('hover:underline')} to={config.routes.auth.FORGETPASSWORD}>
                        {t('forgot_password')}
                    </Link>
                    <Link className={cx('hover:underline')} to={config.routes.auth.SIGNUP}>
                        {t('signup')}
                    </Link>
                </div>
            </WrapperAuth>
            {loading && <Loading />}
        </Fragment>
    );
}

export default Login;
