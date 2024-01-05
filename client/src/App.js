import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect } from 'react';

import { publicRoutes, privateRoutes } from './routes';
import RequiredLogin from './pages/OtherPage/RequiredLogin';

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
                </Routes>
            </div>
        </Router>
    );
}

export default App;
