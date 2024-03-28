import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect } from 'react';

import { publicRoutes, privateRoutes, authenticationRoutes, adminRoutes } from './routes';
import RequiredLogin from './pages/OtherPage/RequiredLogin';
import NotAccess from './pages/OtherPage/NotAccess';
import Error from './pages/OtherPage/NotExist';

function App() {
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const token = cookies.token;
    useEffect(() => {}, [token]);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = route.layout == null ? Fragment : route.layout;

                        const Page = route.element;
                        return (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout == null ? Fragment : route.layout;

                        const Page = token ? route.element : RequiredLogin;
                        return (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {adminRoutes.map((route, index) => {
                        const isAdmin = localStorage.getItem('role') === 'ADMIN';
                        const Layout = route.layout == null || !isAdmin ? Fragment : route.layout;
                        const Page = token ? (isAdmin ? route.element : Error) : RequiredLogin;
                        return (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <Layout  listBreadcrumb={route.listBreadcrumb} >
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {authenticationRoutes.map((route, index) => {
                        const Layout = route.layout == null ? Fragment : route.layout;

                        const Page = token ? NotAccess : route.element;
                        return (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <Layout >
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
