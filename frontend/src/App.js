import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateNew from './pages/CreateNew';
import SingleNew from './pages/SingleNew';
import EditNew from './pages/EditNew';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:id" element={<SingleNew />} />
        <Route path="/create" element={<CreateNew />} />
        <Route path="/edit/:id" element={<EditNew />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
