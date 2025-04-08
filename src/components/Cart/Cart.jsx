import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { db } from '../../firebase/client';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import './Cart.css';

const Cart = () => {
  const {
    lista,
    totalGeneral,
    vaciarCarrito,
    eliminarProducto,
    actualizarCantidad,
  } = useContext(CartContext);

  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
  });

  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  // Maneja los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Verifica si todos los campos del formulario están completos
  const validarFormulario = () => {
    return formulario.nombre && formulario.email && formulario.telefono;
  };

  // Crea y guarda la orden de compra en Firestore
  const handleFinalizarCompra = async () => {
    if (!validarFormulario()) {
      setMensaje('Por favor completa todos los campos.');
      return;
    }

    const orden = {
      buyer: { ...formulario },
      items: lista.map((item) => ({
        id: item.id,
        title: item.nombre,
        quantity: item.cantidad,
        price: item.precio,
      })),
      date: Timestamp.now(),
      total: totalGeneral,
    };

    try {
      const ordenRef = collection(db, 'orders');
      const doc = await addDoc(ordenRef, orden);

      setMensaje(`¡Gracias por tu compra! Tu número de orden es: ${doc.id}`);
      vaciarCarrito();

      // Redirige al home luego de mostrar el mensaje
      setTimeout(() => {
        setMensaje('');
        navigate('/');
      }, 4000);
    } catch (error) {
      console.error('Error al generar la orden:', error);
      setMensaje('Hubo un error al procesar tu compra. Intenta nuevamente.');
    }
  };

  return (
    <div className="cart-container">
      <h2>Carrito de compras</h2>

      {mensaje && (
        <div className="alert alert-success text-center" role="alert">
          {mensaje}
        </div>
      )}

      {lista.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="cart-lista">
            {lista.map((producto) => (
              <li key={producto.id} className="cart-item">
                {/* Imagen del producto */}
                {producto.imagen && (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="cart-img"
                  />
                )}

                <div className="cart-detalle">
                  <h3>{producto.nombre}</h3>
                  <p>
                    Precio: ${producto.precio} x {producto.cantidad} = ${' '}
                    {producto.precio * producto.cantidad}
                  </p>

                  {/* Controles de cantidad */}
                  <div className="cart-controles">
                    <button
                      onClick={() => actualizarCantidad(producto.id, -1)}
                      disabled={producto.cantidad === 1}
                    >
                      -
                    </button>
                    <span>{producto.cantidad}</span>
                    <button onClick={() => actualizarCantidad(producto.id, 1)}>
                      +
                    </button>
                  </div>
                </div>

                {/* Botón eliminar producto */}
                <button
                  className="btn-eliminar"
                  onClick={() => eliminarProducto(producto.id)}
                  aria-label={`Eliminar ${producto.nombre}`}
                >
                  <DeleteOutlineIcon />
                </button>
              </li>
            ))}
          </ul>

          {/* Total del carrito */}
          <div className="cart-total">
            <strong>Total: ${totalGeneral}</strong>
          </div>

          {/* Formulario para finalizar compra */}
          <div className="cart-formulario">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formulario.nombre}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formulario.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formulario.telefono}
              onChange={handleInputChange}
            />
          </div>

          {/* Botones de acción */}
          <div className="cart-botones">
            <button className="cart-btn" onClick={() => navigate('/')}>
              Seguir comprando
            </button>
            <button className="cart-btn" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
            <button
              className="cart-btn finalizar"
              onClick={handleFinalizarCompra}
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
