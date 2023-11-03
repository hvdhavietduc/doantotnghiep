import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes } from './routes';
import { DefautLayout } from '~/layout';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route) => {
                        const Layout = route.layout || DefautLayout;
                        const Page = route.element;
                        return (
                            <Route
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
