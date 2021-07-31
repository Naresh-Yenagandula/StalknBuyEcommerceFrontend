import React from 'react'
import { CircleFill, StarFill, Star } from 'react-bootstrap-icons'
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Products(props) {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();

    // let {category} = useParams();
    const [data, setData] = useState();
    const [url, setURL] =  useState();

    const [color, setColor] = useState([]);
    const [brand, setBrand] = useState([]);
    const [fabric, setFabric] = useState([]);
    const [Size, setSize] = useState([]);
    const [category, setCategory] = useState([]);
    const [price, setPrice] = useState([]);
    

    const [colorA, setColorA] = useState([]);
    const [brandA, setBrandA] = useState([]);
    const [fabricA, setFabricA] = useState([]);
    const [SizeA, setSizeA] = useState([]);
    const [categoryA, setCategoryA] = useState([]);
    const [priceA, setPriceA] = useState([]);


    const [count, setCount] = useState([1, 2, 3, 4, 5]);
    
    useEffect(async() => 
    {
        let categoryU;
        let sizeU;
        let brandU;
        let fabricU;
        let colorU;
        let priceU;
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/distinct`)
        .then((result)=>{
            setCategoryA(result.data.category);
            setBrandA(result.data.brand);
            setSizeA(result.data.size);
            setFabricA(result.data.fabric);
            // console.log(result.data.brand)

             categoryU = query.get("category")
             priceU = query.get("price")
             fabricU = query.get("fab")
             colorU = query.get("color")
             brandU = query.get("brand")
             sizeU = query.get("size")
        })
        .catch((e)=>{
            console.log(e)
        })
       

        console.log(categoryU, priceU, fabricU, colorU, brandU, sizeU);
     
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/categories?cat=${categoryU}&price=${priceU}&size=${sizeU}&brand=${brandU}&color=${colorU}&fab=${fabricU}`) // backend url, not frontend url
            .then((res) => {
                setData(res.data.products);
                // console.log(data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [url]);

    const productDetails = (product) => {
        let brand = "";
        let desc = "";
        let rating = product.RATING;
        // console.log(rating);
        brand = product.DESCRIPTION_COLOR.split(",")[1];
        let size = product.SIZE;
        // console.log(size);
        let arr = product.DESCRIPTION_COLOR.split(",");
        desc = arr[arr.length - 2].replace("Buy ", "").replace(" Online in India", "").replace(brand.trim(), "").replace(size.split(" ")[0], "").replace(/fit/gi, "").replace("-", "").replace(/\s+/g, ' ');
        // console.log(desc);
        return { brand, desc, rating }

    }

    const checkColor = (val) => {
        const ind = color.indexOf(val);
        if (ind == -1) {
            color.push(val);
        }
        else {
            color.splice(ind, 1);
        }
    }

    const checkCategory = (val) => 
    {
        if(val==="shirts")
        {
            const index1 = category.indexOf("casual-shirts")
            const index2 = category.indexOf("formal-shirts")
            if(index1===-1 || index2===-1){
                category.push("casual-shirts")
                category.push("formal-shirts")
            }else{
                category.splice(index1,1)
                category.splice(index1,1)
            }
            return true;
        }else if(val==="trousers"){
            const index1 = category.indexOf("Men-Formal-Trousers")
            const index2 = category.indexOf("Men-Casual-Trousers")
            if(index1===-1 || index2===-1){
                category.push("Men-Formal-Trousers")
                category.push("Men-Casual-Trousers")
            }else{
                category.splice(index1,1)
                category.splice(index1,1)
            }
            return true;
        }

        const ind = category.indexOf(val);
        if (ind == -1) {
            category.push(val);
        }
        else {
            category.splice(ind, 1);
        }
    }

    const checkPrice = (val) => {
        const ind = price.indexOf(val);
        if (ind == -1) {
            price.push(val);
        }
        else {
            price.splice(ind, 1);
        }
    }

    const checkBrand = (val) => {
        const ind = brand.indexOf(val);
        if (ind == -1) {
            brand.push(val);
        }
        else {
            brand.splice(ind, 1);
        }
    }

    const checkSize = (val) => {
        const ind = Size.indexOf(val);
        if (ind == -1) {
            Size.push(val);
        }
        else {
            Size.splice(ind, 1);
        }
    }

    const checkFabric = (val) => {
        const ind = fabric.indexOf(val);
        if (ind == -1) {
            fabric.push(val);
        }
        else {
            fabric.splice(ind, 1);
        }
    }

    const apply = () => 
    {
        //console.log(category,color,brand,fabric,price);
        let strURL = `?category=${category.join(",")}&price=${price.join(",")}&size=${Size.join(",")}&fab=${fabric.join(",")}&color=${color.join(",")}&brand=${brand.join(",")}`
        setURL(strURL);
        props.history.push(strURL);

    }

    const resetAll =()=>
    {
        document.getElementById("reset").reset();
        setCategory([]);
        setColor([]);
        setPrice([]);
        setBrand([]);
        setFabric([]);
        setSize([]);
    }

    return (
        <div>
            <div className="container py-4">
                <h4>
                    Mens Fashion Store
                </h4>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Products</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </nav>
            </div>
            <div className="row">

                <div className="col-md-3">

                    <div style={{ height: "80vh", width: "250px" }} className="overflow-auto sidebar">
                        <div className="container d-flex justify-content-between align-items-center py-3">
                            <b>FILTERS</b>
                            {/* <button className ="btn btn-outline-secondary btn-sm">Reset All</button> */}
                        </div>
                        <div className="container d-flex justify-content-between align-items-center py-3">
                            <button className="btn btn-outline-secondary btn-sm" onClick={(e)=>resetAll()}>Reset All</button>
                            <button className="btn btn-outline-secondary btn-sm" onClick={(e) => apply()}>APPLY</button>
                        </div>
                        <div className="accordion" id="accordionPanelsStayOpenExample">
                        <form id ="reset">
                        {/* //Categories */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                        Categories
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                                    <div className="accordion-body ps-4">

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory("Innerwear_Sleapwear")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Innerwear & Sleepwear
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory("accessories")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                accessories
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory("shirts")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                shirts
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory("trousers")}  />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                trousers
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory("Jeans")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Jeans
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory("men-jackets-coats")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                men-jackets-coats
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory("men-suits")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                men-suits
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory(" men-swimwear")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                men-swimwear
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory("T-Shirts")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                T-Shirts
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkCategory("track-pants")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                track-pants
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        {/* //Color */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                        color
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                    <div className="accordion-body ps-4">
                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Black")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "black" }} /> Black
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("White")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "#f5f5f5" }} /> White
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Red")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "red" }} /> Red
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Teal")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "teal" }} /> Teal
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Blue")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "blue" }} /> Blue
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Green")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "Green" }} /> Green
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Orange")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "orange" }} /> Orange
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Brown")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "brown" }} /> Brown
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Navy Blue")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "#000080" }} /> Navy Blue
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Grey")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "grey" }} /> Grey
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkColor("Purple")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                <CircleFill className="me-2" style={{ color: "purple" }} /> Purple
                                            </label>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        {/* //Brands */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                        Brands
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                    <div className="accordion-body ps-4">

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand("Baggit")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Baggit
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand("Puma")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Puma
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand("Roadster")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Roadster
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand("Peter England")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Peter England
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand("Tommy Hilfiger")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Tommy Hilfiger
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand("Adidas")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Adidas
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand("HRX")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                HRX
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkBrand("Fastrack")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Fastrack
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        {/* //price */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                        Price
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                                    <div className="accordion-body ps-4">

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkPrice("100-2000")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                100-2000
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkPrice("2001-7000")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                2001-7000
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkPrice("7001-20000")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                7001-20000
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkPrice("20000-50000")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                20000-50000
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>


                        {/* //Size */}
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                                        Size
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                                    <div className="accordion-body ps-4">
                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkSize("Regular-Fit")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Regular-Fit
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkSize("Slim-fit")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Slim-fit
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkSize("Skinny-fit")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Skinny-fit
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => checkSize("Narrow-fit")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Narrow-fit
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="panelsStayOpen-headingSix">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSix" aria-expanded="false" aria-controls="panelsStayOpen-collapseSix">
                                        Fabric
                                    </button>
                                </h2>
                                <div id="panelsStayOpen-collapseSix" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingSix">
                                    <div className="accordion-body ps-4">
                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Cotton")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Cotton
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Polyester")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Polyester
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Wool")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Wool
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Spandex")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Spandex
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Elastane")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Elastane
                                            </label>
                                        </div>

                                        <div className="form-check ps-">
                                            <input className="form-check-input me-4" type="checkbox" value="" id="flexCheckDefault" onClick={e => checkFabric("Viscous")} />
                                            <label className="form-check-label" for="flexCheckDefault">
                                                Viscous
                                            </label>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="d-flex justify-content-end pe-5">
                        <div className="dropdown">
                            <button className="btn dropdown-toggle btn-outline-secondary " type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort by
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#">Price: High to Low</a></li>
                                <li><a className="dropdown-item" href="#">Price: Low to High</a></li>
                                <li><a className="dropdown-item" href="#">Customer Ratings</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="row mt-3 row-cols-4">
                        {data ?
                            data.map((product) => {
                                let obj = productDetails(product);
                                return (
                                    <div className="col mb-4">
                                        <div className="card box-shadow">
                                            <img src={product.IMAGE} className="card-img-top" height="280px" width="210px" alt="..." />
                                            <div className="card-body" style={{ height: "120px" }}>
                                                <div className="card-body-section-one ">
                                                    <b style={{ paddingBottom: "1px" }}>{obj.brand}</b><br />
                                                    <p style={{ fontSize: "12px", paddingBottom: "0.2px" }}>{obj.desc}</p>
                                                </div>
                                                <div className="card-body-section-two" style={{ paddingTop: "10px" }}>
                                                    <small className="card-body-section-two">Rs {product.PRICE}</small>
                                                </div>
                                                <div className="card-body-section-three" style={{ paddingTop: "10px" }}>

                                                    {count.map((i) => {
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
                            }) : null}
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Products
