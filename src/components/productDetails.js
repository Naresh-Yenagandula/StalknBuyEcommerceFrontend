import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ProductContext } from '../App';
import { Star, StarFill } from 'react-bootstrap-icons';

function ProductDetails() {
    const value = useContext(ProductContext)
    const { id } = useParams();
    const [idData, setidData] = useState()
    const [brandData, setBrandData] = useState();
    const [colorData, setColorData] = useState();
    const [catData, setCatData] = useState();


    useEffect(async () => {
        if (!value.FilterProducts) {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/product/${id}`)
                .then((res) => {
                    setidData(res.data.products[0])
                    console.log(res.data.products[0]);
                    axiosCalls(res.data.products[0])
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            const productData = await value.FilterProducts.filter(e => { return e.PRODUCT_ID === parseInt(id) })
            setidData(productData[0])
            //console.log(idData)
            //console.log(productData);
            axiosCalls(productData[0])
        }

        console.log(idData);


    }, [])

    const axiosCalls = (productData) => {
        //CATEGORY
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/categories?cat=${productData.CATEGORY}`)
            .then((res) => {
                console.log(res.data.products);
                setCatData(res.data.products.filter((e) => { return e.PRODUCT_ID != productData.PRODUCT_ID }));
            })
            .catch((err) => {
                console.log(err);
            })

        //CATGEORY + BRAND
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/categories?cat=${productData.CATEGORY}&brand=${productData.BRAND}`)
            .then((res) => {
                console.log(res.data.products);
                setBrandData(res.data.products.filter((e) => { return e.PRODUCT_ID != productData.PRODUCT_ID }));
            })
            .catch((err) => {
                console.log(err);
            })

        //CATGEORY + COLOR
        // axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/categories?cat=${productData.CATEGORY}&color=${productData.COLOR}`)
        // .then((res)=>
        // {
        //     console.log(res.data.products);
        //     setColorData(res.data.products.filter((e)=>{return e.PRODUCT_ID != productData.PRODUCT_ID}));
        // })
        // .catch((err)=>
        // {
        //     console.log(err);
        // })


    }
    return (
        <div>
            <div className="container">
                <div className="row vh-90 align-items-center">
                    {idData ?
                        <>
                            <div className="col-md-4 offset-md-1 col-sm-6 py-3">
                                <img className="img-fluid modal-image" src={idData.IMAGE} />
                            </div>
                            <div className="col-md-6 col-sm-6 offset-md-1 text-center">
                                <h3>{idData.BRAND}</h3>
                                <p>{value.extractData(idData).desc}</p>    
                                <h5>Rs. {idData.PRICE}</h5>
                                <p className="mt-5"> Select size</p>
                                <div>
                                    <button className="btn btn-secondary rounded-circle size-button">S</button>
                                    <button className="btn btn-secondary rounded-circle size-button">M</button>
                                    <button className="btn btn-secondary rounded-circle size-button">L</button>
                                    <button className="btn btn-secondary rounded-circle size-button">XL</button>
                                    {/* <button className="btn btn-secondary rounded-circle size-button">XXL</button> */}
                                </div>

                                <button className="btn bag-button mt-5">ADD TO BAG</button>
                                <button className="btn bag-button mt-4">ADD TO WISHLIST</button>

                            </div></> : null}
                </div>

                {/* shop by color */}
                {colorData && colorData.length>0?
                    <>
                        <div className="text-center headings">
                            <h2>SHOP BY COLOR</h2>
                        </div>
                        <div className="row row-cols-4">
                            {
                                colorData.slice(0, 4).map((product) => {
                                    let obj = value.extractData(product);
                                    return (
                                        <div className="col mb-4">
                                            <div className="card box-shadow">
                                                <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt="..." />
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
                                            </div>
                                        </div>
                                    )
                                })}
                        </div></> : null}

                {/* shop by brand & category */}
                {brandData && brandData.length>0?
                    <>
                        <div className="text-center headings">
                            <h2>SHOP BY BRAND</h2>
                        </div>
                        <div className="row row-cols-4">
                            {
                                brandData.slice(0, 4).map((product) => {
                                    let obj = value.extractData(product);
                                    return (
                                        <div className="col mb-4">
                                            <div className="card box-shadow">
                                                <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt="..." />
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
                                            </div>
                                        </div>
                                    )
                                })}
                        </div></> : null}

                {/* shop by catgeory */}
                {catData && catData.length>0 ?
                    <>
                        <div className="text-center headings">
                            <h2>SHOP BY CATEGORY</h2>
                        </div>
                        <div className="row row-cols-4">
                            {
                                catData.slice(0, 4).map((product) => {
                                    let obj = value.extractData(product);
                                    return (
                                        <div className="col mb-4">
                                            <div className="card box-shadow">
                                                <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt="..." />
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
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </> : null}
            </div>


        </div>
    )
}

export default ProductDetails
