import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Input from '~/components/Input';
import styles from './VerifyRegister.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { getEmail } from '~/services/authServices';
import { verifyRegisterUser } from '~/redux/userSlice';
import valid from '../logicAuth';
import config from '~/config';
import notify from '~/utils/notify';

const cx = classNames.bind(styles);

function VerifyRegister() {
    const { loading, inforVerify } = useSelector((state) => state.user);

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
                return;
            })
            .catch((err) => {
                console.log(err);
                return;
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
        dispatch(verifyRegisterUser(data)).then((result) => {
            const payload = JSON.parse(result.payload);

            if (!payload.status) {
                notify.success(config.notification.VERIFY_SUCCESS);
                navigate(config.routes.HOME);
                return true;
            }

            if (payload.status === 400) {
                const { message } = payload.data;
                setError('code', { type: 'custom', message: message });
            }
            return;
        });
    };

    if (!inforVerify) return <div>Cannot access this page</div>;

    return (
        <Fragment>
            <WrapperAuth title="Verify Register" verifyPage>
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
