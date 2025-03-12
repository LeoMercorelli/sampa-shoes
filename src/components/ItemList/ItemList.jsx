import Item from "../Item/Item";


const ItemList = ({ productos }) => {
    return (
        <>
            <div id="catalogo-container">
                {productos.map(producto =>
                    <Item key={producto.id} producto={producto} />)}
            </div>
        </>

    )
};

export default ItemList; 