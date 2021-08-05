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
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/id`)
                .then((res) => {
                    setidData(res.data.products)
                    console.log(res.data.products);
                })
                .catch((err) => {
                    console.log(err);
                })
        }else{
            const productData = value.FilterProducts.filter(e=>{return e.PRODUCT_ID===parseInt(id)})
            setidData(productData)
        }
    }, [])
    return (
        <div>

        </div>
    )
}

export default ProductDetails
