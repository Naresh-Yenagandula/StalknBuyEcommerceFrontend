import React, { useContext, useEffect, useState } from 'react'
import Navbar from './navbar'
import { Rss, XCircleFill } from 'react-bootstrap-icons'
import { ProductContext } from '../App'
import axios from 'axios'



function Carts(props) {
    const value = useContext(ProductContext)
    const [myCart, setmyCart] = useState([]);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [afterDisc, setAfterDisc] = useState(0)
    let TotalPrice = 0;


    useEffect(() => {
        // console.log(value.Cart);
        // //console.log(myCart);
        if (!(value.Auth)) {
            props.history.push('/login')
        }

        setmyCart(value.Cart)

    }, [value.Cart])

    const moveToWishList = (product) => {
        product['QTY'] = 1
        console.log(product)
        value.updateWishlist(product);
        value.updateCart(product);
    }

    const quantityPrice = (product, quantity) => {
        let temp = []
        myCart.map((p) => {
            if (p._id === product._id) {
                p['QTY'] = quantity

            }
            temp.push(p)
            setDiscountPrice(0);
            setAfterDisc(0);
            document.getElementById("coupon").value = "Select coupon code"
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

    const discount = (offValue) => {
        setAfterDisc((offValue * TotalPrice) / 100)
    }
    return (
        <div className="fbottom">
            <Navbar />

            <div className="bg-light py-4">
                <div className="container">
                    <h3>Shopping Cart</h3>
                </div>
            </div>
            <div className="container mt-5">
                {
                    myCart.length > 0 ?
                        <div className="row">
                            <div className="col-md-8 border">
                                <table className="table table-borderless p-3">
                                    <colgroup>
                                        <col />
                                        <col style={{ width: "150px" }} />
                                        <col style={{ width: "120px" }} />
                                    </colgroup>
                                    <thead>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        {myCart.map((product) => {

                                            TotalPrice += (product.QTY * product.PRICE)
                                            console.log(TotalPrice)


                                            let prodDes = value.extractData(product)
                                            let index1 = value.Wishlist.findIndex(p => p._id === product._id)
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className="float-start ms-3 me-5">
                                                            <img src={product.IMAGE} height="100px" width="75px" />
                                                        </div>
                                                        <div className="float-right">
                                                            <h6>{product.BRAND}</h6>
                                                            <p>{prodDes.desc}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>

                                                            <input onChange={e => quantityPrice(product, e.target.value)} defaultValue="1" value={product.QTY} type="number" className="w-50 form-control" min="1" />

                                                        </div>
                                                    </td>
                                                    {console.log(product.QTY)}
                                                    <td className="pe-5 ">
                                                        {product.QTY * product.PRICE}

                                                    </td>
                                                    <td>
                                                        {index1 == -1 ? <button className="btn btn-sm btn-secondary " onClick={e => moveToWishList(product)}><small>ADD TO WISHLIST</small></button> : null}

                                                    </td>
                                                    <td>
                                                        <button className="btn " onClick={e => value.updateCart(product)}> <XCircleFill className="Cart-icon" /></button>
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
                                    <div className="input-group mb-3   ">
                                        <select id="coupon" class="form-select" aria-label="Default select example" onChange={e => setDiscountPrice(e.target.value)}>
                                            <option value="Select coupon code" selected disabled> Select Coupon Code </option>
                                            <option value="5" disabled={!(TotalPrice >= 9000 && TotalPrice < 10000)}>BHATTSAHAB5</option>
                                            <option value="10" disabled={!(TotalPrice >= 12000 && TotalPrice < 20000)}>LAXMINARAYANJI10</option>
                                            <option value="20" disabled={!(TotalPrice >= 20000 && TotalPrice < 25000)}>RANAJI20 </option>
                                            <option value="30" disabled={!(TotalPrice >= 25000 && TotalPrice < 50000)} >JAINSAHAB30</option>
                                            <option value="40" disabled={!(TotalPrice >= 50000 && TotalPrice < 70000)}>GURUJI40</option>
                                            <option value="50" disabled={!(TotalPrice >= 70000 && TotalPrice < 80000)}>GUPTAJI50</option>
                                            <option value="60" disabled={!(TotalPrice >= 80000 && TotalPrice < 100000000000000)}>GARGSAHAB60</option>
                                        </select>
                                        <button className="btn btn-dark " type="submit" onClick={e => discount(discountPrice)}>Apply</button>
                                    </div>
                                    <div className="border p-2" >
                                        <table className="table table-borderless">
                                            <tbody>
                                                <tr>
                                                    <td>Total Price: </td>
                                                    <td>Rs. {TotalPrice}</td>
                                                </tr>
                                                <tr>
                                                    <td>Discount: </td>
                                                    <td> Rs. {afterDisc}</td>
                                                </tr>
                                                <tr>
                                                    <td>Net Price: </td>
                                                    <td>{TotalPrice - afterDisc}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="d-grid mt-3">
                                    <button className="btn btn-primary " type="submit">PLACE ORDER</button>
                                </div>
                            </div>
                        </div>
                        : <h4><center> Your Cart seems to be empty! </center></h4>}
            </div>
        </div>
    )
}

export default Carts
