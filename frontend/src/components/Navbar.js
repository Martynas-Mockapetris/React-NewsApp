import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <Link to="/">Pagrindinis</Link>
        <Link to="/create">Naujas įrašas</Link>
      </div>
    </nav>
  );
};

export default Navbar;
