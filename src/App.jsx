import './App.css'
import Navbar from "./components/navbar/Navbar"
import ItemListContainer from "./components/itemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from './components/Cart/Cart'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartContextComponent } from './context/CartContext';




function App() {


  return (
    <>
<CartContextComponent>
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />} />
      <Route exact path="/item/:productId" element={<ItemDetailContainer />} />
      <Route exact path="/category/:categoryId" element={<ItemListContainer greeting="Este es nuestro catálogo!" />} />
      <Route exact path="/cart" element={<Cart />} />
      </Routes>
  </BrowserRouter>
</CartContextComponent>

    </>
  )

}
export default App
