import axios from 'axios';
import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom';

function ProductDetails() 
{
    const {id} = useParams();
    console.log(id);
    
    const [idData, setidData] = useState()
    useEffect(() => 
    {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/id`)
        .then((res)=>
        {
            console.log(res.data.products);
        })
        .catch((err)=>
        {
            console.log(err);
        })
    },[])
    return (
        <div>
            
        </div>
    )
}

export default ProductDetails
