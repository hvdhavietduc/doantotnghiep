import classNames from 'classnames/bind';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import styles from './Login.module.scss';
import Input from '~/components/Input';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import { valid } from '../logicAuth';
import config from '~/config';
import { loginUser } from '~/redux/userSlice';

const cx = classNames.bind(styles);

function Login() {
    const { loading } = useSelector((state) => state.user);

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

        dispatch(loginUser(data)).then((result) => {
            if (!result.payload.messageError) {
                message.success('login success');
                navigate(config.routes.HOME);
            } else {
                setError('username', { type: 'custom', message: result.payload.messageError });
                setError('password', { type: 'custom', message: result.payload.messageError });
                message.error('login failed');
            }
        });
    };

    return (
        <WrapperAuth title="Login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name={'username'}
                    placeholder={'Username'}
                    {...register('username', valid.userName)}
                    errolMesseage={errors.username?.message}
                />
                <Input
                    name={'password'}
                    placeholder={'Password'}
                    // type={'password'}
                    {...register('password', valid.password)}
                    errolMesseage={errors.password?.message}
                />
                <Button className={cx('btn')} primary rounded>
                    {loading ? 'Login...' : 'Login'}
                </Button>
            </form>
            <Button className={cx('btn', 'btn-google')} red rounded leftIcon={faGoogle}>
                Login with google
            </Button>
            <div className={cx('modifer')} id="modifer">
                <Link to={config.routes.FORGETPASSWORD}>Forgot password?</Link>
                <Link to={config.routes.SIGNUP}>Sign up</Link>
            </div>
        </WrapperAuth>
    );
}

export default Login;
