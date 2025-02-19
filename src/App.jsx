import './App.css'
import Navbar from "./components/navbar/Navbar"
import ItemListContainer from "./components/itemListContainer/ItemListContainer";




function App() {


  return (
    <>
      <Navbar></Navbar>

      <ItemListContainer greeting="¡Bienvenido a nuestra tienda!"></ItemListContainer>
    </>
  )

}
export default App
