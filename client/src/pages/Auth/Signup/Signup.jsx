import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import Input from '~/components/Input';
import styles from './Signup.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import { valid } from '../logicAuth';
import config from '~/config';
import { signupUser } from '~/redux/userSlice';

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
        if (!isValid) {
            setError('passwordConfirm', { type: 'custom', message: 'Passwords do not match.' });
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
            if (!result.payload.messageError) {
                message.success('signup success');
                navigate(config.routes.LOGIN);
            } else {
                const messageError = result.payload.messageError;
                console.log('messageError', messageError);
                if (messageError.includes('Username')) {
                    setError('username', { type: 'custom', message: messageError });
                } else {
                    setError('email', { type: 'custom', message: 'email is exists' });
                }

                message.error('signup failed');
            }
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
                    // type={'password'}
                    {...register('password', valid.password)}
                    errolMesseage={errors.password?.message}
                />

                <Input
                    placeholder={'Repeat Password'}
                    name={'passwordConfirm'}
                    // type={'password'}
                    {...register('passwordConfirm', valid.passwordConfirm)}
                    errolMesseage={errors.passwordConfirm?.message}
                />

                <Button className={cx('btn')} primary rounded>
                    {loading ? 'Sign up...' : 'Sign up'}
                </Button>
            </form>
            <div className={cx('modifer')} id="modifer">
                <Link to={config.routes.LOGIN}>You have account? Login</Link>
            </div>
        </WrapperAuth>
    );
}

export default Signup;
