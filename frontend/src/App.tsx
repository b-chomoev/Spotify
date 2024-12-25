import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import NavBar from './components/NavBar/NavBar';

const App = () => {

    return (
        <>
          <header>
            <NavBar/>
          </header>
          <main className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='*' element={<h3>Not Found</h3>} />
            </Routes>
          </main>
        </>
    );
};

export default App
