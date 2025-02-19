import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Search from './pages/Search';
import Movie from './pages/Movie';

function App() {
  return (
    <Router basename='/'>
      <NavBar />
      <Routes>
        <Route path="react-filme/home" element={<Home />} />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
