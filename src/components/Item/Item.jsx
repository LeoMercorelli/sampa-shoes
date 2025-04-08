import { Link } from 'react-router-dom';
import './Item.modules.css';

const Item = ({ producto }) => {
    return (
        <div className="item">
            <img src={producto.image} alt={producto.title} className="item-img" />
            <h2 className="item-title">{producto.title}</h2>
            <p className="item-price">$ {producto.price}</p>
            <Link to={`/item/${producto.id}`} className="ver-mas">Ver más</Link>
        </div>
    );
};

export default Item;
