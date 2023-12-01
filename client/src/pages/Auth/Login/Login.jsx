import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

import styles from './Login.module.scss';
import Input from '~/components/Input';
import WrapperAuth from '~/components/WrapperAuth';
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
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (formData, e) => {
        e.preventDefault();

        const data = {
            username: formData.username,
            password: formData.password,
        };

        setLoading(true);
        const handleLogin = async () => {
            const response = await login(data).then((response) => {
                setLoading(false);
                const { token } = response;
                const cookies = new Cookies();
                cookies.set('token', response.token, {
                    path: '/',
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                });
                dispatch(deleteInforVerify());
                notify.success(config.notification.LOGIN_SUCCESS);
                navigate(config.routes.HOME);
                return token;
            });
            const user = await getMe(response);
            localStorage.setItem('email', user.email);
            localStorage.setItem('name', user.name);
            localStorage.setItem('username', user.username);
            localStorage.setItem('avatar', user.avatar);
        };
        handleLogin().catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(config.errorMesseage.ERROR_NETWORD);
                return;
            }

            notify.error(error.response.data.message);
            if (error.response.status === 400) {
                const { message } = error.response.data;
                if (message.includes(config.errorMesseage.USER_NOT_VERIFY)) {
                    setError('code', { type: 'custom', message: message });
                    dispatch(addInforVerify(data));
                    navigate(config.routes.auth.VERIFYREGISTER);
                    return;
                }

                if (message.includes(config.errorMesseage.WRONG_NAME_OR_PASSWORD)) {
                    setError('username', { type: 'custom', message: message });
                    setError('password', { type: 'custom', message: message });
                    return;
                }
            }
            return;
        });
    };

    return (
        <Fragment>
            <WrapperAuth title="Login">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        name={'username'}
                        placeholder={'Username'}
                        autoComplete={'username'}
                        {...register('username', valid.userName)}
                        errolMesseage={errors.username?.message}
                    />
                    <Input
                        name={'password'}
                        placeholder={'Password'}
                        type={'password'}
                        autoComplete={'current-password'}
                        {...register('password', valid.password)}
                        errolMesseage={errors.password?.message}
                    />
                    <Button className={cx('btn')} primary rounded>
                        Login
                    </Button>
                </form>
                <Button className={cx('btn', 'btn-google')} red rounded leftIcon={faGoogle}>
                    Login with google
                </Button>
                <div className={cx('modifer')} id="modifer">
                    <Link to={config.routes.auth.FORGETPASSWORD}>Forgot password?</Link>
                    <Link to={config.routes.auth.SIGNUP}>Sign up</Link>
                </div>
            </WrapperAuth>
            {loading && <Loading />}
        </Fragment>
    );
}

export default Login;
