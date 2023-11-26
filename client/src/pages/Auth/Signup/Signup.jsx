import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Input from '~/components/Input';
import styles from './Signup.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import valid from '../logicAuth';
import config from '~/config';
import { signupUser } from '~/redux/userSlice';
import notify from '~/utils/notify';

const cx = classNames.bind(styles);

function Signup() {
    const { loading } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        setError,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data, e) => {
        e.preventDefault();

        //valid comfim password
        const isValid = getValues('password') === getValues('passwordConfirm');
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

        //handle signup
        dispatch(signupUser(formData)).then((result) => {
            const payload = result.payload;
            if (payload === true) {
                notify.success(config.notification.SIGNUP_SUCCESS);
                navigate(config.routes.VERIFYREGISTER);
                return;
            }

            if (payload !== true && payload.statusCode === 400) {
                if (payload.message.includes(config.errorMesseage.USERNAME_EXIST)) {
                    setError('username', { type: 'custom', message: payload.message });
                    return;
                }
                if (payload.message.includes(config.errorMesseage.EMAIL_EXIST)) {
                    setError('email', { type: 'custom', message: payload.message });
                    return;
                }
            }
            return;
        });
    };

    return (
        <WrapperAuth title="Sign up">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    placeholder={'Full name'}
                    name={'fullname'}
                    {...register('fullname', valid.fullName)}
                    errolMesseage={errors.fullname?.message}
                />

                <Input
                    placeholder={'Username'}
                    name={'username'}
                    {...register('username', valid.userName)}
                    errolMesseage={errors.username?.message}
                />

                <Input
                    placeholder={'Email'}
                    name={'email'}
                    {...register('email', valid.email)}
                    errolMesseage={errors.email?.message}
                />

                <Input
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    {...register('password', valid.password)}
                    errolMesseage={errors.password?.message}
                />

                <Input
                    placeholder={'Repeat Password'}
                    name={'passwordConfirm'}
                    type={'password'}
                    {...register('passwordConfirm', valid.passwordConfirm)}
                    errolMesseage={errors.passwordConfirm?.message}
                />

                <Button className={cx('btn')} primary rounded>
                    {loading ? <Loading /> : 'Sign up'}
                </Button>
            </form>
            <div className={cx('modifer')} id="modifer">
                <Link to={config.routes.LOGIN}>You have account? Login</Link>
            </div>
        </WrapperAuth>
    );
}

export default Signup;
