import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Layout = ({ children }) => {
    const { user } = useAuth();
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <a className="navbar-brand">Task Manager</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                {!user && <li className="nav-item"><Link to="/signup" className='nav-link text-light'>Sign up</Link></li>}
                                {!user && <li className="nav-item"><Link to="/login" className='nav-link text-light'>Log in</Link></li>}
                                {!!user && <li className="nav-item"><Link to="/home" className='nav-link text-light'>Home</Link></li>}
                                {!!user && <li className="nav-item"><Link to="/logout" className='nav-link text-light'>Log out</Link></li>}

                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container" style={{ marginTop: 80 }}>
                {children}
            </div>
        </div>
    )
}

export default Layout;
