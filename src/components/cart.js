import React, {useContext} from 'react'
import Navbar from './navbar'
import {ProductContext} from '../App'
import {Plus,Dash} from 'react-bootstrap-icons'

function Cart() {
    const value = useContext(ProductContext)
    return (
        <div>
            <Navbar/>
            <div className="mt-5 mb-5"><h3>Shopping Cart</h3></div>
            <div className="container">
                {
                      value.Wishlist ?
                <div className="row">
                    <div className="col-md-8 border">
                    <table className="table">
                <thead>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                </thead>
                <tbody>
                   
                    
                  
                   { value.Wishlist.map((product)=>{
                        let prodDes= value.extractData(product)
                        return(
                            <tr>
                        <td>
                            <div className="float-start ms-3 me-5">
                                <img src={product.IMAGE} height="100px" width="75px"/>
                            </div>
                            <div className="float-right">
                                <h6>{product.BRAND}</h6>
                               <p>{prodDes.desc}</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                {/* <button  className="btn btn-sm"><Dash/></button>
                                <button  className="btn btn-sm"><Plus/></button> */}
                                <input  defaultValue="1" type="number" className="w-25 form-control" min="1" />
                                
                            </div>
                        </td>
                        <td>
                            {product.PRICE}
                        </td>
                        </tr>
                        )
                    })
                    
                }
                </tbody>

                <tfoot className="float-end">
                    <tr >
                        <th >
                            Total= 555424
                        </th>
                    </tr>
                </tfoot>
                
                
            </table>
                    </div >
                    <div className="col-md-4 ">
                        <div className="border p-3">
                        <div className="input-group mb-5   ">
                        <select class="form-select  " aria-label="Default select example">
                                <option selected>Select Coupun Code</option>
                                <option value="1">LAXMINARAYANJI10</option>
                                <option value="2">RANAJI20</option>
                                <option value="3">JAINSAHAB20</option>
                                <option value="4">GURUJI50</option>
                                <option value="5">GUPTAJI100</option>
                                 <option value="6">GARGSAHAB20</option>
                                 <option value="7">BHATTSAHAB20</option>
                                </select>
                                <button className="btn btn-dark "  type="submit">Apply</button>
                            </div>
                            <div className="border p-3" >
                                <p>Total Price=12545</p>
                                <p>Discount=10000</p>
                                <p>Net=2545</p>
                        </div>

                        </div>
                    </div>
                </div>
                :null}
            </div>

            

        </div>
    )
}

export default Cart
