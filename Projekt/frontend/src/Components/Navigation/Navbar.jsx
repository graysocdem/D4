import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

import { Link } from "react-router-dom"

function Navbar() {
    
    const navigate = useNavigate()
    function handleLogout(e) {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/homepage">Homepage</Link></li>
                <li><Link to="/friends">Friends</Link></li>
                <li><Link to="/search">Search</Link></li>
                <li><Link to="/" onClick={handleLogout}>Log out</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;