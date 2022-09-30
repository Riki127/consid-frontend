import React from "react";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/item">Item</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/category">Category</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/checkout">Checkout</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/checkin">Checkin</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;