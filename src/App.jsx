import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './pages/Index';
import Offers from './pages/Offers';
import Advantages from './pages/Advantages';
import Movies from './pages/Movies';
import FilmDetails from './pages/FilmDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import store from './store';
import Favoritos from './pages/Favoritos';
import Entradas from './pages/Entradas';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='bg-gray-900'>
          <header>
            <Navbar />
          </header>
          <section>
            <Routes>
              <Route path='/' element={<Index />} />
              <Route path='/Offers' element={<Offers />} />
              <Route path='/Advantages' element={<Advantages />} />
              <Route path='/Movies' element={<Movies />} />
              <Route path='/film/:id' element={<FilmDetails />} />
              <Route path='/About' element={<About />} />
              <Route path='/Contact' element={<Contact />} />
              <Route path='/Favoritos' element={<Favoritos />} />
              <Route path='/Entradas' element={<Entradas />} />
            </Routes>
          </section>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </Provider>

  )
}

export default App;
