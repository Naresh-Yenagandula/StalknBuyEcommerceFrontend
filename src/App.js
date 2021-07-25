import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Footer from './components/footer';
import Navbar from './components/navbar';
import HomePage from './components/homePage';
import Products from './components/products';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <HomePage/> */}
      <Products/>
      <Footer/>
    </div>
  );
}

export default App;
 