import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import Item from "../Item/Item"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { db } from "../../firebase/client"
import { doc, getDoc } from "firebase/firestore"
import "./ItemDetailContainer.modules.css"

const ItemDetailContainer = () => {
    // Obtenemos el ID del producto desde la URL
    const { productId } = useParams()

    // Estado local para guardar los datos del producto
    const [detalle, setDetalle] = useState(null)

    // Función para agregar un producto al carrito desde el contexto
    const { agregarAlCarrito } = useContext(CartContext)

    // Hook para redireccionar luego de agregar al carrito
    const navigate = useNavigate()

    // Se ejecuta al montar el componente o si cambia el ID
    useEffect(() => {
        const obtenerProducto = async () => {
            try {
                // Referencia al documento del producto en Firebase
                const ref = doc(db, "products", productId)
                const snap = await getDoc(ref)

                // Si el producto existe, lo guardamos en el estado
                if (snap.exists()) {
                    setDetalle({ id: snap.id, ...snap.data() })
                } else {
                    console.log("El producto no existe")
                }
            } catch (error) {
                console.error("Error al obtener el producto:", error)
            }
        }

        obtenerProducto()
    }, [productId])

    // Handler para agregar productos al carrito
    const agregarAlCarritoHandler = (cantidadElegida) => {
        const nuevoItem = {
            id: detalle.id,
            nombre: detalle.title,
            precio: detalle.price,
            cantidad: cantidadElegida,
            imagen: detalle.image,
        }

        agregarAlCarrito(nuevoItem)
        navigate('/cart') // Redirige al carrito después de agregar
    }

    // Mientras se carga el producto
    if (!detalle) return <p>Cargando producto...</p>

    return (
        <div id="detail-container">
            {/* Componente que muestra los datos básicos del producto */}
            <Item producto={detalle} />

            {/* Info adicional y selector de cantidad */}
            <div className="info-extra">
                <p>{detalle.description}</p>
                <h1>USD {detalle.price}</h1>

                {/* Componente de contador con botón de agregar */}
                <ItemCount
                    stock={detalle.stock || 10}
                    onAgregar={agregarAlCarritoHandler}
                />
            </div>
        </div>
    )
}

export default ItemDetailContainer
