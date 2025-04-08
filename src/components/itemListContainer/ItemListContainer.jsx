import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/client";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.modules.css";

// Componente principal que muestra una lista de productos, opcionalmente filtrados por categoría
const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams(); // Obtiene el parámetro de categoría desde la URL
    const [productos, setProductos] = useState([]); // Estado para almacenar productos
    const [cargando, setCargando] = useState(true); // Estado para controlar el loading

    useEffect(() => {
        // Función asincrónica que obtiene los productos desde Firestore
        const obtenerProductos = async () => {
            setCargando(true); // Activa el mensaje de carga
            try {
                // Referencia a la colección "products" en Firestore
                const productosRef = collection(db, "products");

                // Si hay una categoría en la URL, hace una consulta filtrada, sino trae todos los productos
                const consulta = categoryId
                    ? query(productosRef, where("categoryId", "==", categoryId))
                    : query(productosRef);

                // Ejecuta la consulta y obtiene el snapshot
                const snapshot = await getDocs(consulta);

                // Mapea los documentos a un array de productos con su id
                const productosFirestore = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Actualiza el estado con los productos obtenidos
                setProductos(productosFirestore);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            } finally {
                setCargando(false); // Finaliza la carga sin importar si hubo error o no
            }
        };

        // Llama a la función para obtener los productos
        obtenerProductos();
    }, [categoryId]); // Se vuelve a ejecutar cada vez que cambia la categoría

    return (
        <div className="itemlist-container">
            {/* Muestra un mensaje de bienvenida recibido por props */}
            <h2 className="greeting">{greeting}</h2>

            {/* Si está cargando, muestra un mensaje; si no, muestra la lista de productos */}
            {cargando ? (
                <p className="loading">Cargando productos...</p>
            ) : (
                <ItemList productos={productos} />
            )}
        </div>
    );
};

export default ItemListContainer;
