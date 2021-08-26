import React, { useContext, useEffect, useState } from 'react'
import Navbar from './navbar'
import { XCircleFill, Plus } from 'react-bootstrap-icons'
import { ProductContext } from '../App'
import axios from 'axios'
import { Link } from 'react-router-dom';


function Carts(props) {
    const value = useContext(ProductContext)
    const [myCart, setmyCart] = useState([]);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [afterDisc, setAfterDisc] = useState(0)
    const [placeorder, setplaceorder] = useState(0)
    const [TotalPrice, setTotalPrice] = useState(0)
    const [newAddress, setnewAddress] = useState();
    const [contactInfo, setcontactInfo] = useState()

    useEffect(() => {

        if (!(value.Auth)) {
            props.history.push('/login')
        }

        setmyCart(value.Cart)
        setnewAddress(value.userData[0].CONTACT_DETAILS)

        // calculate total price of cart
        let sumPrice = 0;
        value.Cart.map((product) => {
            sumPrice += (product.QTY * product.PRICE)
        })
        //TotalPrice += (product.QTY * product.PRICE)
        setTotalPrice(sumPrice);
    }, [value.Cart])

    const moveToWishList = (product) => {
        product['QTY'] = 1
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

    const addNewAddress=()=>{
        let temp  =newAddress
        temp.push(contactInfo)
        setnewAddress(temp)
        console.log(temp);
        // axios.post("",temp)
        // .then((res)=>{
        //     console.log("updated");
        // })
        // .catch((err)=>{
        //     console.log(err);
        // })
    }
    return (
        <div className="fbottom">
            <Navbar />

            {/* <!-- Modal --> */}
            <div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Address</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <textarea type="text" className="form-control mb-3" placeholder="Enter your address" onChange={e=>setcontactInfo({...contactInfo,Address:e.target.value})} />
                            <input type="tel" className="form-control mb-3" placeholder="Enter your Phone Number" onChange={e=>setcontactInfo({...contactInfo,Phone:e.target.value})} />

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" onClick={e=>addNewAddress()}>Add</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light py-4">
                <div className="container">
                    <h6 className="text-center">

                        <span className={placeorder == 0 ? "cart-progress1" : "null"}>
                            BAG
                        </span>

                        <span className="cart-progress2">
                            ------
                        </span>

                        <span className={placeorder == 1 ? "cart-progress1" : "null"}>
                            ADDRESS
                        </span>

                        <span className="cart-progress2">
                            ------
                        </span>

                        <span className={placeorder == 2 ? "cart-progress1" : "null"}>
                            PAYMENT
                        </span>
                    </h6>
                </div>
            </div>
            <div className="container mt-5">
                {
                    myCart.length > 0 ?
                        <div className="row">

                            <div className="col-md-8 border">
                                {(placeorder == 0) ?
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
                                            <th></th>
                                        </thead>
                                        <tbody>

                                            {myCart.map((product) => {


                                                let prodDes = value.extractData(product)
                                                let index1 = value.Wishlist.findIndex(p => p._id === product._id)
                                                return (
                                                    <tr>
                                                        <td>
                                                            <div className="float-start ms-3 me-5">
                                                                <Link to={`/productDetails/${product.PRODUCT_ID}`}>   <img src={product.IMAGE} height="100px" width="75px" /> </Link>
                                                            </div>
                                                            <div className="float-right">
                                                                <h6>{product.BRAND}</h6>
                                                                <small>{prodDes.desc}</small>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>

                                                                <input onChange={e => quantityPrice(product, e.target.value)} defaultValue="1" value={product.QTY} type="number" className="w-50 form-control" min="1" />

                                                            </div>
                                                        </td>
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
                                    :
                                    (placeorder == 1) ?
                                        <div className="p-2">
                                            <h5>
                                                Select delivery address
                                            </h5>

                                            <div className="py-2">
                                                <small>DEFAULT ADDRESS</small>
                                            </div>

                                            {newAddress.map((contact) => {
                                                return (
                                                    <div class="form-check border shadow-sm">
                                                        <div className="p-3">

                                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                                            <label class="form-check-label" for="flexRadioDefault2">
                                                                <p>
                                                                    <b>{value.userData[0].NAME}</b>
                                                                </p>
                                                                <p>
                                                                    {contact.Address}
                                                                </p>
                                                                <p>
                                                                    Mobile No: {contact.Phone}
                                                                </p>
                                                                <button className="btn btn-sm btn-outline-secondary">EDIT</button>
                                                            </label>
                                                        </div>
                                                    </div>
                                                )
                                            })}

                                            <div className="my-3">
                                                <button type="button" class="btn btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    <Plus /> <span className="p-2">ADD NEW ADDRESS</span>
                                                </button>

                                            </div>

                                        </div> :
                                        <div>
                                            hello
                                        </div>}
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
                                {
                                    !(placeorder == 2) ?
                                        <div className="d-grid mt-3">
                                            <button className="btn btn-primary " type="submit" onClick={e => setplaceorder(placeorder + 1)}>{(placeorder == 0) ? "PLACE ORDER" : "CONTINUE"}</button>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        : <h4><center> Your Cart seems to be empty! </center></h4>}
            </div>
        </div>
    )
}

export default Carts
