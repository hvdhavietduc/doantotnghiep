import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import GlobalStyles from './components/GlobalStyles';
import i18n from './utils/i18n';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <I18nextProvider i18n={i18n}>
        <GlobalStyles>
            <Provider store={store}>
                <App />
                <ToastContainer />
            </Provider>
        </GlobalStyles>
    </I18nextProvider>,
);
