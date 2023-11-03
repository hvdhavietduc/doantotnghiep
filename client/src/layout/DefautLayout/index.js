import Header from '../Header';
import Footer from '../Footer';

function DefautLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default DefautLayout;
