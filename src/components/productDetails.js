import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ProductContext } from '../App';

function ProductDetails() {
    const value = useContext(ProductContext)
    const { id } = useParams();
    const [idData, setidData] = useState()

    useEffect(() => {
        if (!value.FilterProducts) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/product/${id}`)
                .then((res) => {
                    setidData(res.data.products[0])
                    console.log(res.data.products[0]);
                })
                .catch((err) => {
                    console.log(err);
                })
        }else{
            const productData = value.FilterProducts.filter(e=>{return e.PRODUCT_ID===parseInt(id)})
            setidData(productData[0])
            console.log(productData);
        }
    }, [])
    return (
        <div>
             <div className="container-fluid">
                            <div className="row">
                                {idData?
                                
                                <>
                                
                                <div className="col-md-4 offset-md-1 col-sm-6">
                                    <img className="img-fluid modal-image"  src={idData.IMAGE}/>
                                </div>
                                <div className="col-md-6 col-sm-6 offset-md-1 text-center mt-5">
                                 <h3>{idData.BRAND}</h3>
                                 {/* <p>{value.extractData(idData).desc}</p>     */}
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
                                 
                                </div></>:null}

                            </div>
                            </div>

        </div>
    )
}

export default ProductDetails
