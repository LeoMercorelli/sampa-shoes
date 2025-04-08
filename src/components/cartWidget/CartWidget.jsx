import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Badge from '@mui/material/Badge';
import "./cartWidget.modules.css";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
    const { totalProductos } = useContext(CartContext);

    return (
        <div id="carrito">
        <Link to="/cart">
        <Badge badgeContent={totalProductos} color="primary" id="badge">
            <ShoppingCartTwoToneIcon fontSize='large' > </ShoppingCartTwoToneIcon>
        </Badge>
        </Link>
    </div>
    );
};

export default CartWidget;

