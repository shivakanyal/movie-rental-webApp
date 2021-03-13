import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <Link class="navbar-brand" to="/">
        Vidly
      </Link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
    Navbar
  </a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">
          Home <span class="sr-only">(current)</span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          Features
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          Pricing
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link disabled"
          href="#"
          tabindex="-1"
          aria-disabled="true"
        >
          Disabled
        </a>
      </li>
    </ul>
  </div>
</nav>;
