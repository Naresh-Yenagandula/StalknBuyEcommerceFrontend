import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Footer from './components/footer';
import Navbar from './components/navbar';
import HomePage from './components/homePage';
import Products from './components/products';
import {BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import ProductDetails from './components/productDetails';


function App() 
{
  
  return (
    <div className="App">
      <Navbar/>
    
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/product" exact component={Products}/>
          <Route path="/productDetails/:id" exact component={ProductDetails}/>
        </Switch>
      </Router>

      <Footer/>
    </div>
  );
}

export default App;
 