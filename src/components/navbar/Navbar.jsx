import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import "./navbar.modules.css";
import CartWidget from "../cartWidget/CartWidget";
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/client";

const Navbar = () => {
    const navigate = useNavigate();
    const [menuEstado, setMenu] = useState(null); // Controla si el menú está abierto
    const [categorias, setCategorias] = useState([]); // Guarda las categorías únicas

    const abrirMenu = (event) => {
        setMenu(event.currentTarget);
    };

    const cerrarMenu = () => {
        setMenu(null);
    };

    // Obtener categorías desde Firestore (únicas)
    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const productosRef = collection(db, "products");
                const snapshot = await getDocs(productosRef);
                const productos = snapshot.docs.map(doc => doc.data());
                const categoriasUnicas = [...new Set(productos.map(p => p.categoryId))];
                setCategorias(categoriasUnicas);
            } catch (error) {
                console.error("Error al obtener categorías:", error);
            }
        };

        obtenerCategorias();
    }, []);

    return (
        <AppBar id="header">
            {/* Logo + nombre, hace navigate al home */}
            <Typography sx={{ cursor: "pointer" }} onClick={() => navigate('/')} component="span" id="principal">
                <img src="../../../img/logo.jpg" alt="" id="logo" />
                <h2>SAMPA SHOES</h2>
            </Typography>

            {/* Botón que abre el menú de categorías */}
            <IconButton onClick={abrirMenu} id="categorias" color="success" variant="contained">
                Categorias
            </IconButton>

            {/* Carrito */}
            <CartWidget />

            {/* Menú desplegable con categorías */}
            <Menu
                anchorEl={menuEstado}
                open={Boolean(menuEstado)}
                onClose={cerrarMenu}
            >
                {categorias.length > 0 ? (
                    categorias.map((cat) => (
                        <MenuItem
                            key={cat}
                            onClick={() => {
                                cerrarMenu();
                                navigate(`/category/${cat}`);
                            }}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </MenuItem>
                    ))
                ) : (
                    <MenuItem disabled>Cargando...</MenuItem>
                )}
            </Menu>
        </AppBar>
    );
};

export default Navbar;
