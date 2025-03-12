import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import "./navbar.modules.css";
import CartWidget from "../cartWidget/CartWidget";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate()
    const [menuEstado, setMenu] = useState(null);

    const abrirMenu = (event) => {
        setMenu(event.currentTarget);
    }

    const cerrarMenu = () => {
        setMenu(null);
    };

    return (
        <AppBar id="header">

            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate('/')} component="span" id="principal">
                <img src="../../../img/logo.jpg" alt="" id="logo"></img>
                <h2>SAMPA SHOES</h2>
            </Typography>

            <IconButton onClick={abrirMenu} id="categorias" color="success" variant="contained">Categorias</IconButton>

            <CartWidget></CartWidget>

            <Menu
                anchorEl={menuEstado}
                open={Boolean(menuEstado)}
                onClose={cerrarMenu}>

                <MenuItem onClick={() => {
                    cerrarMenu();
                    navigate(`/category/men's clothing`);
                }}>Ropa de hombre</MenuItem>


                <MenuItem onClick={() => {
                    cerrarMenu();
                    navigate(`/category/women's clothing`);
                }}>Ropa de mujer</MenuItem>

                <MenuItem onClick={() => {
                    cerrarMenu();
                    navigate(`/category/electronics`);
                }}>Electronica</MenuItem>

                <MenuItem onClick={() => {
                    cerrarMenu();
                    navigate(`/category/jewelery`);
                }}>Joyas</MenuItem>

                <MenuItem onClick={() => {
                    cerrarMenu();
                    navigate(`/category/armas`);
                }}>Armas</MenuItem>
            </Menu>

        </AppBar>
    );
}


export default Navbar