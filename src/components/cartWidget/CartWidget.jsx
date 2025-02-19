import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import Badge from '@mui/material/Badge';
import "./cartWidget.modules.css";


const CartWidget = () => {

    return (
    <div id="carrito">
        <Badge badgeContent={4} color="primary" id="badge">
            <ShoppingCartTwoToneIcon fontSize='large' > </ShoppingCartTwoToneIcon>
        </Badge>
    </div>
    )
}

export default CartWidget
