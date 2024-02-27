import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Input from '~/components/Input';
import styles from './CreateNewPassword.module.scss';
import WrapperAuth from '../WrapperAuth';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import { resetPassword } from '~/services/authServices';
import { deleteInforVerify } from '~/redux/userSlice';
import notify from '~/utils/notify';
import valid from '../validateAuth';
import config from '~/config';

const cx = classNames.bind(styles);

function CreateNewPassword() {
    const { inforVerify } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const hideEmail = (email) => {
        const atIndex = email.indexOf('@');
        const visibleSuffix = email.slice(atIndex - 3);
        const hiddenEmail = '*'.repeat(10) + visibleSuffix;
        return hiddenEmail;
    };

    const onSubmit = (formData, e) => {
        e.preventDefault();

        //valid comfim password
        const isValid = formData.password === formData.passwordConfirm;
        if (isValid === false) {
            setError('passwordConfirm', {
                type: 'custom',
                message: config.errorMesseage.getMesseageNotify().PASSWORD_NOT_MATCH,
            });
            return;
        }

        const data = {
            email: inforVerify.email,
            code: formData.code,
            password: formData.password,
        };
        setLoading(true);
        resetPassword(data)
            .then(() => {
                setLoading(false);
                notify.success(config.notification().CREATE_NEW_PASSWORD_SUCCESS);
                dispatch(deleteInforVerify());
                navigate(config.routes.auth.LOGIN);
                return true;
            })
            .catch((error) => {
                setLoading(false);

                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }

                const { messeageLogic } = config.errorMesseage;
                if (
                    error.response.status === 404 &&
                    error.response.data.message.includes(messeageLogic.WRONG_VERIFY_CODE)
                ) {
                    setError('code', { type: 'custom', message: messeageNotify.WRONG_VERIFY_CODE });
                    notify.error(messeageNotify.WRONG_VERIFY_CODE);
                    return;
                }
                notify.error(error.response.data?.message);
            });
    };

    if (!inforVerify) return <div>Cannot access this page</div>;

    return (
        <Fragment>
            <WrapperAuth title={t('create_new_password')} BackLoginPage clearErrors={clearErrors}>
                <div className={cx('mb-5 ml-[50%] w-[300px] translate-x-[-50%] text-center text-green-500')}>
                    {t('we_have_send_code_to')}
                    {hideEmail(inforVerify.email)}
                    {t('successfully')}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        name={'code'}
                        placeholder={t('enter_code')}
                        autoComplete={'one-time-code'}
                        {...register('code', valid.code)}
                        errolMesseage={errors.code?.message}
                    />

                    <Input
                        placeholder={t('new_password')}
                        name={'password'}
                        type={'password'}
                        autoComplete={'new-password'}
                        {...register('password', valid.password)}
                        errolMesseage={errors.password?.message}
                    />

                    <Input
                        placeholder={t('repeat_new_password')}
                        name={'passwordConfirm'}
                        type={'password'}
                        autoComplete={'new-password'}
                        {...register('passwordConfirm', valid.passwordConfirm)}
                        errolMesseage={errors.passwordConfirm?.message}
                    />
                    <Button primary rounded>
                        {t('confirm')}
                    </Button>
                </form>
            </WrapperAuth>
            {loading && <Loading />}
        </Fragment>
    );
}

export default CreateNewPassword;
