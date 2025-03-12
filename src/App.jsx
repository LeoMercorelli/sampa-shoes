import './App.css'
import Navbar from "./components/navbar/Navbar"
import ItemListContainer from "./components/itemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';




function App() {


  return (
    <>
<BrowserRouter>
      <Navbar></Navbar>
      <Routes>
      <Route exact path="/" element={<ItemListContainer greeting="¡Bienvenido a nuestra tienda!" />}/>
      <Route exact path="/item/:productId" element={<ItemDetailContainer />}/>
      <Route exact path="/category/:categoryId" element={<ItemListContainer greeting="Este es nuestro catalogo!"/>}/>

      </Routes>
      </BrowserRouter>
    </>
  )

}
export default App
