/*
    path: api/login
*/
const { Router } = require("express");
const { check } = require('express-validator');

// Controladores
const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validatJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Crear nuevos usuarios
router.post("/new", [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validarCampos
], crearUsuario);

// Realizar login
router.post("/", [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validarCampos
], login);

// Revalidar token
router.get("/renew", validatJWT, renewToken);

module.exports = router;
