import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

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
                navigate(config.routes.auth.CREATENEWPASSWORD);
                dispatch(addInforVerify(data));
                return true;
            })
            .catch((error) => {
                setLoading(false);

                if (!error.response) {
                    notify.error(config.errorMesseage.messeageNotify.ERROR_NETWORD);
                    return;
                }

                const { messeageLogic, messeageNotify } = config.errorMesseage;
                if (
                    error.response.status === 404 &&
                    error.response.data.message.includes(messeageLogic.USER_NOT_FOUND)
                ) {
                    setError('email', { type: 'custom', message: messeageNotify.USER_NOT_FOUND });
                    notify.error(messeageNotify.USER_NOT_FOUND);
                    return;
                }

                notify.error(error.response.data?.message);
                return;
            });
    };

    return (
        <Fragment>
            <WrapperAuth title={t('forgot_password')} BackLoginPage>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        placeholder={'Email'}
                        name={'email'}
                        {...register('email', valid.email)}
                        errolMesseage={errors.email?.message}
                    />
                    <Button className={cx('btn')} primary rounded>
                        {t('send_email')}
                    </Button>
                </form>
            </WrapperAuth>
            {loading && <Loading />}
        </Fragment>
    );
}

export default ForgetPassword;
