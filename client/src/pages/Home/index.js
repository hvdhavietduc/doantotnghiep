import { Fragment } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

import Button from '~/components/Button';
import { logout } from '~/services/authServices';
import notify from '~/utils/notify';
import config from '~/config';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const cookie = new Cookies();
        const token = cookie.get('token');
        const name = localStorage.getItem('name');
        const data = { name };
        logout(data, token)
            .then(() => {
                localStorage.clear();
                cookie.remove('token');
                navigate(config.routes.LOGIN);
            })
            .catch((error) => {
                console.log(error);
                if (!error.response) {
                    notify.error(config.errorMesseage.ERROR_NETWORD);
                    return;
                }

                notify.error(error.response.data.message);
            });
    };
    return (
        <Fragment>
            <Button primary onClick={handleLogout}>
                logout
            </Button>
        </Fragment>
    );
}

export default Home;
