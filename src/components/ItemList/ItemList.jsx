import Item from '../Item/Item'
import './ItemList.modules.css'

// Componente ItemList recibe una lista de productos por props
const ItemList = ({ productos }) => {
  return (
    // Contenedor de la lista de productos
    <div className="item-list">
      {/* Recorre el array de productos y renderiza un componente Item por cada uno */}
      {productos.map(producto => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  )
}

// Exporta el componente para que pueda usarse en otros lados
export default ItemList
