import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Footer from './components/footer';
import Navbar from './components/navbar';
import HomePage from './components/homePage';
import Products from './components/products';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductDetails from './components/productDetails';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ProductContext = React.createContext()


function App() {
  const [NewProducts, setNewProducts] = useState()
  const [PopularProducts, setPopularProducts] = useState()
  const [FilterProducts, setFilterProducts] = useState()

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/new`)
      .then((res) => {
        setNewProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/product/popular`)
      .then((res) => {
        setPopularProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      })

  }, [])

  const extractData = (product) => {
    let brand = "";
    let desc = "";
    let rating = product.RATING;
    brand = product.DESCRIPTION_COLOR.split(",")[1];
    let size = product.SIZE;
    let arr = product.DESCRIPTION_COLOR.split(",");
    desc = arr[arr.length - 2].replace("Buy ", "").replace(" Online in India", "").replace(brand.trim(), "").replace(size.split(" ")[0], "").replace(/fit/gi, "").replace("-", "").replace(/\s+/g, ' ');
    return { brand, desc, rating }

}

const setFilterProductData=(data)=>{
  setFilterProducts(data)
}

  return (
    <div className="App">
      <Navbar />
      <ProductContext.Provider value={{newProducts:NewProducts,popularProducts:PopularProducts,extractData:extractData,setFilterProductData:setFilterProductData,FilterProducts:FilterProducts}}>
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/product" exact component={Products} />
            <Route path="/productDetails/:id" exact component={ProductDetails} />
          </Switch>
        </Router>
      </ProductContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
