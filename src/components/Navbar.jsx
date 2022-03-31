import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="my-8">
      <nav className="navbar rounded-lg">
        <h3 className="nav-title heading-2">
          <Link to="/">
            <span className="fas fa-stopwatch mr-2"></span>
            Reactodoro
          </Link>
        </h3>
      </nav>
    </header>
  );
}
