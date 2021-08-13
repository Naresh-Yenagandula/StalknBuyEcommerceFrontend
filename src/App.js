import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Footer from './components/footer';
import Navbar from './components/navbar';
import HomePage from './components/homePage';
import Products from './components/products';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductDetails from './components/productDetails';
import React, { useEffect, useState,useCallback } from 'react';
import axios from 'axios';
import { Search } from 'react-bootstrap-icons';
import SignUp from './components/signup';
import Login from './components/login'
import Forgotpassword from './components/forgotpassword';
import Wishlist from './components/wishlist';

export const ProductContext = React.createContext()


function App() {
  const [NewProducts, setNewProducts] = useState()
  const [PopularProducts, setPopularProducts] = useState()
  const [FilterProducts, setFilterProducts] = useState()
  const [count, setCount] = useState([1, 2, 3, 4, 5]);
  const [searchValue, setsearchValue] = useState();
  const [userData, setuserData] = useState()
  const [Wishlists, setWishlist] = useState([])
 
  const search = (searchValue,e)=>{
        // e.preventDefault();
        setsearchValue(searchValue);
  }
  const authToken = useCallback(()=>
  {
    const token = localStorage.getItem('token')
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/verify?token=${token}`)
    .then((res) => {
      setuserData(res.data.user);
      setWishlist(res.data.user[0].WISHLIST)
      
      console.log(res.data.user[0].WISHLIST)
    })
    .catch((err) => {
      console.log(err);
    })
  },[])



  const updateWishlist=(product)=>{
    let temp=Wishlists
    console.log(Wishlists)
    let index=Wishlists.findIndex(p=>p._id===product._id)
    console.log(index)
    if(index===-1)
    {
      temp.push(product)
    }
    else{
      temp.splice(index,1)
      
    }
    setWishlist(temp);
  }



  useEffect(() => {

    authToken();

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

  }, [authToken])

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

  const setFilterProductData = (data) => {
    setFilterProducts(data)
  }

  return (
    <div className="App">
      <ProductContext.Provider value={{search:search,searchValue:searchValue,count: count, newProducts: NewProducts, popularProducts: PopularProducts, extractData: extractData, setFilterProductData: setFilterProductData, FilterProducts: FilterProducts,authToken:authToken, userData: userData, Wishlist:Wishlists,updateWishlist:updateWishlist}}>
        <Router>
          
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/product" exact component={Products} />
            <Route path="/product/:popular" exact component={Products} />
            <Route path="/productDetails/:id" exact component={ProductDetails} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login}/>
            <Route path="/forgotpass" exact component={Forgotpassword}/>
            <Route path="/wishlist" exact component={Wishlist}/>
          </Switch>
        </Router>
      </ProductContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
