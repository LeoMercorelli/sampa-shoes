import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Item from "../Item/Item"
import ItemCount from "../ItemCount/ItemCount"
import './ItemDetailContainer.modules.css'

const ItemDetailContainer = ({ producto }) => {
    const { productId } = useParams();
    const [detalle, setDetalle] = useState([])

    useEffect(()=> {
        fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(data => setDetalle(data))
        .catch(error => console.log("Error! ", error));
    }, [productId])

return(
    <div id="detail-container">
        <Item producto={detalle} />
        <p>{detalle.description}</p>
        <h1>USD${detalle.price}</h1>
        <ItemCount />
    </div>
)
}

export default ItemDetailContainer;


