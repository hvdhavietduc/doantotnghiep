import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

import Input from '~/components/Input';
import styles from './VerifyRegister.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { getEmail, verify } from '~/services/authServices';
import { getMe } from '~/services/userServices';
import { deleteInforVerify } from '~/redux/userSlice';
import valid from '../validateAuth';
import config from '~/config';
import notify from '~/utils/notify';

const cx = classNames.bind(styles);

function VerifyRegister() {
    const { inforVerify } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (!inforVerify) return;
        const data = {};
        data.username = inforVerify.username;
        data.password = inforVerify.password;
        getEmail(data)
            .then((result) => {
                setEmail(result);
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hideEmail = (email) => {
        const atIndex = email.indexOf('@');
        const visibleSuffix = email.slice(atIndex - 3);
        const hiddenEmail = '*'.repeat(10) + visibleSuffix;
        return hiddenEmail;
    };

    const onSubmit = (formData, e) => {
        e.preventDefault();

        const data = {
            email: email,
            code: formData.code,
        };

        setLoading(true);

        const handleVerify = async () => {
            const response = await verify(data).then((response) => {
                setLoading(false);
                const { token } = response;
                const cookies = new Cookies();
                cookies.set('token', response.token, {
                    path: '/',
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                });
                dispatch(deleteInforVerify());
                notify.success(config.notification.VERIFY_SUCCESS);
                navigate(config.routes.HOME);
                return token;
            });

            const user = await getMe(response);
            localStorage.setItem('email', user.email);
            localStorage.setItem('name', user.name);
            localStorage.setItem('username', user.username);
            localStorage.setItem('avatar', user.avatar);
            return;
        };

        handleVerify().catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(config.errorMesseage.ERROR_NETWORD);
                return;
            }

            notify.error(error.response.data.message);
            if (error.response.status === 400) {
                const { message } = error.response.data;
                setError('code', { type: 'custom', message: message });
            }
            return;
        });
    };

    if (!inforVerify) return <div>Cannot access this page</div>;

    return (
        <Fragment>
            <WrapperAuth title="Verify Register" BackLoginPage>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={cx('message')}>We have send code to {hideEmail(email)} successfully</div>
                    <Input
                        name={'code'}
                        placeholder={'Enter code'}
                        autoComplete={'one-time-code'}
                        {...register('code', valid.code)}
                        errolMesseage={errors.code?.message}
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

export default VerifyRegister;