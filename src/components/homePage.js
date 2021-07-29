import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Heart} from 'react-bootstrap-icons'

function HomePage() {
    const [newP, setNewP] = useState();
    const [popularP, setPopularP] = useState();

    useEffect(() => {

        axios.get('http://localhost:5000/product/new')
            .then((res) => {
                setNewP(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('http://localhost:5000/product/popular')
            .then((res) => {
                setPopularP(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    return (
        <div className="container pb-5">
            <div className="text-center headings">
                <h2>CATEGORIES</h2>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="/product/accessories"><img src="images/accessories.jpg" className="img-fluid"></img> </Link>
                </div>
                <div className="col">
                    <Link to="/product/shirts"><img src="images/shirts.jpg" className="img-fluid"></img></Link>
                </div>
                <div className="col">
                    <Link to="/product/trousers"><img src="images/trousers.jpg" className="img-fluid" ></img></Link>
                </div>
                <div className="col">
                    <Link to="/product/Jeans"><img src="images/jeans.jpg" className="img-fluid"></img></Link>
                </div>
                <div className="col">
                    <Link to="/product/men-jackets-coats"><img src="images/jackets.jpg" className="img-fluid"></img></Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Link to="/product/Innerwear-Sleapwear"><img src="images/innerwear.jpg" className="img-fluid"></img></Link>
                </div>
                <div className="col">
                    <Link to="/product/men-suits"> <img src="images/suits.jpg" className="img-fluid"></img></Link>
                </div>
                <div className="col">
                    <Link to="/product/men-swimwear"><img src="images/swimwear.jpg" className="img-fluid" ></img></Link>
                </div>
                <div className="col">
                    <Link to="/product/track-pants"><img src="images/trackpants.jpg" className="img-fluid"></img></Link>
                </div>
                <div className="col">
                    <Link to="/product/T-Shirts"><img src="images/Tshirts.jpg" className="img-fluid"></img></Link>
                </div>
            </div>

            <div className="text-center headings">
                <h2>POPULAR PRODUCTS</h2>
            </div>
            <div className="row">
                {popularP ?
                    popularP.map((product) => {
                        return (
                            <div className="col">
                                <div className="card">
                                    <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt="..." />
                                    <button className="btn btn-outline-dark card-cart-icon" title="Wishlist"><Heart /></button>
                                    <div className="card-body">
                                        <div className="card-body-section-one text-truncate" style={{width:"210px"}}>
                                            <small>{product.NAME}</small>
                                        </div>
                                        <div className="card-body-section-two">
                                            <p className="card-body-section-two"><b>Price : Rs {product.PRICE}</b></p>
                                        </div>
                                        <div className="card-body-section-three">
                                            <p>rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }) : null}
            </div>

            <div className="text-center headings">
                <h2>NEW ARRIVALS</h2>
            </div>
            <div className="row">
                {newP ?
                    newP.map((product) => {
                        return (
                            <div className="col">
                                <div className="card" style={{ height: "452.4px" }}>
                                    <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt="..." />
                                    <div className="card-body">
                                        <div className="card-body-section-one">
                                            <small>{product.NAME}</small>
                                        </div>
                                        <div className="card-body-section-two">
                                            <p><b>Price : Rs {product.PRICE}</b></p>
                                        </div>
                                        <div className="card-body-section-three">
                                            <p>rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }) : null}
            </div>

        </div>
    )
}

export default HomePage
