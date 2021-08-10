import { PersonBoundingBox, SuitHeart, Cart, Search} from "react-bootstrap-icons";
import {Link,BrowserRouter as Router} from 'react-router-dom';
import { ProductContext } from '../App';
import React, { useContext,useState } from 'react';



const Navbar = () => {

    const [searchValue, setsearchValue] = useState();
    const value = useContext(ProductContext)
    

    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand"><span>Navbar</span></Link>
          <div className ="navbar-text float-end ">
            <form className="d-flex " >
                <div className="input-group me-5">
                    <input className="form-control" type="search" placeholder="Search for products, brands and more" aria-label="Search" onChange={(e)=>setsearchValue(e.target.value)}/>
                    <Link to="/product/search"><button className="btn btn-dark " onClick={e=>value.search(searchValue,e)} type="submit"><Search/></button></Link>
              </div>
              <Router>
                <Link to = "/signup" className="pe-4 fs-4" >
                    <PersonBoundingBox/>
                </Link>
                <Link to = "/wishlist" className="pe-4 fs-4">
                    <SuitHeart/>
                </Link>
                <Link to = "/cart" className="pe-4 fs-4">
                    <Cart/>
                </Link>
                 
                </Router>
            </form>   
                
            </div>
        </div>
      </nav>
     );
}
 
export default Navbar;