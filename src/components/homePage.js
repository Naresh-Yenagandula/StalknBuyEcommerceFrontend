import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {StarFill, Star} from 'react-bootstrap-icons'

function HomePage() {

    
    const [newP, setNewP] = useState();
    const [popularP, setPopularP] = useState();
    const [count,setCount] = useState([1,2,3,4,5]);

   
    useEffect(() => 
    {

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/new`)
            .then((res) => {
                setNewP(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/popular`)
            .then((res) => {
                setPopularP(res.data.products);
            })
            .catch((err) => {
                console.log(err);
            })

    }, [])

    const productDetails = (product)=>
    {
        let brand="";
        let desc="";
        let rating = product.RATING;
        console.log(rating);
        brand = product.DESCRIPTION_COLOR.split(",")[1];
        let size = product.SIZE;
        console.log(size);
        let arr = product.DESCRIPTION_COLOR.split(",");
        desc = arr[arr.length-2].replace("Buy ", "").replace(" Online in India", "").replace(brand.trim(),"").replace(size.split(" ")[0],"").replace(/fit/gi,"").replace("-", "").replace(/\s+/g,' ');
        console.log(desc);
        return {brand,desc, rating}
        
    }

    return (
        <div className="container pb-5">
            <div className="text-center headings">
                <h2>CATEGORIES</h2>
            </div>
            <div className="row">
            <div className ="col">
                  <Link to="/product?category=accessories"><img src="images/accessories.jpg" className="img-fluid"></img> </Link> 
                </div>
                <div className ="col">
                <Link to="/product?category=casual-shirts,formal-shirts"><img src="images/shirts.jpg" className="img-fluid"></img></Link>
                </div>
                <div className ="col">
                <Link to="/product?category=Men-Casual-Trousers,Men-Formal-Trousers"><img src="images/trousers.jpg" className="img-fluid" ></img></Link>
                </div>
                <div className ="col">
                <Link to="/product?category=Jeans"><img src="images/jeans.jpg" className="img-fluid"></img></Link>
                </div>
                <div className ="col">
                <Link to="/product?category=men-jackets-coats"><img src="images/jackets.jpg" className="img-fluid"></img></Link>
                </div>
           </div>
           <div className ="row">
                <div className ="col">
                <Link to="/product?category=Innerwear & Sleapwear"><img src="images/innerwear.jpg" className="img-fluid"></img></Link>
                </div>
                <div className ="col">
                <Link to="/product?category=men-suits"> <img src="images/suits.jpg" className="img-fluid"></img></Link>  
                </div>
                <div className ="col">
                <Link to="/product?category=men-swimwear"><img src="images/swimwear.jpg" className="img-fluid" ></img></Link> 
                </div>
                <div className ="col">
                <Link to="/product?category=track-pants"><img src="images/trackpants.jpg" className="img-fluid"></img></Link>
                </div>
                <div className ="col">
                <Link to="/product?category=T-Shirts"><img src="images/Tshirts.jpg" className="img-fluid"></img></Link>
                </div>
            </div>

            <div className="text-center headings">
                <h2>POPULAR PRODUCTS</h2>
            </div>
            <div className="row">
                {popularP ?
                    popularP.map((product) => 
                    {
                        let obj = productDetails(product);
                        return(
                            <div className="col mb-4">
                            <div className="card box-shadow">
                                <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt="..." />
                                <div className="card-body" style={{height:"120px"}}>
                                    <div className="card-body-section-one ">
                                        <b style={{paddingBottom:"1px"}}>{obj.brand}</b><br/>
                                        <p style={{fontSize:"12px", paddingBottom:"0.2px"}}>{obj.desc}</p>
                                    </div>
                                    <div className="card-body-section-two" style={{paddingTop:"10px"}}>
                                        <small className="card-body-section-two">Rs {product.PRICE}</small>
                                    </div>
                                    <div className="card-body-section-three" style={{paddingTop:"10px"}}>
                                     
                                        {count.map((i)=>
                                            {
                                            if(i<= obj.rating)
                                            {   
                                                return(
                                                    <small ><StarFill className="star-color"/></small>
                                                )
                                            }
                                            else
                                            {
                                                return(
                                                    <small><Star/></small>
                                                )
                                            }
                            
                                        })}
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
                        let obj = productDetails(product);
                        return(
                            <div className="col mb-4">
                            <div className="card box-shadow">
                                <img src={product.IMAGE} className="card-img-top" height="340px" width="210px" alt="..." />
                                <div className="card-body" style={{height:"120px"}}>
                                    <div className="card-body-section-one ">
                                        <b style={{paddingBottom:"1px"}}>{obj.brand}</b><br/>
                                        <p style={{fontSize:"12px", paddingBottom:"0.2px"}}>{obj.desc}</p>
                                    </div>
                                    <div className="card-body-section-two" style={{paddingTop:"10px"}}>
                                        <small className="card-body-section-two">Rs {product.PRICE}</small>
                                    </div>
                                    <div className="card-body-section-three" style={{paddingTop:"10px"}}>
                                     
                                        {count.map((i)=>
                                            {
                                            if(i<= obj.rating)
                                            {   
                                                return(
                                                    <small ><StarFill className="star-color"/></small>
                                                )
                                            }
                                            else
                                            {
                                                return(
                                                    <small><Star/></small>
                                                )
                                            }
                            
                                        })}
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
