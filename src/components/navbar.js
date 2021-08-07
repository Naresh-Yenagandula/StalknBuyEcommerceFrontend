import { PersonBoundingBox, SuitHeart, Cart, Search} from "react-bootstrap-icons";
import {Link,BrowserRouter as Router} from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand"><span>Navbar</span></Link>
          <div className ="navbar-text float-end ">
            <form className="d-flex " >
                <div className="input-group me-5">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-dark " type="submit"><Search/></button>
              </div>
              <Router>
                <Link to = "/viewProfile" className="pe-4 fs-4" >
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