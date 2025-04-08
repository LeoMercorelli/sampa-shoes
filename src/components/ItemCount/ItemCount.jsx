import { useState } from 'react';
import './ItemCount.modules.css';

const ItemCount = ({ stock, onAgregar }) => {
    // Estado local para llevar el conteo de productos a agregar
    const [contador, setContador] = useState(1);

    // Aumenta el contador, hasta el máximo de stock disponible
    const aumentar = () => {
        if (contador < stock) setContador(contador + 1);
    };

    // Disminuye el contador, hasta un mínimo de 1
    const disminuir = () => {
        if (contador > 1) setContador(contador - 1);
    };

    // Maneja cambios manuales en el input de cantidad
    const manejarInput = (e) => {
        const valor = parseInt(e.target.value);
        // Validación para evitar valores fuera de rango o no numéricos
        if (!isNaN(valor) && valor >= 1 && valor <= stock) {
            setContador(valor);
        }
    };

    return (
        <div className="item-count">
            <div className="contador">
                {/* Botón para disminuir */}
                <button className="boton" onClick={disminuir}>-</button>

                {/* Input de cantidad controlado */}
                <input
                    type="number"
                    value={contador}
                    onChange={manejarInput}
                    className="input-cantidad"
                    min={1}
                    max={stock}
                />

                {/* Botón para aumentar */}
                <button className="boton" onClick={aumentar}>+</button>
            </div>

            {/* Botón para agregar productos al carrito */}
            <button className="agregar-btn" onClick={() => onAgregar(contador)}>
                Agregar al carrito
            </button>
        </div>
    );
};

export default ItemCount;
