const { response } = require("express");

const crearUsuario = async(req, res = response) => {
  res.json({
    ok: true,
    msg: "new",
  });
};

const login = async(req, res = response) => {
  res.json({
    ok: true,
    msg: "login",
  });
};

const renewToken = async(req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
