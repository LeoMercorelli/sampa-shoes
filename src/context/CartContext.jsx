import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartContextComponent = ({ children }) => {
    const [lista, setLista] = useState([]); // Lista de productos en el carrito

    const agregarAlCarrito = (nuevoProducto) => {
        const productoExistente = lista.find((item) => item.id === nuevoProducto.id);

        if (productoExistente) {
            // Si ya está, suma la cantidad
            const listaActualizada = lista.map((item) =>
                item.id === nuevoProducto.id
                    ? { ...item, cantidad: item.cantidad + nuevoProducto.cantidad }
                    : item
            );
            setLista(listaActualizada);
        } else {
            setLista([...lista, nuevoProducto]);
        }
    };

    // Suma o resta cantidad (mínimo 1)
    const actualizarCantidad = (id, cambio) => {
        const listaActualizada = lista.map((item) =>
            item.id === id
                ? { ...item, cantidad: Math.max(1, item.cantidad + cambio) }
                : item
        );
        setLista(listaActualizada);
    };

    const vaciarCarrito = () => {
        setLista([]);
    };

    const eliminarProducto = (id) => {
        const nuevaLista = lista.filter((item) => item.id !== id);
        setLista(nuevaLista);
    };

    // Total de unidades
    const totalProductos = lista.reduce((total, item) => total + item.cantidad, 0);

    // Total en $ del carrito
    const totalGeneral = lista.reduce((total, item) => total + item.precio * item.cantidad, 0);

    return (
        <CartContext.Provider
            value={{
                lista,
                agregarAlCarrito,
                actualizarCantidad,
                vaciarCarrito,
                eliminarProducto,
                totalProductos,
                totalGeneral
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
