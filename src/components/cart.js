import React, {useContext, useEffect, useState} from 'react'
import Navbar from './navbar'
import {XCircleFill } from 'react-bootstrap-icons'
import {ProductContext} from '../App'
import axios from 'axios'



function Carts() 
{
    const value = useContext(ProductContext)
    const [myCart, setmyCart] = useState();
    let TotalPrice=0

    useEffect(() => 
    {
        console.log(value.Cart);
        //console.log(myCart);
        setmyCart(value.Cart)
    }, [value.Cart])
   
    const moveToWishList = (product) =>
    {
        product['QTY']=1
        console.log(product)
        value.updateWishlist(product);
        value.updateCart(product);
    }
      
    const quantityPrice=(product,quantity)=>{
        let temp=[]
        myCart.map((p)=>{
            if(p._id===product._id)
            {
                p['QTY']=quantity
                
            }
            temp.push(p)
        })
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/updateCart?id=${value.userData[0]._id}`, temp)
        .then((res) => {
          value.updateCartQuantity(temp)
        })
        .catch((err) => {
          alert("Sorry, there is an error");
        })
    
        setmyCart(temp)

    }

    return (
        <div>
            <Navbar/>

            <div className="bg-light py-4">
                <div className="container">
                <h3>Shopping Cart</h3>
                </div>
            </div>
            <div className="container mt-5">
                {
                      myCart ?
                <div className="row">
                    <div className="col-md-8 border">
                    <table className="table table-borderless p-3">
                        <colgroup>
                        <col />
                        <col style={{width:"150px"}}/>
                        <col style={{width:"120px"}}/>
                        </colgroup>
                <thead>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                </thead>
                <tbody>
                   
                    
                  
                   { myCart.map((product)=>{
                       
                        TotalPrice+=(product.QTY*product.PRICE)
                        console.log(TotalPrice)
                       
                       
                         let prodDes= value.extractData(product)
                        let index1 = value.Wishlist.findIndex( p => p._id=== product._id)
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
                                
                                <input  onChange={e=>quantityPrice(product,e.target.value)}  defaultValue="1" value={product.QTY} type="number" className="w-50 form-control" min="1" />
                                
                            </div>
                        </td>
                        {console.log(product.QTY)}
                        <td className="pe-5 ">
                          {product.QTY*product.PRICE} 

                        </td>
                        <td>
                            {index1 ==-1 ?<button className="btn btn-sm btn-secondary " onClick={e=> moveToWishList(product)}><small>ADD TO WISHLIST</small></button> : null}
                                                                    
                        </td>
                        <td>
                            <button className="btn "  onClick={e=>value.updateCart(product)}> <XCircleFill className="Cart-icon" /></button>
                        </td>
                        </tr>
                        )
                    })
                    
                }
                </tbody>

             
                
                
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
                                
                                <p>Total Price={TotalPrice}
                                    
                                </p>

                                <p>Discount=10000</p>
                                <p>Net Price={TotalPrice-500}</p>
                        </div>

                        </div>
                    </div>
                </div>
                :null}
            </div>

            

        </div>
    )
}

export default Carts
