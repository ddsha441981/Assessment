import './App.css';
import Footer from './shared/Footer';
import Header from './shared/Header';
import MainContent from './shared/MainContent';

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <MainContent></MainContent>
      </main>
      <Footer />
    </div>
  );
}

export default App;
