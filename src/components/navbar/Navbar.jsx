import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import Button from '@mui/material/Button';
import { useState } from "react";
import "./navbar.modules.css";
import CartWidget from "../cartWidget/CartWidget";

const Navbar = () => {
    const [menuEstado, setMenu] = useState(null);

    const abrirMenu = (event) => {
        setMenu(event.currentTarget); 
    }

    const cerrarMenu = () => {
        setMenu(null); 
    };

    return (
        <AppBar id="header">

                <Typography component="span" id="principal">
                    <img src="../../../img/logo.jpg" alt=""  id="logo"></img>
                    <h2>SAMPA SHOES</h2>
                </Typography>

                <IconButton onClick={abrirMenu} id="categorias">
                    <Button color="success" variant="contained">Categorias</Button>
                </IconButton>

                <CartWidget></CartWidget>

                <Menu
                anchorEl={menuEstado} 
                open={Boolean(menuEstado)}
                onClose={cerrarMenu}>
    
                    <MenuItem onClick={cerrarMenu}>Hombres</MenuItem>
                    <MenuItem onClick={cerrarMenu}>Mujeres</MenuItem>
                </Menu>

        </AppBar>
    );
}


export default Navbar