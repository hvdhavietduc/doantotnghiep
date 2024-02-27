import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

import Input from '~/components/Input';
import styles from './VerifyRegister.module.scss';
import WrapperAuth from '../WrapperAuth';
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
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['token']);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation('translation', { keyPrefix: 'Auth' });

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
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
                setCookies('token', response.token, { path: '/', expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
                dispatch(deleteInforVerify());
                notify.success(config.notification().VERIFY_SUCCESS);
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

            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { messeageLogic } = config.errorMesseage;
            if (
                error.response.status === 400 &&
                error.response.data.message.includes(messeageLogic.WRONG_VERIFY_CODE)
            ) {
                setError('code', { type: 'custom', message: messeageNotify.WRONG_VERIFY_CODE });
                notify.error(messeageNotify.WRONG_VERIFY_CODE);
                return;
            }
            notify.error(error.response.data?.message);
            return;
        });
    };

    if (!inforVerify) return <div className={cx('text-xl10')}>{t('cannot_access_this_page')}</div>;

    return (
        <Fragment>
            <WrapperAuth title={t('verify_register')} BackLoginPage clearErrors={clearErrors}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={cx('mb-5 ml-[50%] w-[300px] translate-x-[-50%] text-center text-green-500')}>
                        {t('we_have_send_code_to')}
                        {hideEmail(email)}
                        {t('successfully')}
                    </div>
                    <Input
                        name={'code'}
                        placeholder={t('enter_code')}
                        autoComplete={'one-time-code'}
                        {...register('code', valid.code)}
                        errolMesseage={errors.code?.message}
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

export default VerifyRegister;
