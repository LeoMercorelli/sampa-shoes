import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import Item from "../Item/Item";
import "./ItemListContainer.modules.css";

const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams();
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProductos(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error! ", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (categoryId) {
            setProductosFiltrados(productos.filter((prod) => prod.category.toLowerCase() === categoryId.toLowerCase()));
        } else {
            setProductosFiltrados(productos);
        }
    }, [categoryId, productos]);

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    return (
        <section>
            <h1 className="titulo-principal">{greeting}</h1>
            <div className="catalogo-container">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => <Item key={producto.id} producto={producto} />)
                ) : (
                    <p className="mensaje-error">No hay productos en esta categoría</p>
                )}
            </div>
        </section>
    );
};

export default ItemListContainer;
