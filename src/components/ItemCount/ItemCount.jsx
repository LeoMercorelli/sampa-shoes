import { useState } from 'react';


const ItemCount = () => {

    const [contador, setContador] = useState(1)

    const aumentarContador = () => {
        if (contador < 100) {
            setContador(contador + 1)
        }
    }

    const restarContador = () => {
        if (contador > 1) {
            setContador(contador - 1)
        }
    }

    const agregarCarrito = () => {
        console.log("Agregamos al carrito " + contador + " productos!")
    }

    const funcionesInput = (numero) => {
        if (numero > 0 && numero < 100) {
            setContador(numero)
        }
        else {
            console.log("Error!")
        }
    }


    return (
        <div>
            <input type="number" onChange={(event) => funcionesInput(parseInt(event.target.value))} value={contador} />


            <div>
                <button onClick={restarContador}>-</button>
                <button onClick={aumentarContador}>+</button>
            </div>

            <button onClick={agregarCarrito}>Agregar al carrito</button>
        </div>
    )
}

export default ItemCount

