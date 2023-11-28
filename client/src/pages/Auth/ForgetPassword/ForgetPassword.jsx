import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '~/components/Input';
import styles from './ForgetPassword.module.scss';
import WrapperAuth from '~/components/WrapperAuth';
import Loading from '~/components/Loading';
import Button from '~/components/Button';
import { forgotPassword } from '~/services/authServices';
import { addInforVerify } from '~/redux/userSlice';
import notify from '~/utils/notify';
import config from '~/config';
import valid from '../validateAuth';

const cx = classNames.bind(styles);

function ForgetPassword() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = (formData, e) => {
        e.preventDefault();

        const data = {
            email: formData.email,
        };

        setLoading(true);
        forgotPassword(data)
            .then(() => {
                setLoading(false);
                navigate(config.routes.CREATENEWPASSWORD);
                dispatch(addInforVerify(data));
                return true;
            })
            .catch((error) => {
                setLoading(false);

                if (!error.response) {
                    notify.error(config.errorMesseage.ERROR_NETWORD);
                    return;
                }

                notify.error(error.response.data.message);
                if (error.response.status === 404) {
                    const { message } = error.response.data;
                    setError('email', { type: 'custom', message: message });
                }
                return;
            });
    };

    return (
        <Fragment>
            <WrapperAuth title="Forget Password" BackLoginPage>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder={'Email'}
                        name={'email'}
                        {...register('email', valid.email)}
                        errolMesseage={errors.email?.message}
                    />
                    <Button className={cx('btn')} primary rounded>
                        Send email
                    </Button>
                </form>
            </WrapperAuth>
            {loading && <Loading />}
        </Fragment>
    );
}

export default ForgetPassword;
