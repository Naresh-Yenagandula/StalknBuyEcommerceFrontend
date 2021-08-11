import { PersonBoundingBox, SuitHeart, Cart, Search } from "react-bootstrap-icons";
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { ProductContext } from '../App';
import React, { useContext, useState } from 'react';



const Navbar = () => {

    const [searchValue, setsearchValue] = useState();
    const value = useContext(ProductContext)


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"><span>Navbar</span></Link>
                <div className="navbar-text float-end ">
                    <form className="d-flex " >
                        <div className="input-group me-5">
                            <input className="form-control" type="search" placeholder="Search for products, brands and more" aria-label="Search" onChange={(e) => setsearchValue(e.target.value)} />
                            <Link to="/product/search"><button className="btn btn-dark " onClick={e => value.search(searchValue, e)} type="submit"><Search /></button></Link>
                        </div>
                            <div class="dropdown">
                                <a class=" dropdown-toggle pe-4 fs-4" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                <PersonBoundingBox />
                                </a>

                                <ul class="dropdown-menu p-3" aria-labelledby="dropdownMenuLink">
                                    <div>
                                        <small><b>Welcome</b></small><br />
                                        <small>To access account and manage orders</small><br />
                                        <Link to="/signup"><button className="btn btn-outline-warning mt-3">Login / SignUp</button></Link>
                                    </div><hr />
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                            <Link to="/wishlist" className="pe-4 fs-4">
                                <SuitHeart />
                            </Link>
                            <Link to="/cart" className="pe-4 fs-4">
                                <Cart />
                            </Link>
                    </form>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;