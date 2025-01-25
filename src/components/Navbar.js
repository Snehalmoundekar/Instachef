import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ onSearch }) => {
  const [isNavbarCollapsed, setNavbarCollapsed] = useState(true);

  const handleNavbarToggle = () => {
    setNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between w-100">
          <Link className="navbar-brand" to="/">
            <img src="/instachef/assets/Instachef_logo-removebg-preview.png" alt="Logo" />
          </Link>

          <div className="d-none d-lg-flex flex-grow-1 justify-content-center mx-3 border-0">
            <SearchBar onSearch={onSearch} />
          </div>

          <button
            className="navbar-toggler ms-auto"
            type="button"
            onClick={handleNavbarToggle}
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recipesCard">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Search Bar for Small Screens */}
      <div className="d-lg-none w-100 p-2">
        <SearchBar onSearch={onSearch} />
      </div>
    </nav>
  );
};

export default Navbar;
