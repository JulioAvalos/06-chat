/*
    path: api/login
*/
const { Router } = require("express");

// Controladores
const { crearUsuario, login, renewToken } = require("../controllers/auth");

const router = Router();

// Crear nuevos usuarios
router.post("/new", crearUsuario);

// Realizar login
router.post("/", login);

// Revalidar token
router.get("/renew", renewToken);

module.exports = router;
