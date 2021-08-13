import React, {useContext} from 'react'
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import { ProductContext } from '../App';
import { Star, StarFill, SuitHeartFill } from 'react-bootstrap-icons';


function Wishlist() {
    const value=useContext(ProductContext)
        return (
     <div className="">
         <Navbar/>

        <div className="container">
              <div className="row mt-3 row-cols-4">
                            {value.Wishlist ?
                                value.Wishlist.map((product) => {
                                    let obj = value.extractData(product);
                                    return (
                                        <div className="col mb-4" key={product.PRODUCT_ID}>
                                            <div className="card box-shadow">
                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}>    <img src={product.IMAGE} className="card-img-top" height="280px" width="210px" alt={product.NAME} />
                                                </Link>
                                               

                                                <button className="btn btn-sm wishlist"> <SuitHeartFill className="wishlist-icon" /></button>
                                                <div className="card-body" style={{ height: "120px" }}>
                                                    <div className="card-body-section-one ">
                                                        <b style={{ paddingBottom: "1px" }}>{obj.brand}</b><br />
                                                        <p style={{ fontSize: "12px", paddingBottom: "0.2px" }}>{obj.desc}</p>
                                                    </div>
                                                    <div className="card-body-section-two" style={{ paddingTop: "10px" }}>
                                                        <small className="card-body-section-two">Rs {product.PRICE}</small>
                                                    </div>
                                                    <div className="card-body-section-three" style={{ paddingTop: "10px" }}>

                                                        {value.count.map((i) => {
                                                            if (i <= obj.rating) {
                                                                return (
                                                                    <small ><StarFill className="star-color" /></small>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <small><Star /></small>
                                                                )
                                                            }

                                                        })}
                                                        
                                                    </div>
                                                    
                                            
                                                </div>
                                                <div className="d-grid" > <button className="btn bag-button " style={{width:"100%"}}>ADD TO BAG</button></div>
                                            </div>
                                        </div>
                                        

                                    )
                                }) : null}

                        </div>
        </div>
     </div>
    )
}

export default Wishlist
